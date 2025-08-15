import { useState, useEffect } from 'react';

interface KeyStat {
  label: string;
  value: string;
}

interface KeyStatsProps {
  stats: KeyStat[];
}

export default function KeyStats({ stats }: KeyStatsProps) {
  const [animatedValues, setAnimatedValues] = useState<string[]>(stats.map(() => '0'));
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const animateNumbers = () => {
      setIsAnimating(true);
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        
        const newValues = stats.map((stat, index) => {
          const finalValue = stat.value;
          
          // Handle different value formats
          if (finalValue.includes('+')) {
            const numericPart = finalValue.replace('+', '');
            const progress = currentStep / steps;
            const animatedNumber = Math.floor(parseInt(numericPart) * progress);
            return `${animatedNumber}+`;
          } else if (finalValue.includes('~')) {
            const numericPart = finalValue.replace('~', '');
            const progress = currentStep / steps;
            const animatedNumber = Math.floor(parseInt(numericPart) * progress);
            return `~${animatedNumber}`;
          } else {
            const progress = currentStep / steps;
            const animatedNumber = Math.floor(parseInt(finalValue) * progress);
            return animatedNumber.toString();
          }
        });

        setAnimatedValues(newValues);

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues(stats.map(stat => stat.value));
          setHasAnimated(true);
          setIsAnimating(false);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    // Start animation after a small delay for better UX
    const timer = setTimeout(animateNumbers, 300);
    return () => clearTimeout(timer);
  }, [stats, hasAnimated]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className={`bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 transition-all duration-300 ${
            isAnimating ? 'transform scale-105 shadow-md' : 'transform scale-100'
          }`}>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-erp-blue mb-2">
              {animatedValues[index]}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}