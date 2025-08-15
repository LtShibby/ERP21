import Layout from '../components/Layout';
import Link from 'next/link';
import ServicesList from '../components/ServicesList';
import erp21 from '../content/erp21';

export default function Home() {
  return (
    <Layout 
      title={erp21.seo.title}
      description={erp21.seo.description}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-erp-blue to-erp-blue-dark text-white">
        <div className="page-container py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Bridging the world with resourceful professionals
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100">
              {erp21.about.since}, ERP21 has been connecting top talent with leading companies across critical industries worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/jobs" className="btn-primary bg-white text-erp-blue hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4">
                Explore Open Roles
              </Link>
              <Link href="/contact" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-erp-blue px-6 py-3 sm:px-8 sm:py-4">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We specialize in recruiting for critical industries that require specialized expertise and experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {erp21.about.industries.map((industry, index) => (
              <div key={index} className="card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-erp-blue rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">
                    {industry.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry}</h3>
                <p className="text-gray-600">Specialized recruitment for {industry.toLowerCase()} industry professionals</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="page-container">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive SAP and ERP solutions with specialized recruitment services.
            </p>
          </div>
          <ServicesList services={erp21.services} showPractitionerNote={true} />
        </div>
      </section>

      {/* Why Choose ERP21 Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose ERP21?
            </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-erp-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{erp21.keyStats[0].value} of Experience</h3>
                    <p className="text-gray-600">{erp21.about.since}, we have deep industry knowledge and extensive networks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-erp-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">SEA Regional Presence</h3>
                    <p className="text-gray-600">Current offices in Singapore and Malaysia, expanding to Indonesia, Vietnam, and India.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-erp-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Licensed & Compliant</h3>
                    <p className="text-gray-600">{erp21.about.momLicence} - fully licensed recruitment partner.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-erp-blue rounded-lg p-8 text-white">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">{erp21.motto.main}</h3>
                <p className="text-blue-100">{erp21.motto.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{erp21.keyStats[1].value}</div>
                  <div className="text-blue-100 text-sm">{erp21.keyStats[1].label}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{erp21.keyStats[3].value}</div>
                  <div className="text-blue-100 text-sm">{erp21.keyStats[3].label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-erp-blue text-white">
        <div className="page-container text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100">
            Browse our current openings or get in touch to discuss your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/jobs" className="btn-primary bg-white text-erp-blue hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4">
              View Current Jobs
            </Link>
            <Link href="/contact" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-erp-blue px-6 py-3 sm:px-8 sm:py-4">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}