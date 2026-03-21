import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../services/api';
import './ProjectManager.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    images: [''],
    completedDate: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      const imagesArray = value.split(',').map(img => img.trim()).filter(img => img);
      setFormData({ ...formData, [name]: imagesArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProject) {
        await projectAPI.update(editingProject.id, formData);
      } else {
        await projectAPI.create(formData);
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      setError('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      location: project.location,
      images: project.images.join(', '),
      completedDate: project.completedDate ? project.completedDate.split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        setError('Failed to delete project');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      images: [''],
      completedDate: ''
    });
    setEditingProject(null);
    setShowForm(false);
    setError('');
  };

  if (loading && projects.length === 0) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="project-manager">
      <div className="manager-header">
        <h2>Project Management</h2>
        <button className="btn" onClick={() => setShowForm(true)}>
          Add New Project
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-overlay">
          <div className="form-card">
            <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
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
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Images (comma-separated URLs)</label>
                <input
                  type="text"
                  name="images"
                  value={formData.images.join(', ')}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>
              <div className="form-group">
                <label>Completed Date</label>
                <input
                  type="date"
                  name="completedDate"
                  value={formData.completedDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Saving...' : (editingProject ? 'Update' : 'Create')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="projects-list">
        {projects.length === 0 ? (
          <div className="no-items">No projects found</div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-info">
                <h3>{project.title}</h3>
                <p><strong>Location:</strong> {project.location}</p>
                <p><strong>Description:</strong> {project.description.substring(0, 100)}...</p>
                {project.completedDate && (
                  <p><strong>Completed:</strong> {new Date(project.completedDate).toLocaleDateString()}</p>
                )}
                {project.images && project.images.length > 0 && (
                  <p><strong>Images:</strong> {project.images.length} uploaded</p>
                )}
              </div>
              <div className="project-actions">
                <button className="btn btn-sm" onClick={() => handleEdit(project)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(project.id)}>
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

export default ProjectManager;
