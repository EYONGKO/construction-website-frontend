import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { to: '/projects', label: 'Products', match: '/projects' },
  { to: '/services', label: 'Services', match: '/services' },
  { to: '/about', label: 'Our Team', match: '/about' },
  { to: '/contact', label: 'Contact', match: '/contact' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-grid" />
              <span className="brand-mark-bolt" />
            </span>
            <span className="brand-copy">
              <strong>CEBAT</strong>
              <em>Construction</em>
            </span>
          </Link>

          <button
            type="button"
            className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${location.pathname.startsWith(link.match) ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/request-quote" className="navbar-cta" onClick={closeMenu}>
              Get Your Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
