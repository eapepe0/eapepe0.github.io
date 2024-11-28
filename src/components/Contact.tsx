import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFormSubmission } from '../hooks/useFormSubmission';
import { ContactInfo } from './ContactInfo';

export const Contact = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);

  const { formStatus, errors, handleSubmit } = useFormSubmission({
    onSuccess: () => {
      formRef.current?.reset();
    },
    t,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      honeypot: formData.get('website') as string, // Honeypot campo
    });
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">{t('contactTitle')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactInfo />

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
            onSubmit={onSubmit}
          >
            {/* Honeypot field - oculto para los usuarios pero visible para los bots */}
            <div className="hidden">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white ${
                  errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={formStatus.loading}
              className={`w-full px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                formStatus.loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
              }`}
            >
              {formStatus.loading ? t('sending') : t('sendMessage')}
              <Send size={20} />
            </button>

            {formStatus.success && (
              <p className="text-green-500 text-center mt-4">{t('successMessage')}</p>
            )}
            {formStatus.error && (
              <p className="text-red-500 text-center mt-4">{t('errorSubmission')}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};