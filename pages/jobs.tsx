import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import JobCard from '../components/JobCard';

interface Job {
  id: string;
  title: string;
  location: string;
  industry: string;
  description: string;
  requirements: string[];
  datePosted: string;
  archived?: boolean;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const industries = ['All', 'Oil & Gas', 'Aerospace', 'Defence', 'Utility', 'Shipping', 'Healthcare'];
  const locations = ['All', 'Singapore', 'Malaysia', 'Remote'];

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, selectedIndustry, selectedLocation]);

  const loadJobs = async () => {
    try {
      // Try to load from localStorage first (for admin updates)
      const localJobs = localStorage.getItem('erp21-jobs');
      if (localJobs) {
        const parsedJobs = JSON.parse(localJobs);
        // Filter out archived jobs for public view
        const publicJobs = parsedJobs.filter((job: Job) => !job.archived);
        setJobs(publicJobs);
      } else {
        // Fallback to static JSON file
        const response = await fetch('/data/jobs.json');
        const data = await response.json();
        // Filter out archived jobs for public view
        const publicJobs = data.filter((job: Job) => !job.archived);
        setJobs(publicJobs);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (selectedIndustry !== 'All') {
      filtered = filtered.filter(job => job.industry === selectedIndustry);
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <Layout title="Current Job Openings - ERP21" description="Browse current job opportunities across Oil & Gas, Aerospace, Defence, Utility, Shipping, and Healthcare industries.">
        <div className="page-container py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-erp-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Current Job Openings - ERP21" 
      description="Browse current job opportunities across Oil & Gas, Aerospace, Defence, Utility, Shipping, and Healthcare industries."
    >
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Current Opportunities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore exciting career opportunities across our specialized industries. Find your next role with leading companies worldwide.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12">
        <div className="page-container">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                No opportunities match your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedIndustry('All');
                  setSelectedLocation('All');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-erp-blue text-white">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't see the right opportunity?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact us to discuss your career goals and let us help you find the perfect match.
          </p>
          <a 
            href="mailto:jobs@erp21.com"
            className="btn-primary bg-white text-erp-blue hover:bg-gray-100"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </Layout>
  );
}