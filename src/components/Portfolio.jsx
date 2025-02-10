import React, { Suspense, lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Info } from "lucide-react";

// Lazy load the Loader component
const Loader = lazy(() => import("./Loader"));

const ViewDetailsButton = ({
  children,
  onClick,
  className = '',
  icon: Icon = null,
  ...props
}) => (
  <button
    className={`
      px-6 py-2
      rounded-md
      flex items-center
        bg-transparent 
        border border-[#2D5FB6]
        hover:bg-[#2D5FB6]
      ${className}
    `}
    onClick={onClick}
    {...props}
  >
    {Icon && <Icon className="mr-2" size={18} />}
    {children}
  </button>
);

const CodeButton = ({
  children,
  href,
  className = '',
  icon: Icon = null,
  ...props
}) => (
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
    {...props}
  >
    {Icon && <Icon className="mr-2" size={18} />}
    {children}
  </a>
);

const works = [
  {
    id: 1,
    title: "Interactive Quiz Application",
    description: "This website is for tech-based quizzes fetching data from APIs.",
    img: `${process.env.PUBLIC_URL}/images/image-1.png`,
    codeLink: "https://github.com/Hamxa52/Multiple-choice.github.io",
    details: "Detailed description of the Interactive Quiz Application..."
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "This website showcases my skills, education, and ongoing projects.",
    img: `${process.env.PUBLIC_URL}/images/image-2.png`,
    codeLink: "https://github.com/Hamxa52/Portfolio.github.io",
    details: "Detailed description of the Portfolio Website..."
  },
  {
    id: 3,
    title: "Weather Application on React",
    description: "This weather page shows current weather status using an API.",
    img: `${process.env.PUBLIC_URL}/images/image-3.png`,
    codeLink: "https://github.com/Hamxa52/weather-app.github.io",
    details: "Detailed description of the Weather Application..."
  },
];

const Portfolio = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [modalImage, setModalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

  const handleViewDetails = (projectId) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/project/${projectId}`, {
        state: { from: window.location.pathname }
      });
      setLoading(false);
    }, 500);
  };

  return (
    <section className="bg-[#000B2A] text-white py-16 font-syne" id="portfolio">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-4xl font-bold mb-8 text-center" data-aos="fade-down">
          My Work
        </h2>
        <p className="text-gray-400 text-lg mb-12"data-aos="fade-down">
          A showcase of some of my recent projects.
        </p>
        <hr className="border-gray-600 mb-12 w-2/2 mx-auto" />

        <div className="flex flex-wrap justify-center gap-8">
          {works.map((project, index) => (
            <div
              key={project.id}
              className="relative bg-[#1A1E27] rounded-lg overflow-hidden shadow-lg border border-[#333] transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="relative">
                <img
                  src={project.img}
                  alt={`Preview of ${project.title}`}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => openModal(project.img)}
                />
                <h2 className="absolute top-2 left-2 text-white text-xl font-semibold bg-[#4c446d41] bg-opacity-50 px-3 py-1 rounded-md">
                  {`Work ${index + 1}`}
                </h2>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-lg text-gray-300">{project.description}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <CodeButton
                    href={project.codeLink}
                    icon={Code}
                  >
                    View Code
                  </CodeButton>
                  <ViewDetailsButton
                    onClick={() => handleViewDetails(project.id)}
                    icon={Info}
                  >
                    View Details
                  </ViewDetailsButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" onClick={closeModal}>
          <img src={modalImage} alt="Work Preview" className="max-w-4xl max-h-[80%] rounded-lg" data-aos="zoom-in" />
          <button className="absolute top-4 right-4 text-3xl text-white hover:text-[#86c232]" onClick={closeModal}>
            &times;
          </button>
        </div>
      )}

      <Suspense fallback={null}>
        {loading && <Loader />}
      </Suspense>
    </section>
  );
};

export default Portfolio;