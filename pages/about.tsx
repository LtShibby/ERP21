import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout 
      title="About ERP21 - Trusted Recruitment Partner Since 1999"
      description="Learn about ERP21's history, mission, and expertise in recruiting for Oil & Gas, Aerospace, Defence, Utility, Shipping, and Healthcare industries."
    >
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="page-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About ERP21
            </h1>
            <p className="text-xl text-gray-600">
              Bridging the world with resourceful professionals since 1999
            </p>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1999, ERP21 has been at the forefront of connecting exceptional talent with leading companies across critical industries. What started as a vision to bridge the gap between skilled professionals and specialized industries has grown into a trusted recruitment partner with over 25 years of experience.
                </p>
                <p>
                  Our deep understanding of industry-specific requirements, combined with our extensive global network, allows us to deliver tailored recruitment solutions that drive business success and career advancement.
                </p>
                <p>
                  Based in Singapore with reach across Southeast Asia and beyond, we continue to evolve with the changing landscape of work while maintaining our commitment to excellence and integrity.
                </p>
              </div>
            </div>
            <div className="bg-erp-blue rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">25+ Years</h3>
              <p className="text-blue-100 mb-6">of trusted recruitment expertise</p>
              
              <h3 className="text-2xl font-bold mb-4">6 Key Industries</h3>
              <p className="text-blue-100 mb-6">specializing in critical sectors</p>
              
              <h3 className="text-2xl font-bold mb-4">Global Network</h3>
              <p className="text-blue-100">connecting talent worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our specialized knowledge across these critical industries enables us to understand unique requirements and identify the right talent for complex roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Oil & Gas",
                description: "From offshore drilling platforms to refinery operations, we understand the technical expertise and safety requirements essential in the petrochemical industry. Our candidates are vetted for their experience with industry standards and regulations.",
                highlights: ["Offshore platforms", "Refinery operations", "Petrochemical facilities", "Pipeline systems"]
              },
              {
                title: "Aerospace",
                description: "The aerospace industry demands precision and innovation. We recruit for aircraft manufacturers, space technology companies, and defense contractors, focusing on candidates with cutting-edge technical skills and security clearances.",
                highlights: ["Aircraft systems", "Space technology", "Defense applications", "Avionics"]
              },
              {
                title: "Defence",
                description: "Security and reliability are paramount in defense recruitment. We specialize in finding professionals with the right clearances and expertise for military systems, cybersecurity, and government projects.",
                highlights: ["Military systems", "Cybersecurity", "Government projects", "Defense technology"]
              },
              {
                title: "Utility",
                description: "Power generation, water treatment, and infrastructure projects require specialized knowledge. We connect utilities with engineers and technicians who understand critical infrastructure operations.",
                highlights: ["Power generation", "Water treatment", "Smart grid technology", "Infrastructure"]
              },
              {
                title: "Shipping",
                description: "Maritime operations require deep understanding of international regulations and logistics. We recruit for vessel operations, port management, and maritime technology roles across the shipping industry.",
                highlights: ["Maritime operations", "Port logistics", "Vessel management", "Shipping technology"]
              },
              {
                title: "Healthcare",
                description: "Healthcare technology and medical device industries require professionals who understand both technical innovation and regulatory compliance. We find talent that can navigate this complex landscape.",
                highlights: ["Medical technology", "Healthcare IT", "Pharmaceutical", "Regulatory compliance"]
              }
            ].map((industry, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{industry.title}</h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <div className="space-y-2">
                  {industry.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-erp-blue rounded-full mr-3"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Quote */}
      <section className="py-20">
        <div className="page-container">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl text-gray-700 italic mb-8">
              "We pride ourselves in being a trusted player in the industry, building long-term relationships with both our clients and candidates. Our success is measured not just by successful placements, but by the lasting impact we create in people's careers and organizations' growth."
            </blockquote>
            <cite className="text-erp-blue text-lg font-semibold">— Mr. Moh Alkaff</cite>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-erp-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust</h3>
              <p className="text-gray-600">Building lasting relationships through transparency, integrity, and reliable service.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-erp-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">Delivering exceptional results through deep industry knowledge and meticulous attention to detail.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-erp-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Vision</h3>
              <p className="text-gray-600">Connecting talent across borders to meet the evolving needs of international markets.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}