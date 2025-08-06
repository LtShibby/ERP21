import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout 
      title="ERP21 - Bridging the world with resourceful professionals"
      description="ERP21 is a trusted recruitment partner since 1999, specializing in Oil & Gas, Aerospace, Defence, Utility, Shipping, and Healthcare industries."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-erp-blue to-erp-blue-dark text-white">
        <div className="page-container py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bridging the world with resourceful professionals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Since 1999, ERP21 has been connecting top talent with leading companies across critical industries worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs" className="btn-primary bg-white text-erp-blue hover:bg-gray-100">
                Explore Open Roles
              </Link>
              <Link href="/contact" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-erp-blue">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We specialize in recruiting for critical industries that require specialized expertise and experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Oil & Gas",
                description: "Offshore platforms, refineries, and petrochemical facilities",
                icon: "⚡"
              },
              {
                title: "Aerospace",
                description: "Aircraft systems, space technology, and defense applications",
                icon: "✈️"
              },
              {
                title: "Defence",
                description: "Military systems, security technology, and government projects",
                icon: "🛡️"
              },
              {
                title: "Utility",
                description: "Power generation, water treatment, and infrastructure",
                icon: "🔌"
              },
              {
                title: "Shipping",
                description: "Maritime operations, port logistics, and vessel management",
                icon: "🚢"
              },
              {
                title: "Healthcare",
                description: "Medical technology, healthcare IT, and pharmaceutical",
                icon: "🏥"
              }
            ].map((industry, index) => (
              <div key={index} className="card hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.title}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ERP21 Section */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose ERP21?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-erp-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">25+ Years of Experience</h3>
                    <p className="text-gray-600">Established in 1999, we have deep industry knowledge and extensive networks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-erp-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Global Reach</h3>
                    <p className="text-gray-600">Connecting talent across Singapore, Malaysia, and international markets.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-erp-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Industry Specialization</h3>
                    <p className="text-gray-600">Focused expertise in critical industries with specialized requirements.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "We pride ourselves in being a trusted player in the industry..."
              </blockquote>
              <cite className="text-erp-blue font-semibold">— Mr. Moh Alkaff</cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-erp-blue text-white">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Browse our current openings or get in touch to discuss your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs" className="btn-primary bg-white text-erp-blue hover:bg-gray-100">
              View Current Jobs
            </Link>
            <Link href="/contact" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-erp-blue">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}