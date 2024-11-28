import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:text-white" id="home">
      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              {t('greeting')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Cristian Oyola
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <a
                href="#projects"
                className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {t('viewWork')}
                <ArrowRight size={20} />
              </a>
              <a
                href="#contact"
                className="border-2 border-black dark:border-white px-6 py-3 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {t('getInTouch')}
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-br from-blue-500 to-teal-400 opacity-20 absolute inset-0" />
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800"
              alt="Coding workspace"
              className="rounded-lg shadow-2xl relative z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};