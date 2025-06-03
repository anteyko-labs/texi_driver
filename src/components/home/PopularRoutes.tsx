import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, DollarSign, MapPin } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const PopularRoutes: React.FC = () => {
  const { t } = useTranslation();
  
  const routes = [
    {
      id: 'bishkek-almaty',
      name: t('routes.bishkek_almaty'),
      image: 'https://images.pexels.com/photos/30267231/pexels-photo-30267231/free-photo-of-modern-astana-skyline-in-winter-light.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '3.5h',
      price: '7000 с',
    },
    {
      id: 'almaty-bishkek',
      name: t('routes.almaty_bishkek'),
      image: 'https://images.pexels.com/photos/15060464/pexels-photo-15060464/free-photo-of-a-white-tower-with-a-clock-on-top.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '3.5h',
      price: '7000 с',
    },
    {
      id: 'bishkek-issykkul',
      name: t('routes.bishkek_issykkul'),
      image: 'https://images.pexels.com/photos/1482927/pexels-photo-1482927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '3h',
      price: '3500 с',
    },
    {
      id: 'almaty-issykkul',
      name: t('routes.almaty_issykkul'),
      image: 'https://images.pexels.com/photos/18158474/pexels-photo-18158474/free-photo-of-a-mountain-landscape-with-a-rocky-river-in-kyrgyzstan.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '5h',
      price: '12000 с',
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
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title={t('common.popular_routes')}
          subtitle={t('common.choose_routes')}
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {routes.map((route) => (
            <motion.div
              key={route.id}
              className="relative overflow-hidden rounded-xl group h-[400px]"
              variants={itemVariants}
            >
              <div className="w-full h-full relative">
                <img 
                  src={route.image} 
                  alt={route.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent h-full"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{route.name}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-300 mb-3">
                    <p>{t('routes.duration', { time: route.time })}</p>
                    <p>{t('routes.price', { price: route.price })}</p>
                  </div>
                  <Link 
                    to="/booking" 
                    className="py-2 px-4 bg-gold-gradient text-black rounded-lg font-medium text-sm flex items-center justify-center transition-transform transform hover:scale-105"
                  >
                    {t('common.book_now')}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link to="/routes" className="btn btn-outline">
            {t('common.view_details')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;