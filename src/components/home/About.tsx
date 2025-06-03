import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading 
              title={t('home.about_title')}
              centered={false}
            />
            <p className="text-gray-400 text-lg mb-6">
              {t('home.about_text')}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold gold-text">10+</span>
                <span className="text-gray-400">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold gold-text">30+</span>
                <span className="text-gray-400">Luxury Vehicles</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold gold-text">50+</span>
                <span className="text-gray-400">Professional Drivers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold gold-text">10000+</span>
                <span className="text-gray-400">Happy Customers</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="rounded-xl overflow-hidden border-2 border-gold-light shadow-xl shadow-gold-dark/20">
              <img 
                src="https://images.pexels.com/photos/14801729/pexels-photo-14801729.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Premium taxi service"
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating smaller image */}
            <motion.div 
              className="absolute -bottom-10 -left-10 w-48 h-48 rounded-lg overflow-hidden border-2 border-gold-light shadow-lg z-10 hidden md:block"
              initial={{ y: 20 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <img 
                src="https://images.pexels.com/photos/2313396/pexels-photo-2313396.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Luxury vehicle interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Gold gradient overlay */}
            <div className="absolute inset-0 bg-gold-gradient opacity-10 rounded-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;