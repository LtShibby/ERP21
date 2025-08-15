import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CareersBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white relative transform transition-all duration-500 ease-out ${
      isAnimated ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="page-container py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">🚀 New Opportunities Available!</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-100">Check out our latest SAP & ERP roles on</span>
            <Link 
              href="https://www.mycareersfuture.gov.sg/search?search=erp21&sortBy=relevancy&page=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              MyCareersFuture
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-4 text-blue-100 hover:text-white transition-colors duration-200"
        aria-label="Close banner"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
