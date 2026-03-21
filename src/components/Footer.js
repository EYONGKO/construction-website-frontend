import React from 'react';
import { Link } from 'react-router-dom';
import useSiteContent from '../hooks/useSiteContent';
import './Footer.css';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
  { name: 'Get Quote', href: '/request-quote' }
];

const serviceLinks = [
  { name: 'Solar Solutions', href: '/services/solar-solutions' },
  { name: 'Electrical & Cabling', href: '/services/electrical-cabling' },
  { name: 'Painting Services', href: '/services/painting-services' },
  { name: 'Plumbing', href: '/services/plumbing-services' },
  { name: 'Building Construction', href: '/services/building-construction' },
  { name: 'POP Installation', href: '/services/pop-installation' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const siteContent = useSiteContent();

  const socialLinks = [
    {
      name: 'Facebook',
      href: siteContent.facebookUrl,
      label: `Visit ${siteContent.companyName} on Facebook`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.7-1.6H17V4.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3.2h2.8V22h2.7Z" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: siteContent.whatsappUrl,
      label: `Chat with ${siteContent.companyName} on WhatsApp`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 11.8c0 4.6-3.7 8.2-8.2 8.2-1.5 0-2.9-.4-4.2-1.1L4 20l1.2-3.5A8.1 8.1 0 0 1 3.8 12c0-4.5 3.7-8.2 8.2-8.2S20 7.3 20 11.8Zm-8.2-6.8a6.8 6.8 0 0 0-5.8 10.3l.2.3-.7 2.1 2.2-.7.3.2a6.8 6.8 0 1 0 3.8-12.2Zm4 8.6c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.5.1l-.4.5c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.8-1.2-.6-.6-1.1-1.4-1.2-1.6-.1-.2 0-.3.1-.4l.3-.4c.1-.1.2-.2.2-.3l.1-.3c0-.1 0-.3-.1-.4l-.7-1.6c-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.3 0-.4.2-.2.2-.7.7-.7 1.7s.7 1.9.8 2c.1.1 1.4 2.2 3.4 3 .5.2.9.4 1.2.5.5.2.9.2 1.2.1.4-.1 1.2-.5 1.4-.9.2-.4.2-.8.1-.9Z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: siteContent.linkedinUrl,
      label: `Visit ${siteContent.companyName} on LinkedIn`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.2 8.5A1.8 1.8 0 1 1 6.2 5a1.8 1.8 0 0 1 0 3.5ZM4.8 9.8h2.9V19H4.8V9.8Zm4.7 0h2.8V11h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.6 2 3.6 4.5V19H16v-4.4c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V19H9.5V9.8Z" />
        </svg>
      )
    }
  ].filter((item) => item.href);

  return (
    <footer className="footer">
      <div className="footer-pattern" />
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand-block">
            <Link to="/" className="footer-brand">
              <span className="footer-brand-mark" aria-hidden="true">
                <span className="footer-brand-grid" />
                <span className="footer-brand-bolt" />
              </span>
              <span className="footer-brand-copy">
                <strong>CEBAT</strong>
                <em>{siteContent.companyTagline}</em>
              </span>
            </Link>
            <p>{siteContent.footerDescription}</p>
            <div className="footer-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.label}
                  className="footer-social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="footer-social-icon">{social.icon}</span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <div className="footer-links">
              {quickLinks.map((link) => (
                <Link key={link.name} to={link.href}>{link.name}</Link>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>Our Services</h3>
            <div className="footer-links">
              {serviceLinks.map((service) => (
                <Link key={service.name} to={service.href}>{service.name}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CEBAT Construction. All rights reserved.</p>
          <div className="footer-contact-line">
            <span>{siteContent.address}</span>
            <span>{siteContent.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
