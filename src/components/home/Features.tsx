import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Clock, MapPin, Car } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const Features: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Car size={48} className="text-gold-light mb-4" />,
      title: t('home.reason1_title'),
      description: t('home.reason1_text'),
    },
    {
      icon: <Shield size={48} className="text-gold-light mb-4" />,
      title: t('home.reason2_title'),
      description: t('home.reason2_text'),
    },
    {
      icon: <Clock size={48} className="text-gold-light mb-4" />,
      title: t('home.reason3_title'),
      description: t('home.reason3_text'),
    },
    {
      icon: <MapPin size={48} className="text-gold-light mb-4" />,
      title: t('home.reason4_title'),
      description: t('home.reason4_text'),
    },
  ];
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  return (
    <section className="py-20 bg-black-light">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title={t('home.why_choose')}
          subtitle="Experience the best in intercity transportation"
          light
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 text-center flex flex-col items-center"
              variants={itemVariants}
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-2 gold-text">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;