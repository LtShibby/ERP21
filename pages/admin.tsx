import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

interface Job {
  id: string;
  title: string;
  location: string;
  industry: string;
  description: string;
  requirements: string[];
  datePosted: string;
}

const emptyJob: Omit<Job, 'id' | 'datePosted'> = {
  title: '',
  location: '',
  industry: '',
  description: '',
  requirements: ['']
};

export default function Admin() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState(emptyJob);
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const industries = ['Oil & Gas', 'Aerospace', 'Defence', 'Utility', 'Shipping', 'Healthcare'];

  useEffect(() => {
    loadJobs();
    // Check if user is already authenticated in this session
    const isAuth = sessionStorage.getItem('erp21-admin-auth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadJobs = async () => {
    try {
      // Try localStorage first
      const localJobs = localStorage.getItem('erp21-jobs');
      if (localJobs) {
        setJobs(JSON.parse(localJobs));
      } else {
        // Fallback to static file
        const response = await fetch('/data/jobs.json');
        const data = await response.json();
        setJobs(data);
        // Save to localStorage
        localStorage.setItem('erp21-jobs', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const saveJobs = (updatedJobs: Job[]) => {
    localStorage.setItem('erp21-jobs', JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting - block after 5 failed attempts
    if (loginAttempts >= 5) {
      alert('Too many failed attempts. Please wait before trying again.');
      return;
    }
    
    // For static export, we need to use a build-time environment variable
    // The password will be embedded in the client-side code at build time
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_LOGIN || 'erp21admin';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      // Store authentication in sessionStorage for the current session
      sessionStorage.setItem('erp21-admin-auth', 'true');
    } else {
      setLoginAttempts(loginAttempts + 1);
      const remainingAttempts = 5 - loginAttempts - 1;
      alert(`Invalid password. ${remainingAttempts > 0 ? `${remainingAttempts} attempts remaining.` : 'No attempts remaining.'}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.industry || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const now = new Date().toISOString().split('T')[0];

    if (editingJob) {
      // Update existing job
      const updatedJobs = jobs.map(job => 
        job.id === editingJob.id 
          ? { ...formData, id: editingJob.id, datePosted: editingJob.datePosted, requirements: formData.requirements.filter(req => req.trim()) }
          : job
      );
      saveJobs(updatedJobs);
    } else {
      // Add new job
      const newJob: Job = {
        id: Date.now().toString(),
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        datePosted: now
      };
      saveJobs([...jobs, newJob]);
    }

    // Reset form
    setFormData(emptyJob);
    setEditingJob(null);
    setShowForm(false);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      location: job.location,
      industry: job.industry,
      description: job.description,
      requirements: [...job.requirements, ''] // Add empty field for new requirements
    });
    setShowForm(true);
  };

  const handleDelete = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      saveJobs(updatedJobs);
    }
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const updateRequirement = (index: number, value: string) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: updatedRequirements
    });
  };

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index)
    });
  };

  const resetToDefault = () => {
    if (confirm('This will reset all jobs to the default data. Are you sure?')) {
      localStorage.removeItem('erp21-jobs');
      loadJobs();
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout title="Admin Login - ERP21" description="Admin access for job management">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
              <p className="text-gray-600 mt-2">Enter password to manage job listings</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                  placeholder="Enter admin password"
                />
              </div>
              
              <button type="submit" className="w-full btn-primary">
                Login
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Password is configured via environment variable
              </p>
              {loginAttempts > 0 && (
                <p className="text-sm text-red-600 mt-2">
                  Failed attempts: {loginAttempts}/5
                </p>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Panel - Job Management - ERP21" description="Admin panel for managing job listings">
      <div className="page-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem('erp21-admin-auth');
              }}
              className="btn-secondary"
            >
              Logout
            </button>
            <button
              onClick={() => {
                setFormData(emptyJob);
                setEditingJob(null);
                setShowForm(true);
              }}
              className="btn-primary"
            >
              Add New Job
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-erp-blue">{jobs.length}</h3>
            <p className="text-gray-600">Total Jobs</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-erp-blue">
              {new Set(jobs.map(job => job.industry)).size}
            </h3>
            <p className="text-gray-600">Industries</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-erp-blue">
              {new Set(jobs.map(job => job.location)).size}
            </h3>
            <p className="text-gray-600">Locations</p>
          </div>
          <div className="card">
            <button
              onClick={resetToDefault}
              className="w-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded"
            >
              Reset to Default
            </button>
          </div>
        </div>

        {/* Job Form */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {editingJob ? 'Edit Job' : 'Add New Job'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                    placeholder="e.g. Singapore, Singapore / Malaysia"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                  required
                >
                  <option value="">Select Industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Requirements
                  </label>
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="text-sm text-erp-blue hover:text-erp-blue-dark"
                  >
                    + Add Requirement
                  </button>
                </div>
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                      placeholder="Enter requirement"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingJob ? 'Update Job' : 'Add Job'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingJob(null);
                    setFormData(emptyJob);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current Jobs ({jobs.length})</h2>
          
          {jobs.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">No jobs available. Add your first job!</p>
            </div>
          ) : (
            jobs.map(job => (
              <div key={job.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span>📍 {job.location}</span>
                      <span>🏢 {job.industry}</span>
                      <span>📅 {new Date(job.datePosted).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    <div className="text-sm">
                      <strong>Requirements:</strong>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-gray-600">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(job)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}