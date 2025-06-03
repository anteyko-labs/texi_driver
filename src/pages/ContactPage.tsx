import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero section */}
      <div className="relative py-24 bg-black-light overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            title={t('contact.title')}
            subtitle={t('contact.subtitle')}
            light
          />
        </div>
      </div>
      
      {/* Contact information and form */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-6 gold-text">{t('contact.get_in_touch')}</h3>
              
              <div className="glass-card p-6 mb-8">
                <div className="flex items-start mb-6">
                  <MapPin className="text-gold-light mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('contact.office_address')}</h4>
                    <p className="text-gray-400">{t('contact.office_address_full')}</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <Phone className="text-gold-light mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('contact.phone')}</h4>
                    <p className="text-gray-400">+996 705 728 728</p>
                    
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <Mail className="text-gold-light mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('contact.email')}</h4>
                    <p className="text-gray-400">info@driverservice.com</p>
                    <p className="text-gray-400">booking@driverservice.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-gold-light mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('contact.working_hours')}</h4>
                    <p className="text-gray-400">{t('contact.working_hours_247')}</p>
                
                    <p className="text-gray-400">{t('contact.office_hours')}</p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="glass-card p-6 h-64 flex items-center justify-center">
                <p className="text-gray-400">{t('contact.map_placeholder')}</p>
              </div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6 gold-text">{t('contact.send_us_message')}</h3>
              
              <form className="glass-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('common.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('contact.your_message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full bg-black-light border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-gold-light focus:border-gold-light"
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  {t('contact.send_message')}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;