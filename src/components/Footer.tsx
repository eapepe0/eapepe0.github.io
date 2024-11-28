import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black text-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">CO</div>
          <div className="flex items-center space-x-2">
            <span>{t('madeWith')}</span>
            <Heart className="text-red-500" size={20} />
            <span>{t('by')} Cristian Oyola</span>
          </div>
          <div className="mt-4 md:mt-0">
            <p>&copy; {new Date().getFullYear()} {t('allRights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};