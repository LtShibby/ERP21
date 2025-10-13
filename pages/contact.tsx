import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout 
      title="Contact ERP21 - Get in Touch with Our Recruitment Team"
      description="Contact ERP21 for your recruitment needs. Email us at alfakk@erp21.com.sg or connect via WhatsApp for immediate assistance."
    >
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="page-container">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to find your next opportunity or need recruitment solutions? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="page-container">
          <div className="flex justify-center">
            {/* Contact Information */}
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Contact Information
              </h2>
              
              <div className="space-y-8 bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-erp-blue rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 mb-2">Send us your inquiries or job applications</p>
                    <a 
                      href="mailto:alfakk@erp21.com.sg" 
                      className="text-erp-blue hover:text-erp-blue-dark font-medium"
                    >
                      alfakk@erp21.com.sg
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <p className="text-gray-600 mb-2">Quick response for urgent inquiries</p>
                    <div className="flex flex-col gap-1">
                      <a
                        href="https://wa.me/6598806711"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        +65 9880 6711
                      </a>
                      <a
                        href="https://wa.me/6598806721"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        +65 9880 6721
                      </a>
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start mt-4">
                  <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.5c0-1.31-.03-2.99-1.82-2.99-1.82 0-2.1 1.42-2.1 2.89v5.6h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.6v5.58z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">LinkedIn</h3>
                    <p className="text-gray-600 mb-2">Follow us on LinkedIn for company updates and job postings.</p>
                    <a
                      href="https://www.linkedin.com/company/erp21-pte-ltd/about/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 font-medium"
                    >
                      ERP21 on LinkedIn
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-erp-blue rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">
                      Singapore
                      <br />
                      <span className="text-sm">Serving Asia-Pacific and beyond</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {/* <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry of Interest
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                  >
                    <option value="">Select an industry</option>
                    <option value="oil-gas">Oil & Gas</option>
                    <option value="aerospace">Aerospace</option>
                    <option value="defence">Defence</option>
                    <option value="utility">Utility</option>
                    <option value="shipping">Shipping</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Inquiry
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="job-seeker">Job Seeker</option>
                    <option value="employer">Employer/Recruitment Services</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your needs, experience, or how we can help you..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-blue focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('This is a demo form. In a real implementation, this would send your message to our team.');
                  }}
                >
                  Send Message
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                * Required fields. We'll get back to you within 24 hours.
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 sm:py-16 lg:py-20 bg-erp-blue text-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Quick Actions
            </h2>
            <p className="text-lg sm:text-xl text-blue-100">
              Looking for something specific? Here are the fastest ways to get what you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Your Resume</h3>
              <p className="text-blue-100 mb-4">Send your CV directly for future opportunities</p>
              <a 
                href="mailto:alfakk@erp21.com.sg?subject=Resume Submission&body=Dear ERP21 Team,%0D%0A%0D%0APlease find my resume attached for your consideration for future opportunities.%0D%0A%0D%0ABest regards"
                className="btn-secondary bg-white text-erp-blue hover:bg-gray-100"
              >
                Email Resume
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Employer Services</h3>
              <p className="text-blue-100 mb-4">Need recruitment solutions for your company?</p>
              <a 
                href="mailto:alfakk@erp21.com.sg?subject=Employer Services Inquiry&body=Dear ERP21 Team,%0D%0A%0D%0AI am interested in learning more about your recruitment services for employers.%0D%0A%0D%0ACompany:%0D%0AIndustry:%0D%0APosition(s) needed:%0D%0A%0D%0APlease contact me to discuss our requirements.%0D%0A%0D%0ABest regards"
                className="btn-secondary bg-white text-erp-blue hover:bg-gray-100"
              >
                Get Started
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Urgent Inquiries</h3>
              <p className="text-blue-100 mb-4">Need immediate assistance or have urgent questions?</p>
              <a 
                href="https://wa.me/6591234567?text=Hello%20ERP21%2C%20I%20have%20an%20urgent%20inquiry%20about..."
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary bg-green-500 text-white hover:bg-green-600 border-green-500"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}