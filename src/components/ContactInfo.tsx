import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactInfo = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold mb-4 dark:text-white">{t('contactTitle')}</h3>
      <div className="flex items-center space-x-4">
        <Mail className="text-gray-600 dark:text-gray-300" />
        <a
          href="mailto:cristian_oyola@outlook.com"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          cristian_oyola@outlook.com
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <Github className="text-gray-600 dark:text-gray-300" />
        <a
          href="https://github.com/eapepe0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          github.com/eapepe0
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <Linkedin className="text-gray-600 dark:text-gray-300" />
        <a
          href="#"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          LinkedIn Profile
        </a>
      </div>
    </motion.div>
  );
};