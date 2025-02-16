import React, { useState } from "react";
import { MoreVertical, MoreHorizontal } from "lucide-react";
import '../App.css';

const SecondaryButton = ({ children, onClick, className = "about-me-button-details", icon: Icon = null, ...props }) => (
  <button
    className={`mt-4 ml-[250px] px-6 py-3 border border-[#2D5FB6] rounded-lg font-medium flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2D5FB6] ${className}`}
    onClick={onClick}
    {...props}
  >
    {Icon && <Icon className="mr-2" size={20} />}
    {children}
  </button>
);

const images = [
  { id: 1, src: `${process.env.PUBLIC_URL}/images/code sign.png`, alt: "Code Icon" },
  { id: 2, src: `${process.env.PUBLIC_URL}/images/laptop.png`, alt: "Design Icon" },
];

const AboutMe = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-[#000B2A] text-white py-16" data-aos="fade-right" data-aos-duration="1000">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center font-syne">About Me</h2>
        <p className="text-gray-400 text-center text-lg mb-8">Little Brief About Myself</p>
        <hr className="border-gray-600 mb-8 w-2/2 mx-auto" />

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left mb-12">
          <h3 className="text-5xl font-bold mb-4 md:mb-0">My Mission.</h3>
          <p className="text-gray-300 leading-relaxed max-w-3xl md:px-10 text-[22px]">
          My mission is to develop effective, user-friendly web solutions that enhance the user experience and streamline operations. 
            I am committed to continuing to learn and apply my skills in web development to create amazing, high-quality applications. 
            Through collaboration, innovation and problem solving, my goal is to help advance technology and improve digital connectivity 
            for users around the world.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between text-center md:text-left about-me">
        {/* Image Grid */}
        <div className="flex justify-center items-center my-12 ">
          <div className="p-6 border border-[#2D5FB6] rounded-xl">
            <div className="grid grid-cols-2 gap-6 bg-[#000B2A] p-4 rounded-lg image-container">
            <div className="w-[120px] h-[120px] bg-[#000000] flex justify-center items-center rounded-lg shadow-lg border border-[#2D5FB6]">
                <img src={images[0].src} alt={images[0].alt} className="w-16 h-16" />
              </div>
              <div className="w-[120px] h-[120px] bg-[#000000] flex justify-center items-center rounded-lg shadow-lg border border-[#2D5FB6]">
                <img src={images[1].src} alt={images[1].alt} className="w-16 h-16" />
              </div>

              {/* Second Row */}
              <div className="w-[120px] h-[120px] bg-[#000000] flex justify-center items-center rounded-lg shadow-lg border border-[#2D5FB6]">
                <img src={images[1].src} alt={images[1].alt} className="w-16 h-16" />
              </div>
              <div className="w-[120px] h-[120px] bg-[#000000] flex justify-center items-center rounded-lg shadow-lg border border-[#2D5FB6]">
                <img src={images[0].src} alt={images[0].alt} className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="text-center max-w-3xl mx-auto px-10 py-10">
          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
            Hello! I'm Hamza, a dedicated computer science student with a passion for technology 
            and a keen interest in front-end web development and graphic design.
            <br />
            Feel free to contact me through email or phone. I am excited about the opportunities 
            that lie ahead and look forward to making a meaningful impact in computer science.
          </p>

          <SecondaryButton onClick={() => setIsExpanded(!isExpanded)} icon={isExpanded ? MoreVertical : MoreHorizontal}>
            {isExpanded ? "Read Less" : "Read More"}
          </SecondaryButton>

          {isExpanded && (
            <p className="text-gray-300 leading-relaxed mt-6 text-lg">
              Currently, I’m pursuing my degree at NFC Institute of Engineering and Technology, 
              where I am honing my skills in various programming languages, including C, Object-Oriented Programming using Python, and Java.
            </p>
          )}
        </div>
        </div>

        {/* Social Links */}
        <div className="text-center mt-20">
          <h4 className="text-4xl font-semibold mb-6">Follow me on:</h4>
          <div className="flex flex-wrap justify-center space-x-6">
            {[
              { name: "LinkedIn", url: "https://www.linkedin.com/in/rao-hamza-920a04246/" },
              { name: "GitHub", url: "https://github.com/Hamza-160804" },
              { name: "Facebook", url: "https://www.facebook.com/m.hamza.rao1608/" },
              { name: "Instagram", url: "https://www.instagram.com/m.hamza.rao1608/" },
            ].map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400  text-2xl font-syne name">
                {link.name.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
