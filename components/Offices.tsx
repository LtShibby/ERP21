interface Office {
  country: string;
  address: string;
}

interface OfficesProps {
  current: Office[];
  comingSoon: string[];
}

export default function Offices({ current, comingSoon }: OfficesProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Current Offices */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Current Offices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {current.map((office, index) => (
            <div key={index} className="card">
              <h4 className="font-semibold text-gray-900 mb-2">{office.country}</h4>
              <p className="text-gray-600 text-sm">{office.address}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Coming Soon</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {comingSoon.map((location, index) => (
            <span 
              key={index} 
              className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium"
            >
              {location}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}