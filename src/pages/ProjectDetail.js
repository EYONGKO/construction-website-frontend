import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectAPI } from '../services/api';
import { getMergedProducts, normalizeProject } from '../data/siteContent';
import './ProjectDetail.css';

const getFallbackProject = (projectId) => {
  const products = getMergedProducts();
  return products.find((item) => String(item.id) === String(projectId)) || products[0];
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(() => getFallbackProject(projectId));
  const [allProjects, setAllProjects] = useState(() => getMergedProducts());

  useEffect(() => {
    setProject(getFallbackProject(projectId));

    let isMounted = true;

    const loadProject = async () => {
      try {
        const response = await projectAPI.getById(projectId);
        if (isMounted) {
          setProject(normalizeProject(response.data));
        }
      } catch (error) {
        try {
          const response = await projectAPI.getAll();
          const match = Array.isArray(response.data)
            ? response.data.find((item) => String(item.id) === String(projectId))
            : null;

          if (isMounted && match) {
            setProject(normalizeProject(match));
          }
        } catch (secondaryError) {
          console.error('Error loading projects:', secondaryError);
        }
      }

      try {
        const response = await projectAPI.getAll();
        if (isMounted) {
          setAllProjects(getMergedProducts(response.data));
        }
      } catch (allError) {
        if (isMounted) {
          setAllProjects(getMergedProducts());
        }
      }
    };

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const relatedProjects = useMemo(
    () => allProjects.filter((item) => item.id !== (project?.id || projectId)).slice(0, 3),
    [allProjects, project, projectId]
  );

  if (!project) {
    return <div className="detail-loading">Project not found.</div>;
  }

  return (
    <div className="detail-page">
      <section className="page-banner project-detail-hero">
        <div
          className="project-detail-hero-media"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="page-banner-overlay project-detail-hero-overlay" />
        <div className="page-banner-content project-detail-hero-content">
          <span className="page-banner-tag">Project Detail</span>
          <h1>{project.title}</h1>
          <p>{project.serviceTitle}</p>
        </div>
      </section>

      <section className="detail-main-section">
        <div className="container">
          <div className="detail-grid">
            <article className="detail-primary-card">
              <div className="project-detail-media">
                <img src={project.image} alt={project.title} />
              </div>
              <h2>Overview</h2>
              <p>{project.longDescription}</p>

              <h3>Category</h3>
              <p>{project.category}</p>

              <h3>Service</h3>
              <p>{project.serviceTitle}</p>
            </article>

            <aside className="detail-side-card">
              <h2>Interested in something similar?</h2>
              <p>Contact us for product sourcing, project planning, or a complete execution quote.</p>
              <div className="detail-actions">
                <Link to="/request-quote" className="btn btn-primary">Request Quote</Link>
                <Link to="/contact" className="btn btn-dark">Contact Us</Link>
              </div>
            </aside>
          </div>

          <div className="detail-related">
            <h2>Related Products and Projects</h2>
            <div className="detail-related-grid">
              {relatedProjects.map((item) => (
                <article key={item.id} className="detail-related-card project-related-card">
                  <div className="project-related-media">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="project-related-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link to={`/projects/${item.id}`} className="reference-link">View Details</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
