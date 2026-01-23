import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const skills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 75 },
  { name: 'Node.js', level: 80 },
  { name: 'HTML/CSS', level: 85 },
  { name: 'JavaScript', level: 75 },
  { name: 'Flutter', level: 70 },
  { name: 'Astro', level: 80 },
  { name: 'React Native', level: 75 },
];

export const Skills = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">{t('skillsTitle')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('skillsDescription')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-2 flex justify-between">
                <span className="font-medium dark:text-white">{skill.name}</span>
                <span className="text-gray-600 dark:text-gray-300">{skill.level}%</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};