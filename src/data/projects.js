export const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A quiz application built with React.",
    details: `
      Project Alpha is an interactive quiz application designed to test users' knowledge in various categories. 
      The project features a user-friendly interface, dynamic question loading, and a score tracker. 
      Built using React, it also includes state management with Context API, a timer for each question, and responsive design for mobile compatibility.
    `,
    images: [`${process.env.PUBLIC_URL}/images/image-1.png`],
    githubLink: "https://github.com/Hamza-160804/Multiple-choice.github.io",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "A personal portfolio project built with HTML and CSS.",
    details: `
      Project Beta is a sleek and minimalist portfolio designed to showcase personal projects and skills. 
      The project emphasizes clean UI/UX design principles and features responsive layouts, smooth animations, 
      and a focus on accessibility. The portfolio is fully customizable and includes sections like About Me, 
      Skills, Projects, and Contact.
    `,
    images: [`${process.env.PUBLIC_URL}/images/image-2.png`],
    githubLink: "https://github.com/Hamza-160804/Portfolio.github.io",
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "A weather application built using React and a public weather API.",
    details: `
      Project Gamma is a weather application that fetches and displays real-time weather data for any city in the world. 
      The app is built with React and integrates the OpenWeatherMap API. It features a modern design, 
      error handling for invalid inputs, and a search functionality to find weather details like temperature, 
      humidity, and forecast. The project also includes dark mode support and is fully responsive.
    `,
    images: [`${process.env.PUBLIC_URL}/images/image-3.png`],
    githubLink: "https://github.com/Hamza-160804/weather-app",
  },
];
