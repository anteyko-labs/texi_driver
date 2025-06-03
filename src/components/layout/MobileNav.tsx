import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Logo } from '../common/Logo';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black-light/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <Logo className="h-10" />
        </Link>
        
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="p-2 text-white hover:text-gold-light focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <nav className="flex flex-col items-center py-4 space-y-4 bg-black-light px-4">
              <NavLink 
                to="/" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold-light ${
                    isActive ? 'text-gold-light' : 'text-white'
                  }`
                }
              >
                {t('nav.home')}
              </NavLink>
              <NavLink 
                to="/vehicles" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold-light ${
                    isActive ? 'text-gold-light' : 'text-white'
                  }`
                }
              >
                {t('nav.vehicles')}
              </NavLink>
              <NavLink 
                to="/routes" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold-light ${
                    isActive ? 'text-gold-light' : 'text-white'
                  }`
                }
              >
                {t('nav.routes')}
              </NavLink>
              <NavLink 
                to="/contact" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold-light ${
                    isActive ? 'text-gold-light' : 'text-white'
                  }`
                }
              >
                {t('nav.contact')}
              </NavLink>
              <Link 
                to="/booking" 
                onClick={closeMenu}
                className="btn btn-primary w-full text-center"
              >
                {t('nav.booking')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;