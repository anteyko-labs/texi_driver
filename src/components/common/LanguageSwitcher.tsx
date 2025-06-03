import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'kg', label: 'Кыргызча' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={toggleDropdown}
        className="p-2 bg-black-light rounded-full text-gold-light hover:bg-black-light/80 transition-colors focus:outline-none glass-card"
        aria-label="Change language"
      >
        <Globe size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-36 glass-card p-1 shadow-xl"
          >
            <ul>
              {languages.map((language) => (
                <li key={language.code}>
                  <button
                    onClick={() => changeLanguage(language.code)}
                    className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gold-light/10 transition-colors ${
                      i18n.language === language.code
                        ? 'text-gold-light font-medium'
                        : 'text-white'
                    }`}
                  >
                    {language.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;