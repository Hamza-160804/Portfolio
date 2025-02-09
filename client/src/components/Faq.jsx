import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "./Loader";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FAQ = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [currentFAQIndex, setCurrentFAQIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const FAQsPerBatch = 4;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQ((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNext = () => {
    if (currentFAQIndex + FAQsPerBatch < faqs.length) {
      setCurrentFAQIndex((prev) => prev + FAQsPerBatch);
    }
  };

  const handlePrevious = () => {
    if (currentFAQIndex - FAQsPerBatch >= 0) {
      setCurrentFAQIndex((prev) => prev - FAQsPerBatch);
    }
  };

  // Simulate loading before navigation
  const handleButtonClick = (route) => {
    setIsLoading(true); // Show loader
    setTimeout(() => {
      setIsLoading(false); // Hide loader
      navigate(route); // Redirect to the specified route
    }, 1500); // Simulate a delay
  };

  // Reusable Button Component
  const ActionButton = ({ children, onClick, icon: Icon, className }) => (
    <button
      className={`text-white mt-4 transition transform hover:scale-105 px-6 py-2 rounded-md flex items-center bg-transparent border border-[#2D5FB6] hover:bg-[#2D5FB6] ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="mr-2" size={20} />}
      {children}
    </button>
  );

  // FAQ Data
  const faqs = [
    { question: "What services do you offer?", answer: "I specialize in web development, including front-end and back-end solutions, app development, and graphic design." },
    { question: "What technologies do you work with?", answer: "I have experience with HTML, CSS, JavaScript, React, Node.js, and Git, along with other modern web technologies." },
    { question: "Can you work on both front-end and back-end development?", answer: "Yes, I have full-stack experience, covering both UI/UX and server-side development." },
    { question: "How do you approach a new project?", answer: "I start with client discussions, plan the project, design the architecture, and keep clients updated throughout development." },
    { question: "Do you offer website maintenance?", answer: "Yes, I provide ongoing support, security updates, and optimizations." },
    { question: "Can you improve an existing website?", answer: "Absolutely! I optimize performance, redesign UI, and add new features." },
    { question: "How can I contact you?", answer: "You can reach me via email at raohamza1608@gmail.com or through my contact form." },
    { question: "Are you available for new projects?", answer: "Yes! Contact me to discuss your requirements and project timeline." },
    { question: "What is your typical project timeline?", answer: "Timelines vary based on complexity, but I provide an estimate after discussing your needs." },
    { question: "Do you provide custom designs?", answer: "Yes! I create unique, responsive, and brand-specific web designs." },
  ];

  return (
    <div className="w-auto h-auto font-syne">
      {/* Loader */}
      {isLoading && <Loader />}

      {/* FAQ Section */}
      <section className="bg-[#000B2A] py-10 sm:py-16" id="faq">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Heading */}
          <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="max-w-xl mx-auto mt-4 text-xl text-white">Feel free to ask any query.</p>
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-4 mt-10">
            {faqs.slice(currentFAQIndex, currentFAQIndex + FAQsPerBatch).map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-[#1d3b6ea4] border border-[#1d3b6ea4] shadow-lg cursor-pointer rounded-md text-white"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(currentFAQIndex + index)}
                  className="flex items-center justify-between w-full px-6 py-5"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      activeFAQ === currentFAQIndex + index ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFAQ === currentFAQIndex + index && (
                  <div className="px-6 pb-5 text-base text-secondaryText font-rubik">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-10">
            {currentFAQIndex > 0 && (
              <ActionButton onClick={handlePrevious} icon={ChevronLeft}>
                Previous FAQs
              </ActionButton>
            )}
            {currentFAQIndex + FAQsPerBatch < faqs.length && (
              <ActionButton onClick={handleNext} icon={ChevronRight}>
                Next FAQs
              </ActionButton>
            )}
          </div>

          {/* Support Section */}
          <p className="text-center text-white text-base mt-9 mb-[100px]">
            Didn't find the answer you're looking for?{" "}
            <button
              onClick={() => handleButtonClick("/contact")}
              className="font-medium text-[#8b5cf6] cursor-pointer underline"
            >
              Contact our support
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
