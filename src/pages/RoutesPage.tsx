import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, DollarSign, MapPin } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';

const RoutesPage: React.FC = () => {
  const { t } = useTranslation();
  
  const routes = [
    {
      id: 'bishkek-almaty',
      name: t('routes.bishkek_almaty'),
      from: 'Bishkek',
      to: 'Almaty',
      image: 'https://images.pexels.com/photos/30267231/pexels-photo-30267231/free-photo-of-modern-astana-skyline-in-winter-light.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '3.5h',
      price: '7000 som',
      distance: '235 km',
      description: 'A popular route connecting the capitals of Kyrgyzstan and Kazakhstan. The journey takes you through beautiful mountain landscapes and valleys.'
    },
    {
      id: 'almaty-bishkek',
      name: t('routes.almaty_bishkek'),
      from: 'Almaty',
      to: 'Bishkek',
      image: 'https://images.pexels.com/photos/15060464/pexels-photo-15060464/free-photo-of-a-white-tower-with-a-clock-on-top.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '3.5h',
      price: '7000 с',
      distance: '235 km',
      description: 'The return journey from Almaty to Bishkek. Our drivers know the best stops along the way for refreshments and scenic views.'
    },
    {
      id: 'bishkek-issykkul',
      name: t('routes.bishkek_issykkul'),
      from: 'Bishkek',
      to: 'Issyk-Kul',
      image: 'https://images.pexels.com/photos/13189976/pexels-photo-13189976.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '3h',
      price: '3500 с',
      distance: '250 km',
      description: 'Travel from Bishkek to the beautiful Issyk-Kul lake, one of the largest alpine lakes in the world. Enjoy breathtaking mountain and lake views.'
    },
    {
      id: 'almaty-issykkul',
      name: t('routes.almaty_issykkul'),
      from: 'Almaty',
      to: 'Issyk-Kul',
      image: 'https://images.pexels.com/photos/18158474/pexels-photo-18158474/free-photo-of-a-mountain-landscape-with-a-rocky-river-in-kyrgyzstan.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '5h',
      price: '12000 с',
      distance: '400 km',
      description: 'Direct service from Almaty to Issyk-Kul lake. Perfect for weekend getaways or vacation trips to this beautiful natural wonder.'
    },
    {
      id: 'bishkek-osh',
      name: t('routes.bishkek_osh'),
      from: 'Bishkek',
      to: 'Osh',
      image: 'https://images.pexels.com/photos/12702443/pexels-photo-12702443.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '9h',
      price: '12000 с',
      distance: '700 km',
      description: 'Long-distance service from Bishkek to Osh. Experience the diverse landscapes of Kyrgyzstan from north to south.'
    },
    {
      id: 'bishkek-talas',
      name: t('routes.bishkek_talas'),
      from: 'Bishkek',
      to: 'Talas',
      image: 'https://images.pexels.com/photos/7965239/pexels-photo-7965239.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '4h',
      price: '8000 с',
      distance: '300 km',
      description: 'Travel from Bishkek to the historic Talas region. Discover the cultural heritage and beautiful landscapes of northwestern Kyrgyzstan.'
    },
  ];
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero section */}
      <div className="relative py-24 bg-black-light overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            title={t('routes.title')}
            subtitle={t('routes.subtitle')}
            light
          />
        </div>
      </div>
      
      {/* Routes showcase */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {routes.map((route) => (
              <motion.div
                key={route.id}
                className="glass-card overflow-hidden"
                variants={itemVariants}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative">
                    <img 
                      src={route.image} 
                      alt={route.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold text-white">{route.name}</h3>
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 p-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-300 text-sm">
                        <Clock size={16} className="text-gold-light mr-2" />
                        {t('routes.duration', { time: route.time })}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <DollarSign size={16} className="text-gold-light mr-2" />
                        {t('routes.price', { price: route.price })}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPin size={16} className="text-gold-light mr-2" />
                        {route.distance}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-4">{route.description}</p>
                    
                    <Link 
                      to="/booking"
                      state={{ from: route.from, to: route.to }}
                      className="inline-flex items-center text-gold-light hover:text-gold-dark transition-colors"
                    >
                      {t('common.book_now')}
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;