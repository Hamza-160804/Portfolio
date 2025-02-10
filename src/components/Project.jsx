import React, { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from "../data/projects.js";
import Aos from 'aos';
import { Code, MoreHorizontal } from 'lucide-react';

// Lazy load the Loader component
const Loader = lazy(() => import('./Loader'));

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  Aos.init();

  const handleViewDetails = (projectId) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/project/${projectId}`);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Loader />
      </Suspense>
    );
  }

  return (
    <div className="bg-darkBlue text-white min-h-screen px-8 md:px-16" id="portfolio"
     data-aos="rotate-in"
     data-aos-duration="1000"
    >
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold">My Projects</h1>
        <p className="text-lg text-gray-400 mt-2">
          Explore the detailed work behind each project.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-lg p-6 shadow-lg text-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <h2 className="mt-4 text-2xl font-bold">{project.title}</h2>
            <p className="text-gray-400 mt-2">{project.description}</p>
            
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => handleViewDetails(project.id)}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center"
              >
                <MoreHorizontal className="mr-2" size={18} /> View Details
              </button>
              
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-transparent border border-[#2D5FB6] rounded-md hover:bg-[#2D5FB6] transition flex items-center"
              >
                <Code className="mr-2" size={18} /> View Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
