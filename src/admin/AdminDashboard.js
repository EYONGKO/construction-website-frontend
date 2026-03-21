import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI, serviceAPI, contactAPI, quoteAPI } from '../services/api';
import ProjectManager from './components/ProjectManager';
import ServiceManager from './components/ServiceManager';
import MessagesView from './components/MessagesView';
import QuotesView from './components/QuotesView';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    quotes: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }

    // Fetch statistics
    const fetchStats = async () => {
      try {
        const [projectsRes, servicesRes, messagesRes, quotesRes] = await Promise.all([
          projectAPI.getAll(),
          serviceAPI.getAll(),
          contactAPI.getAll(),
          quoteAPI.getAll()
        ]);

        setStats({
          projects: projectsRes.data.length,
          services: servicesRes.data.length,
          messages: messagesRes.data.length,
          quotes: quotesRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectManager />;
      case 'services':
        return <ServiceManager />;
      case 'messages':
        return <MessagesView />;
      case 'quotes':
        return <QuotesView />;
      default:
        return <ProjectManager />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
          <div className="stats-overview">
            <h3>Overview</h3>
            <div className="stat-cards">
              <div className="stat-card">
                <div className="stat-number">{stats.projects}</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.services}</div>
                <div className="stat-label">Services</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.messages}</div>
                <div className="stat-label">Messages</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.quotes}</div>
                <div className="stat-label">Quotes</div>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Manage Projects
            </button>
            <button
              className={`nav-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              Manage Services
            </button>
            <button
              className={`nav-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              Contact Messages
            </button>
            <button
              className={`nav-btn ${activeTab === 'quotes' ? 'active' : ''}`}
              onClick={() => setActiveTab('quotes')}
            >
              Quote Requests
            </button>
          </nav>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
