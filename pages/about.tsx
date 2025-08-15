import Layout from '../components/Layout';
import Section from '../components/Section';
import KeyStats from '../components/KeyStats';
import Offices from '../components/Offices';
import ServicesList from '../components/ServicesList';
import CeoSpotlight from '../components/CeoSpotlight';
import erp21 from '../content/erp21';

export default function About() {
  return (
    <Layout 
      title={erp21.seo.title}
      description={erp21.seo.description}
    >
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="page-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {erp21.about.headline}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              {erp21.about.since} — {erp21.motto.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                {erp21.about.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                
                {/* ERP Variants */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-erp-blue">
                  <h4 className="font-semibold text-gray-900 mb-2">Enterprise Solutions:</h4>
                  <ul className="space-y-1">
                    {erp21.about.erpVariants.map((variant, index) => (
                      <li key={index} className="text-sm text-gray-700">• {variant}</li>
                    ))}
                  </ul>
                </div>
                
                {/* MOM Licence */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">{erp21.about.momLicence}</p>
                </div>
              </div>
            </div>
            <div className="bg-erp-blue rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{erp21.keyStats[0].value}</h3>
              <p className="text-blue-100 mb-6">{erp21.keyStats[0].label}</p>
              
              <h3 className="text-2xl font-bold mb-4">{erp21.keyStats[1].value}</h3>
              <p className="text-blue-100 mb-6">{erp21.keyStats[1].label}</p>
              
              <h3 className="text-2xl font-bold mb-4">SEA Focus</h3>
              <p className="text-blue-100">connecting talent across regions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Spotlight */}
      <CeoSpotlight />

      {/* Industries & Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Industries */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Industries We Serve</h2>
              <div className="grid grid-cols-1 gap-4">
                {erp21.about.industries.map((industry, index) => (
                  <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-3 h-3 bg-erp-blue rounded-full mr-4"></div>
                    <span className="font-medium text-gray-900">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h2>
              <ServicesList services={erp21.services} showPractitionerNote={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="page-container">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Track Record
            </h2>
          </div>
          <KeyStats stats={erp21.keyStats} />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Vision */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <ul className="space-y-4">
                {erp21.vision.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-erp-blue rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm">•</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Mission */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <ul className="space-y-4">
                {erp21.mission.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-erp-blue rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm">•</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* People Values */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="page-container">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our People Values
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {erp21.peopleValues.map((value, index) => (
              <span 
                key={index} 
                className="px-6 py-3 bg-erp-blue text-white rounded-full font-medium"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Motto */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="page-container">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 italic mb-4">
              {erp21.motto.main}
            </blockquote>
            <cite className="text-erp-blue text-lg font-semibold">{erp21.motto.subtitle}</cite>
          </div>
        </div>
      </section>
      
      {/* Offices */}
      <Section title="Office Locations" bgColor="bg-white">
        <Offices current={erp21.offices.current} comingSoon={erp21.offices.comingSoon} />
      </Section>
    </Layout>
  );
}