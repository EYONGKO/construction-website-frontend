import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI, serviceAPI } from '../services/api';
import { fallbackServices, getMergedProducts, normalizeService, strengths } from '../data/siteContent';
import useSiteContent from '../hooks/useSiteContent';
import './Home.css';

const Home = () => {
  const siteContent = useSiteContent();
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [projectsResponse, servicesResponse] = await Promise.all([
          projectAPI.getAll(),
          serviceAPI.getAll()
        ]);

        if (!isMounted) {
          return;
        }

        setProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data.slice(0, 4) : []);
        setServices(Array.isArray(servicesResponse.data) ? servicesResponse.data.slice(0, 6) : []);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredServices = useMemo(
    () => (services.length ? services.map(normalizeService).slice(0, 6) : fallbackServices.slice(0, 6)),
    [services]
  );

  const featuredProducts = useMemo(
    () => getMergedProducts(projects).slice(0, 4),
    [projects]
  );

  return (
    <div className="home home-reference-style">
      <section className="hero-reference">
        <div className="hero-backdrop" />
        <div className="hero-overlay" />
        <div className="container hero-reference-inner">
          <div className="hero-reference-copy">
            <span className="pill-label">Professional Construction and Technical Services</span>
            <h1>{siteContent.homeHeroTitle}</h1>
            <p>{siteContent.homeHeroText}</p>
            <div className="hero-reference-actions">
              <Link to="/projects" className="btn btn-primary">
                View Our Catalog
              </Link>
              <Link to="/request-quote" className="btn btn-outline-light">
                Request a Quote
              </Link>
            </div>
            <div className="hero-reference-meta">
              <span>{siteContent.phone}</span>
              <span>{siteContent.address}</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom-curve" />
      </section>

      <section className="services-reference-block">
        <div className="container">
          <div className="section-heading reference-heading">
            <h2>Our Services</h2>
            <p>{siteContent.servicesIntroText}</p>
          </div>
          <div className="reference-services-grid">
            {featuredServices.map((service) => (
              <article key={service.id} className="reference-service-card">
                {service.image ? (
                  <img src={service.image} alt={service.title} className="reference-service-image" />
                ) : (
                  <div className={`reference-icon reference-icon-${service.icon}`}>
                    <span />
                  </div>
                )}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/services/${service.id}`} className="reference-link">
                  Learn More
                </Link>
              </article>
            ))}
          </div>
          <div className="center-action">
            <Link to="/services" className="btn btn-dark btn-section-dark">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="products-reference-block">
        <div className="container">
          <div className="section-heading reference-heading">
            <h2>Our Products</h2>
            <p>{siteContent.productsIntroText}</p>
          </div>
          <div className="reference-products-grid">
            {featuredProducts.map((product) => (
              <article key={product.id} className="reference-product-card">
                <img src={product.image} alt={product.title} />
                <div className="reference-product-overlay">
                  <span className="reference-product-category">{product.category}</span>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <Link to={`/projects/${product.id}`} className="reference-shop-link">
                    Shop Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="center-action">
            <Link to="/projects" className="btn btn-primary btn-section-gold">
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="why-reference-block">
        <div className="container">
          <div className="section-heading reference-heading reference-heading-light">
            <h2>Why Choose CEBAT Construction?</h2>
            <p>We're committed to delivering excellence in every project we undertake.</p>
          </div>
          <div className="reference-strength-grid">
            {strengths.map((item) => (
              <article key={item.title} className="reference-strength-item">
                <div className={`strength-icon strength-icon-${item.icon}`}>
                  <span />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-reference-block">
        <div className="container">
          <div className="cta-reference-card">
            <div className="section-heading reference-heading">
              <h2>{siteContent.ctaTitle}</h2>
              <p>{siteContent.ctaText}</p>
            </div>
            <div className="cta-reference-actions">
              <Link to="/request-quote" className="btn btn-primary">Get a Free Quote</Link>
              <Link to="/contact" className="btn btn-dark">Call Us Now</Link>
            </div>
            <div className="cta-reference-meta">
              <span>{siteContent.phone}</span>
              <span>{siteContent.address}</span>
              <span>{siteContent.businessHours}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
