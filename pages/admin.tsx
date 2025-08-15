import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ConfirmModal from '../components/ConfirmModal';

interface Job {
  id: string;
  title: string;
  location: string;
  industry: string;
  description: string;
  requirements: string[];
  datePosted: string;   // ISO "YYYY-MM-DD"
  archived: boolean;    // NEW
}

// === CONSTANTS & HELPERS ===
const JOBS_KEY = 'erp21-jobs';
const todayISO = new Date().toISOString().split('T')[0];

function isOlderThan14Days(iso: string) {
  const d = new Date(iso);
  return Number.isFinite(+d) && (Date.now() - d.getTime()) > 14 * 24 * 60 * 60 * 1000;
}

const emptyJob: Omit<Job, 'id'> = {
  title: '',
  location: '',
  industry: '',
  description: '',
  requirements: [''],
  datePosted: todayISO,  // NEW
  archived: false,       // NEW
};

export default function Admin() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState(emptyJob);
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [activeTab, setActiveTab] = useState<'current' | 'archived'>('current');
  const [showIndustryEditor, setShowIndustryEditor] = useState(false);
  const [industries, setIndustries] = useState(['Oil & Gas', 'Aerospace', 'Defence', 'Utility', 'Shipping', 'Healthcare']);
  const [industryError, setIndustryError] = useState<string | null>(null);
  const [industrySuccess, setIndustrySuccess] = useState<string | null>(null);
  const [tooltipIndustry, setTooltipIndustry] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; jobId: string | null }>({ isOpen: false, jobId: null });
  const [deleteIndustryModal, setDeleteIndustryModal] = useState<{ isOpen: boolean; industry: string | null }>({ isOpen: false, industry: null });

  useEffect(() => {
    loadJobs();
    fetch('/api/admin/me')
      .then(r => r.json())
      .then(j => setIsAuthenticated(!!j.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const loadJobs = async () => {
    try {
      const raw = localStorage.getItem(JOBS_KEY);
      let data: Job[];

      if (raw) {
        data = JSON.parse(raw);
      } else {
        const response = await fetch('/data/jobs.json');
        data = await response.json();
      }

      // Backfill missing fields for older saves
      const migrated = data.map((j: any) => ({
        ...j,
        archived: typeof j.archived === 'boolean' ? j.archived : false,
        datePosted: j.datePosted || todayISO,
      }));

      setJobs(migrated);
      localStorage.setItem(JOBS_KEY, JSON.stringify(migrated));
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const saveJobs = (updatedJobs: Job[]) => {
    localStorage.setItem(JOBS_KEY, JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  function exportJobsToExcel(allJobs: Job[]) {
    // Jobs sheet
    const jobRows = allJobs.map(j => ({
      ID: j.id,
      Title: j.title,
      Location: j.location,
      Industry: j.industry,
      Description: j.description,
      Requirements: j.requirements.join(' | '),
      DatePosted: j.datePosted,
      Archived: j.archived ? 'Yes' : 'No',
    }));

    // Industries sheet
    const industryRows = industries.map((industry, index) => ({
      ID: index + 1,
      Industry: industry,
      JobsUsing: allJobs.filter(job => job.industry === industry).length,
      CanRemove: allJobs.filter(job => job.industry === industry).length === 0 ? 'Yes' : 'No'
    }));

    // Create workbook with multiple sheets
    const wb = XLSX.utils.book_new();
    
    // Add Jobs sheet
    const jobsWs = XLSX.utils.json_to_sheet(jobRows);
    XLSX.utils.book_append_sheet(wb, jobsWs, 'Jobs');
    
    // Add Industries sheet
    const industriesWs = XLSX.utils.json_to_sheet(industryRows);
    XLSX.utils.book_append_sheet(wb, industriesWs, 'Industries');

    const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `erp21-data-${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  // Helper functions to filter jobs
  const currentJobs = jobs.filter(job => !job.archived);
  const archivedJobs = jobs.filter(job => job.archived);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginAttempts >= 5) {
      alert('Too many failed attempts. Please wait before trying again.');
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Invalid password');

      setIsAuthenticated(true);
      setLoginAttempts(0);
      setPassword('');
    } catch (err: any) {
      setLoginAttempts((n) => n + 1);
      const remaining = 5 - (loginAttempts + 1);
      alert(`Invalid password. ${remaining > 0 ? `${remaining} attempts remaining.` : 'No attempts remaining.'}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.industry || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const nowISO = new Date().toISOString().split('T')[0];

    if (editingJob) {
      const updatedJobs = jobs.map(job =>
        job.id === editingJob.id
          ? {
              ...editingJob,
              ...formData,
              datePosted: formData.datePosted || editingJob.datePosted || nowISO,
              archived: editingJob.archived, // keep archived state unless explicitly toggled
              requirements: formData.requirements.filter(req => req.trim()),
            }
          : job
      );
      saveJobs(updatedJobs);
    } else {
      const newJob: Job = {
        id: Date.now().toString(),
        ...formData,
        datePosted: formData.datePosted || nowISO,
        archived: false,
        requirements: formData.requirements.filter(req => req.trim()),
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
      requirements: [...job.requirements, ''], // Add empty field for new requirements
      datePosted: job.datePosted || todayISO,
      archived: job.archived ?? false,
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

  const addIndustry = (newIndustry: string) => {
    if (newIndustry.trim() && !industries.includes(newIndustry.trim())) {
      setIndustries([...industries, newIndustry.trim()]);
      setIndustrySuccess(`Industry "${newIndustry.trim()}" added successfully!`);
      setIndustryError(null);
      // Clear success after 3 seconds
      setTimeout(() => setIndustrySuccess(null), 3000);
      setShowIndustryEditor(false);
    }
  };

  const removeIndustry = (industryToRemove: string) => {
    // Check if any jobs are using this industry
    const jobsUsingIndustry = jobs.filter(job => job.industry === industryToRemove);
    
    if (jobsUsingIndustry.length > 0) {
      setIndustryError(`Cannot remove "${industryToRemove}" - ${jobsUsingIndustry.length} job(s) are using this industry`);
      // Clear error after 5 seconds
      setTimeout(() => setIndustryError(null), 5000);
      return;
    }
    
    // Open confirmation modal
    setDeleteIndustryModal({ isOpen: true, industry: industryToRemove });
  };

  const confirmRemoveIndustry = (industryToRemove: string) => {
    const index = industries.indexOf(industryToRemove);
    if (index > -1) {
      setIndustries(industries.filter((_, i) => i !== index));
      setIndustrySuccess(`Industry "${industryToRemove}" removed successfully!`);
      setIndustryError(null);
      // Clear success after 3 seconds
      setTimeout(() => setIndustrySuccess(null), 3000);
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
                <strong>Note:</strong> Password is validated server-side. Your session lasts up to 12 hours.
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
          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                const updated = jobs.map(j => isOlderThan14Days(j.datePosted) ? { ...j, archived: true } : j);
                saveJobs(updated);
              }}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded"
            >
              Archive all older than 14 days
            </button>

                         <button
               onClick={() => exportJobsToExcel(jobs)}
               className="btn-secondary"
               title="Export jobs and industries to Excel"
             >
               Export Data
             </button>

            <button
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' });
                setIsAuthenticated(false);
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
            <h3 className="text-2xl font-bold text-green-600">{currentJobs.length}</h3>
            <p className="text-gray-600">Active Jobs</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-gray-600">{archivedJobs.length}</h3>
            <p className="text-gray-600">Archived Jobs</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-erp-blue">
              {new Set(jobs.map(job => job.industry)).size}
            </h3>
            <p className="text-gray-600">Industries</p>
            <button
                             onClick={() => {
                 setShowIndustryEditor(true);
                 setIndustryError(null);
                 setIndustrySuccess(null);
                 setTooltipIndustry(null);
               }}
              className="mt-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded"
            >
              Edit Industries
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
                  Date Posted *
                </label>
                <input
                  type="date"
                  value={formData.datePosted}
                  onChange={(e) => setFormData({ ...formData, datePosted: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                  required
                />
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

        {/* Industry Editor Modal */}
        {showIndustryEditor && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-6">Edit Industries</h2>
            
            {/* Success Message */}
            {industrySuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">{industrySuccess}</p>
              </div>
            )}
            
            {/* Error Message */}
            {industryError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{industryError}</p>
              </div>
            )}
            
            <div className="space-y-4">
              {/* Current Industries */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Current Industries</h3>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                   {industries.map((industry, index) => {
                     const jobsUsingIndustry = jobs.filter(job => job.industry === industry);
                     const canRemove = jobsUsingIndustry.length === 0;
                     
                     return (
                       <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded relative">
                         <span className="text-sm text-gray-700">{industry}</span>
                         <button
                           onClick={() => removeIndustry(industry)}
                           className={`text-sm transition-colors ${
                             canRemove 
                               ? 'text-red-600 hover:text-red-800' 
                               : 'text-gray-400 hover:text-gray-600 cursor-not-allowed'
                           }`}
                           onMouseEnter={() => {
                             if (!canRemove) {
                               setTooltipIndustry(industry);
                             }
                           }}
                           onMouseLeave={() => setTooltipIndustry(null)}
                         >
                           ×
                         </button>
                         
                         {/* Tooltip */}
                         {tooltipIndustry === industry && !canRemove && (
                           <div className="absolute right-0 top-full mt-1 z-10 bg-gray-900 text-white text-xs rounded py-2 px-3 shadow-lg whitespace-nowrap">
                             <div className="flex items-center">
                               <span>⚠️ {jobsUsingIndustry.length} job(s) using this industry</span>
                             </div>
                             <div className="absolute top-0 right-2 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                           </div>
                         )}
                       </div>
                     );
                   })}
                 </div>
              </div>

              {/* Add New Industry */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Industry</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                  addIndustry(input.value);
                  input.value = '';
                }} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter industry name"
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                    maxLength={50}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-erp-blue text-white rounded hover:bg-erp-blue-dark"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t">
                                 <button
                   onClick={() => {
                     setShowIndustryEditor(false);
                     setIndustryError(null);
                     setIndustrySuccess(null);
                     setTooltipIndustry(null);
                   }}
                   className="btn-secondary"
                 >
                   Close
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('current')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'current'
                    ? 'border-erp-blue text-erp-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Current Jobs ({currentJobs.length})
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'archived'
                    ? 'border-erp-blue text-erp-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Archived Jobs ({archivedJobs.length})
              </button>
            </nav>
          </div>
          
          {activeTab === 'current' && currentJobs.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">No current jobs available. Add your first job!</p>
            </div>
          ) : activeTab === 'archived' && archivedJobs.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">No archived jobs available.</p>
            </div>
          ) : (
            (activeTab === 'current' ? currentJobs : archivedJobs).map(job => (
              <div key={job.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span>📍 {job.location}</span>
                      <span>🏢 {job.industry}</span>
                      <span>📅 {new Date(job.datePosted).toLocaleDateString()}</span>
                      {!job.archived && isOlderThan14Days(job.datePosted) && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 text-amber-800 text-xs px-2 py-0.5">
                          Older than 2 weeks
                        </span>
                      )}
                      {job.archived && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-gray-200 text-gray-700 text-xs px-2 py-0.5">
                          Archived
                        </span>
                      )}
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
                      onClick={() => {
                        const updated = jobs.map(j => j.id === job.id ? { ...j, archived: !j.archived } : j);
                        saveJobs(updated);
                      }}
                      className={`px-3 py-1 text-sm rounded ${
                        job.archived
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      }`}
                    >
                      {job.archived ? 'Unarchive' : 'Archive'}
                    </button>
                    <button
                      onClick={() => handleEdit(job)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                                         {job.archived && (
                       <button
                         onClick={() => setDeleteModal({ isOpen: true, jobId: job.id })}
                         className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                         title="Permanently delete this archived job"
                       >
                         Delete
                       </button>
                     )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

             {/* Delete Confirmation Modal */}
       <ConfirmModal
         isOpen={deleteModal.isOpen}
         onClose={() => setDeleteModal({ isOpen: false, jobId: null })}
         onConfirm={() => {
           if (deleteModal.jobId) {
             handleDelete(deleteModal.jobId);
           }
         }}
         title="Permanently Delete Job"
         message="This action cannot be undone. The job will be permanently removed from the system and all associated data will be lost."
         confirmText="Delete Permanently"
         cancelText="Cancel"
         type="danger"
       />

       {/* Delete Industry Confirmation Modal */}
       <ConfirmModal
         isOpen={deleteIndustryModal.isOpen}
         onClose={() => setDeleteIndustryModal({ isOpen: false, industry: null })}
         onConfirm={() => {
           if (deleteIndustryModal.industry) {
             confirmRemoveIndustry(deleteIndustryModal.industry);
           }
         }}
         title="Remove Industry"
         message="This industry will be permanently removed from the system. Any new jobs will no longer be able to use this industry."
         confirmText="Remove Industry"
         cancelText="Cancel"
         type="warning"
       />
    </Layout>
  );
}