import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceAPI } from '../services/api';
import { fallbackServices, normalizeService } from '../data/siteContent';
import useSiteContent from '../hooks/useSiteContent';
import './Services.css';

const Services = () => {
  const siteContent = useSiteContent();
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceAPI.getAll();
        setServices(Array.isArray(response.data) ? response.data : []);
      } catch (requestError) {
        console.error('Error fetching services:', requestError);
        setError('Failed to load services. Showing featured services instead.');
      }
    };

    fetchServices();
  }, []);

  const items = useMemo(
    () => (services.length ? services.map(normalizeService) : fallbackServices),
    [services]
  );

  return (
    <div className="services-page services-page-redesign">
      <section className="page-banner page-banner-services">
        <div className="page-banner-overlay" />
        <div className="page-banner-content">
          <span className="page-banner-tag">Services</span>
          <h1>{siteContent.servicesIntroTitle}</h1>
          <p>{siteContent.servicesIntroText}</p>
        </div>
      </section>

      <section className="services-list-section">
        <div className="container">
          {error && <div className="page-alert">{error}</div>}
          <div className="services-redesign-grid">
            {items.map((service) => (
              <article key={service.id} className="service-redesign-card">
                {service.image ? (
                  <img src={service.image} alt={service.title} className="service-redesign-image" />
                ) : (
                  <div className={`service-redesign-icon service-redesign-icon-${service.icon}`}>
                    <span />
                  </div>
                )}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/services/${service.id}`} className="reference-link">Learn More</Link>
              </article>
            ))}
          </div>

          <div className="inner-cta-panel">
            <h2>Need a custom solution?</h2>
            <p>Tell us about your requirements and we will recommend the right service mix for your project.</p>
            <Link to="/contact" className="btn btn-dark services-cta-button">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
