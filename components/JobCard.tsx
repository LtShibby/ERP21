interface Job {
  id: string;
  title: string;
  location: string;
  industry: string;
  description: string;
  requirements: string[];
  datePosted: string;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-SG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getIndustryColor = (industry: string) => {
    const colors: { [key: string]: string } = {
      'Oil & Gas': 'bg-orange-100 text-orange-800',
      'Aerospace': 'bg-blue-100 text-blue-800',
      'Defence': 'bg-green-100 text-green-800',
      'Utility': 'bg-yellow-100 text-yellow-800',
      'Shipping': 'bg-cyan-100 text-cyan-800',
      'Healthcare': 'bg-red-100 text-red-800'
    };
    return colors[industry] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {job.location}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getIndustryColor(job.industry)}`}>
              {job.industry}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Posted {formatDate(job.datePosted)}
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>

      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
        <ul className="space-y-1">
          {job.requirements.slice(0, 3).map((requirement, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-erp-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
              {requirement}
            </li>
          ))}
          {job.requirements.length > 3 && (
            <li className="text-sm text-gray-500 italic">
              +{job.requirements.length - 3} more requirements
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`mailto:jobs@erp21.com?subject=Application for ${job.title}&body=Dear ERP21 Team,%0D%0A%0D%0AI am interested in applying for the ${job.title} position (ID: ${job.id}).%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABest regards`}
          className="btn-primary text-center"
        >
          Apply Now
        </a>
        <button className="btn-secondary">
          Learn More
        </button>
      </div>
    </div>
  );
}