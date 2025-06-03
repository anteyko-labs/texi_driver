import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
  light = false,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}
    >
      <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${light ? 'text-white' : 'gold-text'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg ${light ? 'text-gray-300' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-gold-gradient rounded-full mt-4 ${centered ? 'mx-auto' : 'ml-0'}`}></div>
    </motion.div>
  );
};

export default SectionHeading;