import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface VehicleShowcaseProps {
  category: string;
  models: string[];
  description: string;
  imageSrc: string;
}

const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({ 
  category, 
  models, 
  description,
  imageSrc 
}) => {
  const { t } = useTranslation();
  const [isRotating, setIsRotating] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    setStartX(e.clientX);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setMouseDown(true);
    setStartX(e.touches[0].clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDown) return;
    
    const deltaX = e.clientX - startX;
    setRotation(prev => prev + deltaX * 0.5);
    setStartX(e.clientX);
    setIsRotating(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!mouseDown) return;
    
    const deltaX = e.touches[0].clientX - startX;
    setRotation(prev => prev + deltaX * 0.5);
    setStartX(e.touches[0].clientX);
    setIsRotating(true);
  };
  
  const handleMouseUp = () => {
    setMouseDown(false);
    setTimeout(() => setIsRotating(false), 150);
  };
  
  return (
    <motion.div 
      className="glass-card p-6 overflow-hidden flex flex-col h-[600px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-none">
        <h3 className="text-xl font-bold mb-2 gold-text">{t(`vehicles.${category.toLowerCase()}_title`)}</h3>
        <p className="text-gray-400 mb-4 h-12 line-clamp-2">{t(`vehicles.${category.toLowerCase()}_text`)}</p>
        
        <div className="mb-3 text-sm text-gold-light h-16 overflow-hidden">
          {models.join(' • ')}
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-grow relative bg-black-light rounded-lg overflow-hidden mb-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <motion.div
          style={{ 
            rotateY: rotation,
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full"
        >
          <img 
            src={imageSrc} 
            alt={category} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Drag indicator overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${isRotating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-white text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-4-4v8m0 4a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <p>{t('common.drag_to_rotate')}</p>
          </div>
        </div>
      </div>
      
      <button className="w-full py-2 px-4 bg-gold-gradient text-black rounded-lg font-medium text-sm flex-none">
        {t('common.view_details')}
      </button>
    </motion.div>
  );
};

export default VehicleShowcase;