import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import './MessagesView.css';

const MessagesView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(selectedMessage?.id === message.id ? null : message);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="messages-view">
      <div className="view-header">
        <h2>Contact Messages</h2>
        <div className="message-count">
          {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {messages.length === 0 ? (
        <div className="no-items">No messages found</div>
      ) : (
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className="message-item">
              <div 
                className="message-header"
                onClick={() => handleMessageClick(message)}
              >
                <div className="message-sender">
                  <h3>{message.name}</h3>
                  <p className="message-email">{message.email}</p>
                </div>
                <div className="message-meta">
                  <span className="message-date">
                    {formatDate(message.createdAt)}
                  </span>
                  <button className="expand-btn">
                    {selectedMessage?.id === message.id ? '−' : '+'}
                  </button>
                </div>
              </div>
              
              {selectedMessage?.id === message.id && (
                <div className="message-content">
                  <div className="message-body">
                    <h4>Message:</h4>
                    <p>{message.message}</p>
                  </div>
                  <div className="message-actions">
                    <a 
                      href={`mailto:${message.email}`}
                      className="btn btn-sm"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesView;
