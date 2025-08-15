interface SectionProps {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
}

export default function Section({ 
  title, 
  children, 
  bgColor = "bg-white", 
  className = "" 
}: SectionProps) {
  return (
    <section className={`py-12 sm:py-16 lg:py-20 ${bgColor} ${className}`}>
      <div className="page-container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}