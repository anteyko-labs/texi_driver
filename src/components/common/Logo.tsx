import React from 'react';

interface LogoProps {
  className?: string;
}
export const Logo: React.FC<LogoProps> = ({ className = 'h-12' }) => {
  return (
    <div className="relative flex items-center">
      <div className={`${className} flex items-center`}>
        <img 
          src="/src/img/IMG_0996 (1)-Photoroom.png" 
          alt="Logo" 
          className="h-12 w-auto object-contain max-w-none"
        />
        <div className="ml-2">
          <div className="font-bold text-xl uppercase tracking-widest text-white">Driver</div>
          <div className="text-xs uppercase tracking-wider text-gold-light gold-text">Service</div>
        </div>
      </div>
    </div>
  );
};