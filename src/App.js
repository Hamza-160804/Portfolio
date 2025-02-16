import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

// Import Static Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MouseDotEffect from './components/MouseDotEffect';
import Loader from './components/Loader';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const AboutMe = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./components/Skills'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Project'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./components/Faq'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Detect route changes

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });

    // Simulate loading effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show loader on route change
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust if needed

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Show Loader while loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="App bg-[#000B2A]">
        <MouseDotEffect />
        <Navbar />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<><Home /><section id="faq"><FAQ /></section></>} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
