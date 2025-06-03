import React from 'react';

interface LogoProps {
  className?: string;
}
export const Logo: React.FC<LogoProps> = ({ className = 'h-12' }) => {
  return (
    <div className="relative flex items-center">
      <div className={`${className} flex items-center`}>
        <img 
          src="IMG_0996_Photoroom.png"
          alt="Logo" 
          className="h-20 w-auto object-contain max-w-none"
        />
        <div className="ml-2">
          <div className="font-bold text-xl uppercase tracking-widest text-white">Driver</div>
          <div className="text-xs uppercase tracking-wider text-gold-light gold-text">Service</div>
        </div>
      </div>
    </div>
  );
};