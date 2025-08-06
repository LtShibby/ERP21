import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = "ERP21 - Bridging the world with resourceful professionals",
  description = "ERP21 is a trusted recruitment partner since 1999, specializing in Oil & Gas, Aerospace, Defence, Utility, Shipping, and Healthcare industries."
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="page-container">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-erp-blue rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900">ERP21</span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex space-x-8">
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
          <div className="page-container py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-erp-blue rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">ERP21</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Bridging the world with resourceful professionals since 1999.
                </p>
                <p className="text-sm text-gray-500">
                  © 2025 ERP21 Pte Ltd. All rights reserved.
                </p>
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
                  <li className="text-gray-600">Oil & Gas</li>
                  <li className="text-gray-600">Aerospace</li>
                  <li className="text-gray-600">Defence</li>
                  <li className="text-gray-600">Utility</li>
                  <li className="text-gray-600">Shipping</li>
                  <li className="text-gray-600">Healthcare</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}