import React from 'react';
import { Link } from 'react-router-dom';
import useSiteContent from '../hooks/useSiteContent';
import './About.css';

const values = [
  {
    title: 'Quality',
    description: 'We maintain a high execution standard from planning through finishing.'
  },
  {
    title: 'Integrity',
    description: 'Transparent communication and dependable delivery guide every client relationship.'
  },
  {
    title: 'Safety',
    description: 'We approach every project with practical site discipline and responsible supervision.'
  },
  {
    title: 'Innovation',
    description: 'We adapt modern methods and technical solutions to improve project outcomes.'
  }
];

const stats = [
  { number: '500+', label: 'Projects Completed' },
  { number: '20+', label: 'Years of Experience' },
  { number: '50+', label: 'Team Members' },
  { number: '98%', label: 'Client Satisfaction' }
];

const About = () => {
  const siteContent = useSiteContent();

  return (
    <div className="about-page about-page-redesign">
      <section className="page-banner page-banner-team">
        <div className="page-banner-overlay" />
        <div className="page-banner-content">
          <span className="page-banner-tag">Our Team</span>
          <h1>{siteContent.aboutBannerTitle}</h1>
          <p>{siteContent.aboutBannerText}</p>
        </div>
      </section>

      <section className="about-main-section">
        <div className="container">
          <div className="about-story-grid">
            <article className="about-panel-card">
              <h2>Our Story</h2>
              <p>
                CEBAT Construction has grown through consistent project delivery, client trust, and a reputation for getting technical work done properly.
              </p>
              <p>
                From residential upgrades to commercial installations, we focus on practical solutions that combine clean workmanship with reliable coordination.
              </p>
            </article>

            <article className="about-panel-card">
              <h2>Our Mission</h2>
              <p>
                To provide professional construction, electrical, and technical services that meet client expectations for quality, safety, and value.
              </p>
              <p>
                We aim to build long-term relationships by staying responsive, transparent, and detail-oriented throughout each project stage.
              </p>
            </article>
          </div>

          <div className="about-panel-card about-values-card">
            <h2>Our Values</h2>
            <div className="about-values-grid">
              {values.map((value) => (
                <div key={value.title} className="about-value-item">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-stats-panel">
            <h2>Our Achievements</h2>
            <div className="about-stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="about-stat-item">
                  <strong>{stat.number}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-panel-card about-team-card">
            <div className="about-section-heading">
              <h2>Team Members</h2>
              <p>Three of the people driving planning, supervision, and technical execution across our projects.</p>
            </div>
            <div className="about-team-grid">
              {siteContent.teamMembers.map((member) => (
                <article key={member.id} className="about-team-member">
                  <div className="about-team-photo-wrap">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="about-team-photo"
                      style={{ objectPosition: member.imagePosition || 'center' }}
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                  <p>{member.bio}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="inner-cta-panel">
            <h2>Ready to work with us?</h2>
            <p>Join our growing list of satisfied clients and let us help you deliver your next project with confidence.</p>
            <Link to="/contact" className="btn btn-primary about-cta-button">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

