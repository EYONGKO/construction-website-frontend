import React, { useState, useEffect } from 'react';
import { quoteAPI } from '../../services/api';
import './QuotesView.css';

const QuotesView = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await quoteAPI.getAll();
      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError('Failed to load quote requests');
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteClick = (quote) => {
    setSelectedQuote(selectedQuote?.id === quote.id ? null : quote);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getProjectTypeLabel = (type) => {
    const types = {
      residential: 'Residential Construction',
      commercial: 'Commercial Construction',
      renovation: 'Renovation',
      remodeling: 'Remodeling',
      addition: 'Home Addition',
      other: 'Other'
    };
    return types[type] || type;
  };

  if (loading) {
    return <div className="loading">Loading quote requests...</div>;
  }

  return (
    <div className="quotes-view">
      <div className="view-header">
        <h2>Quote Requests</h2>
        <div className="quote-count">
          {quotes.length} {quotes.length === 1 ? 'Request' : 'Requests'}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {quotes.length === 0 ? (
        <div className="no-items">No quote requests found</div>
      ) : (
        <div className="quotes-list">
          {quotes.map((quote) => (
            <div key={quote.id} className="quote-item">
              <div 
                className="quote-header"
                onClick={() => handleQuoteClick(quote)}
              >
                <div className="quote-client">
                  <h3>{quote.name}</h3>
                  <div className="contact-info">
                    <span className="quote-email">{quote.email}</span>
                    {quote.phone && <span className="quote-phone">{quote.phone}</span>}
                  </div>
                </div>
                <div className="quote-meta">
                  <span className="project-type">
                    {getProjectTypeLabel(quote.projectType)}
                  </span>
                  <span className="quote-date">
                    {formatDate(quote.createdAt)}
                  </span>
                  <button className="expand-btn">
                    {selectedQuote?.id === quote.id ? '−' : '+'}
                  </button>
                </div>
              </div>
              
              {selectedQuote?.id === quote.id && (
                <div className="quote-content">
                  <div className="quote-details">
                    <div className="detail-row">
                      <strong>Project Type:</strong>
                      <span>{getProjectTypeLabel(quote.projectType)}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Phone:</strong>
                      <span>{quote.phone || 'Not provided'}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Email:</strong>
                      <span>{quote.email}</span>
                    </div>
                    <div className="detail-row">
                      <strong>Submitted:</strong>
                      <span>{formatDate(quote.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="quote-description">
                    <h4>Project Description:</h4>
                    <p>{quote.description}</p>
                  </div>
                  
                  <div className="quote-actions">
                    <a 
                      href={`mailto:${quote.email}?subject=Re: Your Quote Request - Construction Company&body=Dear ${quote.name},%0D%0A%0D%0AThank you for your interest in our construction services. We have received your quote request for a ${getProjectTypeLabel(quote.projectType)} project.%0D%0A%0D%0AWe will review your project details and get back to you with a detailed quote within 24 hours.%0D%0A%0D%0ABest regards,%0D%0AConstruction Company Team`}
                      className="btn btn-sm"
                    >
                      Reply via Email
                    </a>
                    <a 
                      href={`tel:${quote.phone}`}
                      className="btn btn-sm btn-secondary"
                    >
                      Call Client
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

export default QuotesView;
