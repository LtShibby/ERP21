interface ServicesListProps {
  services: string[];
  showPractitionerNote?: boolean;
}

export default function ServicesList({ services, showPractitionerNote = false }: ServicesListProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-start">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-erp-blue rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-1 flex-shrink-0">
              <span className="text-white text-xs sm:text-sm">✓</span>
            </div>
            <span className="text-gray-700 text-sm sm:text-base">{service}</span>
          </div>
        ))}
      </div>
      
      {showPractitionerNote && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-erp-blue">
          <p className="text-xs sm:text-sm text-gray-700 italic">
            Our recruiters are also ERP practitioners—so candidates and clients get practical, field-tested guidance.
          </p>
        </div>
      )}
    </div>
  );
}