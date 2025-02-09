import React from "react";

const Footer = () => {
  const logo = [
    {
        title: 'Logo',
        img: `${process.env.PUBLIC_URL}/images/C.png`, // Adjust the path if needed
    },
];
  return (
    <footer className="bg-[#000B2A] py-10"
     data-aos="fade-down"
     data-aos-duration="1000">
      <div className="container mx-auto px-4 text-center">
        {/* Contact Section */}
        <h2 className="lg:text-4xl md::text-3xl sm:text-2xl font-syne text-[#8b5cf6] font-semibold mb-3">
          Get in Touch With Us
        </h2>
        <a
          href="mailto:raohamza1608@gmail.com"
          className="lg:text-5xl font-syne sm:text-3xl text-white font-bold hover:text-[#8b5cf6] md:text-4xl"
        >
          raohamza1608@gmail.com
        </a>
        <div className="h-[100px]"></div>
        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-6 sm:space-y-0 text-gray-400">
          {/* Logo */}
          {logo.map((logoItem) => (
                        <img
                            src={logoItem.img}
                            alt={logoItem.title}
                            className="w-[70px] h-[70px]"
                            key={logoItem.title}
                        />
                    ))}

          {/* Address */}
          <div>
            <p className="text-[18px] font-syne text-white">Multan Punjab,<br></br> Pakistan</p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[18px] font-syne text-white mb-2">+92 315-8168145</p>
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
        </div>
         {/* Divider */}
         <div className="mt-8 border-t border-gray-600"></div>
        {/* Copyright */}
        <p className="mt-8 text-md font-syne text-gray-300">
          © 2023. Copyright. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;