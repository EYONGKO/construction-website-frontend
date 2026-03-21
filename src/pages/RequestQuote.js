import React, { useState } from 'react';
import { quoteAPI } from '../services/api';
import './RequestQuote.css';
import useSiteContent from '../hooks/useSiteContent';
import {
  buildQuoteWhatsAppMessage,
  openWhatsAppMessage
} from '../utils/whatsapp';

const steps = [
  {
    number: '1',
    title: 'Fill Out the Form',
    text: 'Share your project details, preferred service, and the best way to reach you.'
  },
  {
    number: '2',
    title: 'We Review Your Request',
    text: 'Our team checks the scope, timeline, and service needs before preparing a response.'
  },
  {
    number: '3',
    title: 'Receive Your Quote',
    text: 'You get a professional quote with practical recommendations for the next step.'
  }
];

const RequestQuote = () => {
  const siteContent = useSiteContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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
      await quoteAPI.create(formData);
      const message = buildQuoteWhatsAppMessage(formData);
      openWhatsAppMessage(message);
      setSuccess('Your quote request has been recorded and opened in WhatsApp. Please send the prepared message and our team will review it quickly.');
      setFormData({ name: '', email: '', phone: '', projectType: '', description: '' });
    } catch (requestError) {
      console.error('Error submitting quote request:', requestError);
      try {
        const message = buildQuoteWhatsAppMessage(formData);
        openWhatsAppMessage(message);
        setSuccess('Your WhatsApp quote request is ready. We could not save it to the admin queue, but you can still send it directly in WhatsApp.');
      } catch (whatsAppError) {
        console.error('Error opening WhatsApp:', whatsAppError);
        setError('We could not open WhatsApp automatically. Please try again or use the WhatsApp chat button below.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-page quote-page-redesign">
      <section className="page-banner page-banner-quote">
        <div className="page-banner-overlay" />
        <div className="page-banner-content">
          <span className="page-banner-tag">Get Your Quote</span>
          <h1>{siteContent.quoteBannerTitle}</h1>
          <p>{siteContent.quoteBannerText}</p>
        </div>
      </section>

      <section className="quote-main-section">
        <div className="container">
          <div className="quote-redesign-grid">
            <div className="quote-side-card">
              <h2>How It Works</h2>
              <div className="quote-steps">
                {steps.map((step) => (
                  <div key={step.number} className="quote-step-item">
                    <span>{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="quote-note-box">
                <h3>Why choose CEBAT?</h3>
                <ul>
                  <li>Fast response on quote requests</li>
                  <li>Professional construction and technical support</li>
                  <li>Transparent recommendations and pricing</li>
                </ul>
              </div>
            </div>

            <div className="quote-form-card">
              <h2>Project Details</h2>
              <div className="quote-whatsapp-note">
                <strong>Professional WhatsApp submission</strong>
                <p>Your details will be arranged into a clean quote request and opened directly in WhatsApp for immediate delivery.</p>
              </div>
              {success && <div className="success-message">{success}</div>}
              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type *</label>
                    <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} required>
                      <option value="">Select a project type</option>
                      <option value="solar">Solar Installation</option>
                      <option value="electrical">Electrical and Cabling</option>
                      <option value="painting">Painting</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="construction">Building Construction</option>
                      <option value="pop">POP Installation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Project Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project, location, timeline, and any specific requirements..."
                  />
                </div>

                <button type="submit" className="btn btn-primary quote-submit" disabled={loading}>
                  {loading ? 'Opening WhatsApp...' : 'Request Quote on WhatsApp'}
                </button>
              </form>
              <a
                href={siteContent.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="quote-whatsapp-link"
              >
                Chat with Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestQuote;
