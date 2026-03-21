import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../services/api';
import { getMergedProducts } from '../data/siteContent';
import useSiteContent from '../hooks/useSiteContent';
import './Projects.css';

const Projects = () => {
  const siteContent = useSiteContent();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectAPI.getAll();
        setProjects(Array.isArray(response.data) ? response.data : []);
      } catch (requestError) {
        console.error('Error fetching projects:', requestError);
        setError('Failed to load projects. Showing featured work instead.');
      }
    };

    fetchProjects();
  }, []);

  const items = useMemo(
    () => getMergedProducts(projects),
    [projects]
  );

  return (
    <div className="projects-page projects-page-redesign">
      <section className="page-banner page-banner-products">
        <div className="page-banner-overlay" />
        <div className="page-banner-content">
          <span className="page-banner-tag">Products</span>
          <h1>{siteContent.productsIntroTitle}</h1>
          <p>{siteContent.productsIntroText}</p>
        </div>
      </section>

      <section className="projects-list-section">
        <div className="container">
          {error && <div className="page-alert">{error}</div>}
          <div className="projects-redesign-grid">
            {items.map((project) => (
              <article key={project.id} className="project-redesign-card">
                <div className="project-redesign-media">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-redesign-copy">
                  <p className="project-redesign-location">{project.serviceTitle}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-redesign-category">{project.category}</span>
                  <Link to={`/projects/${project.id}`} className="reference-shop-link">View Details</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="inner-cta-panel">
            <h2>Ready to start your project?</h2>
            <p>Let us help you plan, source, and execute with the same professional standard shown across the site.</p>
            <Link to="/request-quote" className="btn btn-section-gold products-cta-button">Request a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
