import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import erp21 from '../content/erp21';
import CareersBanner from './CareersBanner';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = erp21.seo.title,
  description = erp21.seo.description
}: LayoutProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Careers Banner */}
        <CareersBanner />
        
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="page-container">
            <div className="flex justify-between items-center h-14 sm:h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="mr-3">
                  <Image
                    src="/images/erp21Logo.JPG"
                    alt="ERP21 logo"
                    // intrinsic dimensions; display size controlled by Tailwind classes below
                    width={64}
                    height={64}
                    className="rounded-lg object-cover w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                    priority
                  />
                </div>
                <span className="text-xl font-bold text-gray-900">ERP21</span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                <Link 
                  href="/" 
                  className={`text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-erp-blue border-b-2 border-erp-blue pb-1' 
                      : 'text-gray-600 hover:text-erp-blue'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className={`text-sm font-medium transition-colors ${
                    isActive('/about') 
                      ? 'text-erp-blue border-b-2 border-erp-blue pb-1' 
                      : 'text-gray-600 hover:text-erp-blue'
                  }`}
                >
                  About
                </Link>
                <Link 
                  href="/jobs" 
                  className={`text-sm font-medium transition-colors ${
                    isActive('/jobs') 
                      ? 'text-erp-blue border-b-2 border-erp-blue pb-1' 
                      : 'text-gray-600 hover:text-erp-blue'
                  }`}
                >
                  Jobs
                </Link>
                <Link 
                  href="/contact" 
                  className={`text-sm font-medium transition-colors ${
                    isActive('/contact') 
                      ? 'text-erp-blue border-b-2 border-erp-blue pb-1' 
                      : 'text-gray-600 hover:text-erp-blue'
                  }`}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={toggleMobileMenu}
                  className="text-gray-600 hover:text-gray-900 p-2"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Mobile Menu Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
              onClick={closeMobileMenu}
            ></div>
            
            {/* Mobile Menu Content */}
            <div className="md:hidden bg-white border-b border-gray-200 relative z-50">
              <div className="page-container py-4">
                {/* Mobile menu header with logo and close button */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <Image
                        src="/images/erp21Logo.JPG"
                        alt="ERP21 logo"
                        width={56}
                        height={56}
                        className="rounded-lg object-cover w-10 h-10 md:w-12 md:h-12"
                        priority
                      />
                    </div>
                    <span className="text-lg font-bold text-gray-900">ERP21</span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col space-y-4">
                  <Link 
                    href="/" 
                    onClick={closeMobileMenu}
                    className={`text-lg font-medium transition-colors py-2 ${
                      isActive('/') 
                        ? 'text-erp-blue' 
                        : 'text-gray-600 hover:text-erp-blue'
                    }`}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    onClick={closeMobileMenu}
                    className={`text-lg font-medium transition-colors py-2 ${
                      isActive('/about') 
                        ? 'text-erp-blue' 
                        : 'text-gray-600 hover:text-erp-blue'
                    }`}
                  >
                    About
                  </Link>
                  <Link 
                    href="/jobs" 
                    onClick={closeMobileMenu}
                    className={`text-lg font-medium transition-colors py-2 ${
                      isActive('/jobs') 
                        ? 'text-erp-blue' 
                        : 'text-gray-600 hover:text-erp-blue'
                    }`}
                  >
                    Jobs
                  </Link>
                  <Link 
                    href="/contact" 
                    onClick={closeMobileMenu}
                    className={`text-lg font-medium transition-colors py-2 ${
                      isActive('/contact') 
                        ? 'text-erp-blue' 
                        : 'text-gray-600 hover:text-erp-blue'
                    }`}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="page-container py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Company Info */}
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <div className="mr-2">
                    <Image
                      src="/images/erp21Logo.JPG"
                      alt="ERP21 logo"
                      width={56}
                      height={56}
                      className="rounded-lg object-cover w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                      priority
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-900">ERP21</span>
                </div>
                <p className="text-gray-600 mb-4">
                  {erp21.motto.subtitle} — {erp21.about.since.toLowerCase()}.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    {erp21.about.momLicence}
                  </p>
                  <p className="text-sm text-gray-500">
                    © 2025 ERP21 Pte Ltd. All rights reserved.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li><Link href="/" className="text-gray-600 hover:text-erp-blue transition-colors">Home</Link></li>
                  <li><Link href="/about" className="text-gray-600 hover:text-erp-blue transition-colors">About</Link></li>
                  <li><Link href="/jobs" className="text-gray-600 hover:text-erp-blue transition-colors">Jobs</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-erp-blue transition-colors">Contact</Link></li>
                </ul>
              </div>

              {/* Industries */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Industries
                </h3>
                <ul className="space-y-3 text-sm">
                  {erp21.about.industries.map((industry, index) => (
                    <li key={index} className="text-gray-600">{industry}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}