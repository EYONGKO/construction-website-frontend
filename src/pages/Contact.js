import React, { useState } from 'react';
import './Contact.css';
import { contactAPI } from '../services/api';
import useSiteContent from '../hooks/useSiteContent';
import {
  buildContactWhatsAppMessage,
  openWhatsAppMessage
} from '../utils/whatsapp';

const Contact = () => {
  const siteContent = useSiteContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const contactItems = [
    { title: 'Address', text: siteContent.address },
    { title: 'Phone', text: siteContent.phone },
    { title: 'Email', text: siteContent.email },
    { title: 'Business Hours', text: siteContent.businessHours }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await contactAPI.create(formData);
      const message = buildContactWhatsAppMessage(formData);
      openWhatsAppMessage(message);
      setSuccess('Your message has been recorded and opened in WhatsApp. Please confirm sending it in WhatsApp and our team will respond promptly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (requestError) {
      console.error('Error sending message:', requestError);
      try {
        const message = buildContactWhatsAppMessage(formData);
        openWhatsAppMessage(message);
        setSuccess('Your WhatsApp message is ready. We could not save it to the admin inbox, but you can still send it directly in WhatsApp.');
      } catch (whatsAppError) {
        console.error('Error opening WhatsApp:', whatsAppError);
        setError('We could not open WhatsApp automatically. Please try again or use the WhatsApp button below.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page contact-page-redesign">
      <section className="page-banner page-banner-contact">
        <div className="page-banner-overlay" />
        <div className="page-banner-content">
          <span className="page-banner-tag">Contact</span>
          <h1>{siteContent.contactBannerTitle}</h1>
          <p>{siteContent.contactBannerText}</p>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container">
          <div className="contact-redesign-grid">
            <div className="contact-redesign-card">
              <h2>Get in Touch</h2>
              <div className="contact-item-list">
                {contactItems.map((item) => (
                  <div key={item.title} className="contact-item-row">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-redesign-card">
              <h2>Send Us a Message</h2>
              <div className="contact-whatsapp-note">
                <strong>Direct WhatsApp delivery</strong>
                <p>Your message will open directly in WhatsApp for immediate submission to our business line.</p>
              </div>
              {success && <div className="success-message">{success}</div>}
              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project or request..."
                  />
                </div>
                <button type="submit" className="btn btn-dark contact-submit" disabled={loading}>
                  {loading ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
                </button>
              </form>
                <a
                href={siteContent.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-whatsapp-link"
              >
                Open WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
