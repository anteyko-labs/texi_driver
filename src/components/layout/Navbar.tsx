import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../common/Logo';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const { t } = useTranslation();
  
  return (
    <header 
      className={`hidden md:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-black-light/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-12" />
        </Link>
        
        <nav className="flex items-center space-x-4 mr-12">
          <NavLink 
            to="/" 
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
            className="btn btn-primary ml-4 text-sm"
          >
            {t('nav.booking')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;