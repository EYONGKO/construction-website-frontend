import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../../services/api';
import './ServiceManager.css';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceAPI.getAll();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingService) {
        await serviceAPI.update(editingService.id, formData);
      } else {
        await serviceAPI.create(formData);
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      setError('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceAPI.delete(id);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        setError('Failed to delete service');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: ''
    });
    setEditingService(null);
    setShowForm(false);
    setError('');
  };

  if (loading && services.length === 0) {
    return <div className="loading">Loading services...</div>;
  }

  return (
    <div className="service-manager">
      <div className="manager-header">
        <h2>Service Management</h2>
        <button className="btn" onClick={() => setShowForm(true)}>
          Add New Service
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-overlay">
          <div className="form-card">
            <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Icon (emoji or icon name)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="🔨 or hammer"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Saving...' : (editingService ? 'Update' : 'Create')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="services-list">
        {services.length === 0 ? (
          <div className="no-items">No services found</div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-info">
                <div className="service-icon-display">
                  {service.icon || '🔧'}
                </div>
                <div className="service-details">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
              <div className="service-actions">
                <button className="btn btn-sm" onClick={() => handleEdit(service)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(service.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceManager;
