import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AOS from "aos";
import "aos/dist/aos.css";

const SkillIcon = lazy(() => import("./skillicon"));

const Skill = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const skills = useMemo(
    () => [
      { id: 1, name: "HTML", percentage: 80, icon: "fab fa-html5" },
      { id: 2, name: "CSS", percentage: 70, icon: "fab fa-css3-alt" },
      { id: 3, name: "JavaScript", percentage: 60, icon: "fab fa-js" },
      { id: 4, name: "MongoDB", percentage: 50, icon: "fas fa-database" },
      { id: 5, name: "React", percentage: 40, icon: "fab fa-react" },
      { id: 6, name: "Tailwind CSS", percentage: 30, icon: "fas fa-wind" },
    ],
    []
  );

  const [animatedPercentages, setAnimatedPercentages] = useState(
    skills.map(() => 0)
  );

  useEffect(() => {
    const animationSteps = 10;
    const intervalId = setInterval(() => {
      setAnimatedPercentages((prev) =>
        prev.map((percent, index) =>
          percent < skills[index].percentage ? percent + 1 : percent
        )
      );
    }, animationSteps);

    return () => clearInterval(intervalId);
  }, [skills]);

  const ErrorFallback = ({ error }) => (
    <div role="alert" className="text-red-500 p-4 text-center">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );

  return (
    <section className="flex flex-col items-center py-10 bg-[#000B2A] text-white" id="skill">
      <h1 className="text-4xl font-bold mb-6">Skills</h1>
      <div className="w-[90%] sm:w-[60%] bg-transparent border border-[#2D5FB6] p-6 rounded-lg" data-aos="zoom-in">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {skills.map((skill, index) => (
            <div key={skill.id} className="flex items-center mb-6" data-aos="fade-right">
              <Suspense fallback={<div className="w-12 h-12 bg-gray-700 rounded-full mr-4" />}>
                <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-full mr-4">
                  <SkillIcon iconClass={skill.icon} />
                </div>
              </Suspense>
              <div className="flex-1">
                <div className="flex justify-between mb-2 text-lg">
                  <span>{skill.name}</span>
                  <span>{animatedPercentages[index]}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${animatedPercentages[index]}%`, backgroundColor: "#2D5FB6" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default React.memo(Skill);