import React, { 
  useEffect, 
  useMemo, 
  useCallback, 
  memo, 
  useReducer 
} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Info } from "lucide-react";
import '../App.css';

const ViewDetailsButton = ({
  children,
  onClick,
  className = 'view-details-button',
  icon: Icon = null,
  ...props
}) => (
  <button
    className={`
    mt-4
    ml-[200px]
      transition
      transform hover:scale-105
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

const services = [
  {
    id: "web-design",
    step: "01",
    icon: "fa-code",
    title: "Web Design",
    description: [
      "Web creative design refers to the practice of crafting visually compelling and user-centric websites, integrating aesthetics, functionality, and technical performance.",
      "It involves a mix of artistic creativity, design theory, and technical know-how, to create websites that are both visually appealing and easy to navigate.",
    ],
    detail: "Web creative design is crucial for establishing a brand's online presence, improving user experience, and driving conversions.",
  },
  {
    id: "ui-ux-design",
    step: "02",
    icon: "fa-crop",
    title: "UI/UX Design",
    description: [
      "UI (User Interface) and UX (User Experience) Design are integral components of creating digital products that are both visually appealing and highly functional.",
      "While they are closely related, they focus on different aspects of the user's interaction with a product.",
    ],
    detail: "Together, UI and UX design play a pivotal role in shaping how users perceive and engage with websites, apps, and other digital platforms.",
  },
  {
    id: "app-design", 
    step: "03",
    icon: "fab fa-app-store",
    secondaryIcon: "fab fa-google-play",
    title: "App Design",
    description: [
      "App design is the process of creating visually appealing and user-friendly mobile applications.",
      "It involves both User Interface (UI) and User Experience (UX) design principles to build apps that are not only beautiful but also intuitive and easy to navigate.",
    ],
    detail: "The ultimate goal of app design is to deliver a seamless, enjoyable experience that fulfills the needs of its users while supporting the business objectives of the app creators.",
  },
  {
    id: "ppt-making",
    step: "04",
    icon: "fas fa-file-powerpoint",
    title: "PPT Making",
    description: [
      "I can create professional and engaging presentations using MS PowerPoint, leveraging my design skills and attention to detail.",
      "Additionally, I can utilize AI-powered presentation tools to enhance creativity, streamline the process, and generate visually appealing slides efficiently.",
    ],
    detail: "Whether manual or AI-assisted, I ensure the presentations effectively communicate the intended message.",
  },
];

const serviceReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DETAIL":
      return { ...state, [action.id]: !state[action.id] };
    default:
      return state;
  }
};

const ServiceCard = memo(({ 
  service, 
  index, 
  isDetailVisible, 
  onToggleDetail 
}) => {
  return (
    <div
      key={service.id}
      className="p-6 rounded-lg bg-[#4c446d41] shadow-lg border border-[#2D5FB6] transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
      data-aos="rotate-out"
      data-aos-delay={`${index * 100}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="text-2xl text-white font-bold">{service.step}</span>
        <i className={`fa ${service.icon} text-4xl text-[#2D5FB6]`}></i>
        {service.secondaryIcon && (
          <i className={`fa ${service.secondaryIcon} text-4xl text-[#2D5FB6] ml-2`}></i>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
      <ul className="space-y-4 text-gray-300 text-left font-rubik">
        {service.description.map((desc, idx) => (
          <li key={idx} className="leading-relaxed">
            {desc}
          </li>
        ))}
      </ul>
      <ViewDetailsButton 
        onClick={() => onToggleDetail(service.id)}
        icon={Info}
      >
        {isDetailVisible ? "Learn Less" : "Learn More"}
      </ViewDetailsButton>
      {isDetailVisible && (
        <p className="mt-4 text-gray-300 font-rubik">{service.detail}</p>
      )}
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

const Services = () => {
  const [visibleDetails, dispatch] = useReducer(serviceReducer, {});

  const toggleDetail = useCallback((serviceId) => {
    dispatch({ type: "TOGGLE_DETAIL", id: serviceId });
  }, []);

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true 
    });
  }, []);

  const memoizedServices = useMemo(() => services, []);

  return (
    <section 
      className="py-16 bg-[#000B2A] text-white font-syne" 
      id="services"
    >
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 
          className="text-4xl font-bold mb-8 font-syne" 
          data-aos="fade-right"
        >
          My Services
        </h2>
        <p 
          className="text-lg text-gray-400 mb-12" 
          data-aos="fade-up"
        >
          Achieving Distinctiveness with Confidence.
        </p>
        <hr className="border-gray-600 mb-12 w-2/2 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {memoizedServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isDetailVisible={!!visibleDetails[service.id]}
              onToggleDetail={toggleDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
