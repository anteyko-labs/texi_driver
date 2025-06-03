import React from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';

const LoadingScreen: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center">
        <Logo className="h-20 mb-8" />
        <div className="w-24 h-1 bg-black-light relative overflow-hidden rounded-full">
          <div className="absolute inset-0 gold-shimmer"></div>
        </div>
        <p className="mt-4 text-gold-light">{t('common.loading')}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;