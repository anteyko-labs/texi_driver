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
    <div className="md:hidden">
      {/* Верхняя панель с логотипом и кнопками */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black-light/90 backdrop-blur-md shadow-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <Link to="/" onClick={closeMenu}>
            <Logo className="h-10" />
          </Link>
          
          <div className="flex items-center">
            {/* Кнопка бургер-меню */}
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:text-gold-light focus:outline-none transition-colors"
              aria-label="Открыть меню"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Выпадающее меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-30 bg-black-light/95 backdrop-blur-md shadow-xl"
          >
            <nav className="px-4 py-6">
              <div className="flex flex-col space-y-4">
                <NavLink 
                  to="/" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-center font-medium uppercase tracking-wider transition-colors ${
                      isActive ? 'text-gold-light bg-gold-light/10' : 'text-white hover:text-gold-light hover:bg-white/5'
                    }`
                  }
                >
                  {t('nav.home')}
                </NavLink>
                
                <NavLink 
                  to="/vehicles" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-center font-medium uppercase tracking-wider transition-colors ${
                      isActive ? 'text-gold-light bg-gold-light/10' : 'text-white hover:text-gold-light hover:bg-white/5'
                    }`
                  }
                >
                  {t('nav.vehicles')}
                </NavLink>
                
                <NavLink 
                  to="/routes" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-center font-medium uppercase tracking-wider transition-colors ${
                      isActive ? 'text-gold-light bg-gold-light/10' : 'text-white hover:text-gold-light hover:bg-white/5'
                    }`
                  }
                >
                  {t('nav.routes')}
                </NavLink>
                
                <NavLink 
                  to="/contact" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-center font-medium uppercase tracking-wider transition-colors ${
                      isActive ? 'text-gold-light bg-gold-light/10' : 'text-white hover:text-gold-light hover:bg-white/5'
                    }`
                  }
                >
                  {t('nav.contact')}
                </NavLink>
                
                <div className="pt-4">
                  <Link 
                    to="/booking" 
                    onClick={closeMenu}
                    className="btn btn-primary w-full text-center block"
                  >
                    {t('nav.booking')}
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay для закрытия меню при клике вне его */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50"
          onClick={closeMenu}
        />
      )}
    </div>
  );
};

export default MobileNav;