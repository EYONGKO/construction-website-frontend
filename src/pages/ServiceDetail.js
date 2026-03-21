import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { serviceAPI } from '../services/api';
import { fallbackServices, normalizeService } from '../data/siteContent';
import './ServiceDetail.css';

const getFallbackService = (serviceId) => fallbackServices.find((item) => String(item.id) === String(serviceId)) || fallbackServices[0];

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(() => getFallbackService(serviceId));
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    setService(getFallbackService(serviceId));

    let isMounted = true;

    const loadService = async () => {
      try {
        const response = await serviceAPI.getById(serviceId);
        if (isMounted) {
          setService(normalizeService(response.data));
        }
      } catch (error) {
        try {
          const response = await serviceAPI.getAll();
          const match = Array.isArray(response.data)
            ? response.data.find((item) => String(item.id) === String(serviceId))
            : null;

          if (isMounted && match) {
            setService(normalizeService(match));
          }
        } catch (secondaryError) {
          console.error('Error loading services:', secondaryError);
        }
      }

      try {
        const response = await serviceAPI.getAll();
        if (isMounted) {
          setAllServices(Array.isArray(response.data) ? response.data.map(normalizeService) : []);
        }
      } catch (allError) {
        if (isMounted) {
          setAllServices([]);
        }
      }
    };

    loadService();

    return () => {
      isMounted = false;
    };
  }, [serviceId]);

  const relatedServices = useMemo(
    () => {
      const source = allServices.length ? allServices : fallbackServices.map(normalizeService);
      return source.filter((item) => item.id !== (service?.id || serviceId)).slice(0, 3);
    },
    [allServices, service, serviceId]
  );

  if (!service) {
    return <div className="detail-loading">Service not found.</div>;
  }

  return (
    <div className="detail-page">
      <section className="page-banner service-detail-hero">
        <div
          className="service-detail-hero-media"
          style={{ backgroundImage: `url(${service.image || '/images/services-hero.jpg'})` }}
        />
        <div className="page-banner-overlay service-detail-hero-overlay" />
        <div className="page-banner-content service-detail-hero-content">
          <span className="page-banner-tag">Service Detail</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
        </div>
      </section>

      <section className="detail-main-section">
        <div className="container">
          <div className="detail-grid">
            <article className="detail-primary-card">
              {service.image ? (
                <img src={service.image} alt={service.title} className="detail-service-image" />
              ) : null}
              <h2>Overview</h2>
              <p>{service.longDescription}</p>

              <h3>What this service covers</h3>
              <ul className="detail-list">
                {service.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <aside className="detail-side-card">
              <h2>Need this service?</h2>
              <p>Tell us about your project and our team will guide you on the best next step.</p>
              <div className="detail-actions">
                <Link to="/request-quote" className="btn btn-primary">Request Quote</Link>
                <Link to="/contact" className="btn btn-dark">Contact Us</Link>
              </div>
            </aside>
          </div>

          <div className="detail-related">
            <h2>Related Services</h2>
            <div className="detail-related-grid">
              {relatedServices.map((item) => (
                <article key={item.id} className="detail-related-card">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="detail-related-image" />
                  ) : null}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link to={`/services/${item.id}`} className="reference-link">Learn More</Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
