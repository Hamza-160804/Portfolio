import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight } from 'lucide-react';
import '../App.css';

const Introduction = ({ handleButtonClick }) => {
  
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Reusable gradient text component
  const GradientText = ({ children, animation }) => (
    <div
      className="text-[164px] md:text-[200px] font-bold text-transparent bg-clip-text"
      style={{
        background: "linear-gradient(90deg, rgba(28,23,131,1) 0%, rgba(153,16,176,1) 62%)",
        WebkitBackgroundClip: "text",
      }}
      data-aos={animation}
    >
      {children}
    </div>
  );

  return (
    <section className="min-h-screen bg-[#000B2A] text-white flex flex-col-reverse items-center justify-between px-8 md:px-16 space-y-8 md:space-y-0 introduction">
      
      {/* Code Snippets Section */}
      <div className="flex items-center space-x-4  symbol" >
        <GradientText animation="fade-down">{"<"}</GradientText>
        <GradientText animation="fade-up">{"/"}</GradientText>
        <GradientText animation="fade-down">{">"}</GradientText>
      </div>

      {/* Introduction Content */}
      <div className="space-y-6 font-rubik text-center md:text-left intro" data-aos="fade-right">
        <h1 className="text-5xl md:text-6xl font-syne font-bold leading-tight ">
          Let’s get to know me closer
        </h1>
        <p className="text-lg font-medium font-syne leading-relaxed md:text-lg sm:text-[14px]">
          Hello, Rao Muhammad Hamza! It’s great to hear about your dedication to
          computer science and your passion for technology. Frontend web development
          and graphic design are exciting fields with endless opportunities for creativity
          and innovation.
        </p>
        <button
          onClick={() => handleButtonClick('/about')}
          className="flex items-center justify-center md:justify-start px-6 py-3 bg-[#320F85] text-lg font-medium font-syne rounded-lg hover:bg-[#2D5FB6] transition duration-300 ml-[300px] md:ml-[140px] about-me-button"
        >
          <ChevronRight className="mr-2" size={20} />
          Discover More About Me
        </button>
      </div>

    </section>
  );
};

export default Introduction;
