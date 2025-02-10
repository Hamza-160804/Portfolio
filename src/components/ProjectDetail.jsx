import React, { 
  memo,
  useState,
  useEffect
} from 'react';
import { 
  useParams, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ArrowLeft, ArrowRight, ArrowLeftCircle, Code } from 'lucide-react';
import Loader from './Loader';
import { projects } from '../data/projects';

const ProjectImage = memo(({ src, title, index, onClick }) => (
  <img
    src={src}
    alt={`Project ${title} ${index + 1}`}
    className="w-full h-80 object-cover rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
    loading="lazy"
    onClick={onClick}
  />
));

const CodeButton = ({ href, className = '', icon: Icon = null, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      px-6 py-2
      rounded-md
      transition
      flex items-center justify-center
      transform hover:scale-105
      bg-transparent 
      border border-[#2D5FB6]
      hover:bg-[#2D5FB6]
      ${className}
    `}
  >
    {Icon && <Icon className="mr-2" size={18} />}
    {children}
  </a>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const foundProject = projects.find((proj) => proj.id === parseInt(id));
    setProject(foundProject);
    setIsLoading(false);
  }, [id]);

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);
  const handleGoBack = () => navigate(location.state?.from || '/');
  const handleNavigate = (newId) => navigate(`/project/${newId}`);

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Loader /></div>;
  if (!project) return <div className="text-center text-white py-16 min-h-screen"><h2>Project Not Found</h2></div>;

  const currentIndex = projects.findIndex((proj) => proj.id === parseInt(id));
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <ErrorBoundary FallbackComponent={({ error }) => (
      <div className="text-white text-center py-16 bg-red-900">
        <h2 className="text-2xl font-bold mb-4">An Error Occurred</h2>
        <p className="text-gray-300">{error.message}</p>
      </div>
    )}>
      <div className="bg-[#000B2A] text-white min-h-screen px-8 md:px-16 relative">
        <button
          onClick={handleGoBack}
          className="absolute top-6 left-6 bg-[#320F85] p-2 rounded-full hover:bg-[#2D5FB6] transition"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center py-16 pt-24">
          <h1 className="text-5xl font-bold">{project.title}</h1>
          <p className="text-lg text-gray-400 mt-2">{project.description}</p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            {project.images.map((image, index) => (
              <ProjectImage
                key={index}
                src={image}
                title={project.title}
                index={index}
                onClick={() => openModal(image)}
              />
            ))}
          </div>

          {modalImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
              onClick={closeModal}
            >
              <img src={modalImage} alt="Work Preview" className="max-w-4xl max-h-[80%] rounded-lg" />
              <button className="absolute top-4 right-4 text-3xl text-white hover:text-[#86c232]" onClick={closeModal}>
                &times;
              </button>
            </div>
          )}

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">About the Project</h2>
            <p className="text-lg text-gray-400">{project.details}</p>
          </div>

          <div className="text-center mt-6">
            <CodeButton href={project.githubLink} icon={Code}>
              View Code
            </CodeButton>
          </div>
          <div className="flex justify-between mt-8">
            {prevProject && (
              <button
                onClick={() => handleNavigate(prevProject.id)}
                className="flex items-center border border-[#2D5FB6] px-4 py-2 rounded-lg hover:bg-[#2D5FB6] transition"
              >
                <ArrowLeftCircle className="mr-2" /> Previous
              </button>
            )}
            {nextProject && (
              <button
                onClick={() => handleNavigate(nextProject.id)}
                className="flex items-center border border-[#2D5FB6] px-4 py-2 rounded-lg hover:bg-[#2D5FB6] transition"
              >
                Next <ArrowRight className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(ProjectDetail);
