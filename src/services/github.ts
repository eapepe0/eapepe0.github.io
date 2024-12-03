import { mockProjects } from '../data/mockProjects';
import axios from 'axios';

export interface Repository {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  tags: string[];
  created_at: string;
}


  export const getLatestRepositories = async (username: string): Promise<Repository[]> => {
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    
    try {
      console.log('Fetching repositories from GitHub API...');
      
      // usamos Axios
      const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        params: {
          sort: 'created',
          direction: 'desc',
          per_page: 12,
        },
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'Authorization': `Bearer ${githubToken}`,
        },
      });
      
      /* console.log(response.data) */
      if (response.status === 403) {
        console.warn('GitHub API rate limit exceeded, using mock data');
        return mockProjects;
      }
  
       // Procesa los repositorios
    const repositories = response.data.map((repo: any) => {
      // Devuelve el objeto con la información del repositorio, incluyendo los topics como tags
      return {
        name: repo.name,
        description: repo.description || '',
        html_url: repo.html_url,
        homepage: repo.homepage || '',
        tags: repo.topics || [], // Usamos los topics como tags
        created_at: repo.created_at,
      };
    });

    return repositories;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    console.log('Falling back to mock data');
    // en caso que falle github cargamos los datos 
    return mockProjects;
  }
};