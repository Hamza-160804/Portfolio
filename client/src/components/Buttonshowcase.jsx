import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

// Primary Button - Main Call to Action
export const PrimaryButton = ({ 
  children, 
  onClick, 
  className = '', 
  icon: Icon = null,
  ...props 
}) => (
  <button
    className={`
      px-6 py-3 
      bg-[#320F85] 
      text-white 
      rounded-lg 
      font-medium 
      flex items-center justify-center
      transition duration-300 
      hover:bg-[#2D5FB6]
      cursor-pointer
      ${className}
    `}
    onClick={onClick}
    {...props}
  >
    {Icon && <Icon className="mr-2" size={20} />}
    {children}
  </button>
);

// Secondary Button - Alternative Action
export const SecondaryButton = ({ 
  children, 
  onClick, 
  className = '', 
  icon: Icon = null,
  ...props 
}) => (
  <button
    className={`
      px-6 py-3 
      bg-[#320F85]
      rounded-lg 
      font-medium 
      flex items-center justify-center
      transition duration-300
      hover:bg-[#2D5FB6]
      cursor-pointer
      ${className}
    `}
    onClick={onClick}
    {...props}
  >
    {Icon && <Icon className="mr-2" size={20} />}
    {children}
  </button>
);

// Example Usage Component
const Buttonshowcase = () => {
  const handleDownload = () => {
    // Download logic
    window.open(`${process.env.PUBLIC_URL}/My-Resume.pdf`, '_blank');
  };

  return (
    <div className="flex space-x-4">
      <PrimaryButton 
        onClick={handleDownload} 
        icon={Download}
      >
        Download CV
      </PrimaryButton>

      <SecondaryButton 
        onClick={() => window.open('https://github.com/Hamza-160804', '_blank')}
        icon={ExternalLink}
      >
        View GitHub
      </SecondaryButton>
    </div>
  );
};

export default Buttonshowcase;