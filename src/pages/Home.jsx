import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Buttonshowcase from "../components/Buttonshowcase";
import AOS from "aos";
import "aos/dist/aos.css";

// Lazy-loaded components
const Loader = lazy(() => import("../components/Loader"));
const Introduction = lazy(() => import("../components/introduction"));

// Image and project data
const image1 = `${process.env.PUBLIC_URL}/images/developer.jpg`;
const projects = [
  {
    id: 1,
    image: `${process.env.PUBLIC_URL}/images/image-1.png`,
    title: "Project Alpha",
    client: "Internship Task 1",
    work: "Quiz Application",
  },
  {
    id: 2,
    image: `${process.env.PUBLIC_URL}/images/image-2.png`,
    title: "Project Beta",
    client: "Personal",
    work: "Simple Portfolio",
  },
  {
    id: 3,
    image: `${process.env.PUBLIC_URL}/images/image-3.png`,
    title: "Project Gamma",
    client: "Internship Task 2",
    work: "Weather Application on React",
  },
];

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Memoized navigation handler with preloading
  const handleButtonClick = useCallback(
    async (route) => {
      setIsLoading(true);

      try {
        if (route.includes("/project/")) {
          await import("../components/ProjectDetail");
        } else if (route === "/about") {
          await import("../pages/About");
        }
      } catch (error) {
        console.error("Preloading failed", error);
      }

      setTimeout(() => {
        setIsLoading(false);
        navigate(route);
      }, 1500);
    },
    [navigate]
  );

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // Typing effect for title
  useEffect(() => {
    const element = document.querySelector(".heading-1");
    if (!element) return;

    const text = "Frontend Developer";
    let index = 0;
    let isDeleting = false;

    const typeEffect = () => {
      element.textContent = text.substring(0, index);
      index = isDeleting ? index - 1 : index + 1;

      if (index === text.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
      } else if (index === 0) {
        isDeleting = false;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, 200);
      }
    };

    typeEffect();

    return () => clearTimeout(typeEffect);
  }, []);

  return (
    <div className="bg-[#000B2A] text-white font-syne home-container">
      {/* Loader */}
      <Suspense fallback={null}>{isLoading && <Loader />}</Suspense>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-between px-8 md:px-16 sm:flex-col md:flex-col lg:flex-row mt-10 mb-10 gap-10 hero " id="home">
        {/* Left Content */}
        <div className="space-y-6 font-rubik " data-aos="fade-right">
          <h1 className="text-5xl font-bold leading-tight">
            Hi, I'm <span className="text-[#7127BA] ">Hamza</span>
            <br />
            I'm <span className="heading-1 text-[#7127BA]">Frontend Developer</span>
          </h1>
          <Buttonshowcase />
          <div className="wrapper">
              <a
                href="https://www.facebook.com/m.hamza.rao1608/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://github.com/Hamza-160804"
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.instagram.com/m.hamza.rao1608/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/rao-hamza-920a04246/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
        </div>

        {/* Right Content */}
        <div className="flex items-center space-x-4 " data-aos="fade-up">
          <img src={image1} alt="Developer Illustration" className="w-[500px] h-[400px] hero-image" loading="lazy" />
        </div>
      </section>

      {/* Introduction Section (Lazy Loaded) */}
      <Suspense fallback={null}>
        <Introduction handleButtonClick={handleButtonClick} />
      </Suspense>

      {/* Projects Section */}
      <section className="py-16 px-8 md:px-16 mb-[50px]" id="projects">
        {isLoading && <Loader />}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-7">My Projects Highlight</h2>
          <p className="text-lg text-gray-400">
            A showcase of some of the projects I've worked on, demonstrating my skills in frontend development and creativity.
          </p>
        </div>

        {/* Project Cards Slider */}
        <Slider {...sliderSettings} data-aos="fade-down">
          {projects.map((project) => (
            <div key={project.id} onClick={() => handleButtonClick(`/project/${project.id}`)} className="px-4 cursor-pointer">
              <div className="rounded-lg bg-[#4c446d41] overflow-hidden shadow-lg transition-transform hover:scale-105">
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                  <p><span className="font-medium">Client: </span>{project.client}</p>
                  <p><span className="font-medium">Work: </span>{project.work}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-8 md:px-16 testimonial" id="testimonial" data-aos="fade-right">
        <div className="max-w-5xl mx-auto space-y-8 mb-[70px] testimonial-content">
          <h2 className="text-4xl md:text-5xl font-bold text-center">Testimonial</h2>
          <div className="relative border-[2px] border-[#2D5FB6] p-8 rounded-lg shadow-lg">
            <div className="absolute top-[-90px] left-[-50px] text-[#2D5FB6] text-9xl comma-1">
              <span className="border-4 border-[#2D5FB6] p-4 rounded-full">“</span>
            </div>
            <p className="text-lg leading-relaxed px-16 py-4 md:text-sm">
            I served as a Web Developer intern at Developer’s Hub Corporation, where I demonstrated a strong work ethic, technical proficiency, 
              attention to detail, and a commitment to continuous learning. 
              My responsibilities included successfully developing and maintaining web applications, enhancing front-end functionality, 
              optimizing performance, and collaborating effectively with cross-functional teams.
            </p>
            <p className="mt-6 text-left text-2xl font-bold mx-12">- Hamza Rao</p>
            <div className="absolute bottom-[-90px] right-[-50px] text-[#2D5FB6] text-9xl rotate-180 comma-2">
              <span className="border-4 border-[#2D5FB6] p-4 rounded-full ">“</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Home);
