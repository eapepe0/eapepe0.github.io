import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Maximize2 , ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLatestRepositories, Repository } from '../services/github';
import { ImagePreview } from './ImagePreview';
import { getOptimizedImageUrl } from '../utils/imageOptimization';

interface ProjectCardProps {
  project: Repository;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [showPreview, setShowPreview] = useState(false);
  const screenshotUrl = `https://raw.githubusercontent.com/eapepe0/${project.name}/main/screen-0.jpg`;
  const previewUrl = `https://raw.githubusercontent.com/eapepe0/${project.name}/main/screen-0.jpg`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative group">
          <img
            src={getOptimizedImageUrl(previewUrl, 400)}
            alt={project.name}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = getOptimizedImageUrl('https://images.unsplash.com/photo-1555066931-4365d14bab8c', 400);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              onClick={() => setShowPreview(true)}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              aria-label="View full screenshot"
            >
              <Maximize2 size={20} />
            </button>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              <Github size={20} />
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 dark:text-white">{project.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      {showPreview && (
        <ImagePreview
          imageUrl={screenshotUrl}
          projectName={project.name}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const repos = await getLatestRepositories('eapepe0');
        setProjects(repos);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">{t('featuredProjects')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('projectsDescription')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
           <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-12 text-center"
         >
           <a
             href="https://github.com/eapepe0"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
           >
             {t('seeMoreProjects')}
             <ArrowRight size={20} />
           </a>
         </motion.div>
         </>
        )}
      </div>
    </section>
  );
};