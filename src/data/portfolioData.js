export const PORTFOLIO_DATA = {
  name: "Udith Narayan",
  title: "AI Engineer",
  location: "Annandale, VA",
  phone: "(351) 208-0305",
  summary:
    "AI Engineer with 3 years of experience designing and deploying AI-driven automation solutions.",
  availability: "Available for Hire • Open to Relocation",

  socials: {
    github: "https://github.com/udithnarayann",
    linkedin: "https://www.linkedin.com/in/udithnarayan/",
    email: "udith.narayann@gmail.com",
  },

  education: [
    {
      degree: "M.S. in Computer Science",
      school: "University of Massachusetts Lowell",
      year: "Sep 2022 - May 2024",
    },
    {
      degree: "B.Tech in Computer Science",
      school: "Presidency University, Bangalore",
      year: "Jun 2017 - Jun 2021",
    },
  ],

  experience: [
    {
        role: "AI Engineer",
        company: "OneITCorp",
        date: "Jul 2024 – Present",
        shortDesc: "Designed an AI-powered document processing platform with 95%+ accuracy.",
        fullDesc: [
        "Designed and implemented an AI-Powered Document Processing Platform using FastAPI, LangChain, and the OpenAI API to automate extraction and classification of unstructured data.",
        "Integrated Hugging Face Transformers and spaCy for text analytics, achieving 95%+ accuracy in information retrieval.",
        "Managed deployment pipelines on AWS EC2, S3, and Lambda; implemented monitoring with CloudWatch; containerized services via Docker and GitHub Actions.",
        "Developed lightweight internal dashboards in Angular and TypeScript to visualize document processing metrics.",
        "Built internal FastAPI microservices with PostgreSQL to support scalable automation workflows for enterprise clients."
        ],
        stack: ["FastAPI", "LangChain", "OpenAI", "AWS", "Docker", "Angular"]
    },

    {
        role: "Graduate Teaching Assistant / Grader",
        company: "UMass Lowell",
        date: "Sep 2023 – Dec 2023",
        shortDesc: "Supported student learning in DSA through grading and office hours.",
        fullDesc: [
        "Graded programming assignments and exams for 30+ students in Data Structures and Algorithms, with emphasis on C++ implementations.",
        "Conducted weekly help sessions and office hours to support debugging, problem-solving skills, and core DSA understanding.",
        "Collaborated with faculty to design assessments combining coding tasks with algorithmic reasoning; provided actionable feedback to students."
        ],
        stack: ["C++", "Data Structures", "Algorithms", "Teaching"]
    },

    {
        role: "Cloud Automation Engineer",
        company: "HP Inc.",
        date: "Jul 2021 – Jul 2022",
        shortDesc: "Automated enterprise cloud workflows and CI/CD processes.",
        fullDesc: [
        "Developed Python automation scripts using Pandas, Requests, and REST APIs to manage and monitor 5,000+ enterprise devices.",
        "Built CI/CD pipelines for testing and deployment; collaborated using Jira and Agile sprints to streamline release cycles.",
        "Integrated solutions with HP’s Device Intelligence Platform to improve analytics and uptime metrics.",
        "Used Postman and Docker for validation, testing, and maintaining consistent deployment environments."
        ],
        stack: ["Python", "CI/CD", "REST APIs", "CloudWatch", "Docker"]
    },

    {
        role: "Software Engineering Intern",
        company: "Inbredia Technologies",
        date: "Jun 2020 – Jun 2021",
        shortDesc: "Developed features for a client-matching platform using Java & Firebase.",
        fullDesc: [
        "Contributed to a client-matching platform using Java, HTML, and Firebase for real-time professional connections.",
        "Implemented Firebase Authentication, caching, and API integrations improving app responsiveness by 35%.",
        "Participated in Agile development cycles using Trello and Git; supported QA, testing, and iterative feature improvements for MVP delivery."
        ],
        stack: ["Java", "Firebase", "Android", "HTML"]
    }
  ],


  projects: [
    {
      title: "AI Job Assistant",
      desc: "LLM-powered job-matching platform using FastAPI, React + TypeScript, and OpenAI API.",
      story:
        "Faced with the noise of modern job hunting, I engineered an intelligent platform that goes beyond keyword matching. Using FastAPI and OpenAI, I designed a system that semantically understands candidate profiles to pair them with roles they are genuinely suited for. The entire application was containerized with Docker and deployed via AWS.",
      tags: ["OpenAI", "React", "FastAPI", "Docker", "AWS"],
      icon: "Terminal",
    },
    {
      title: "NER for Digital Health",
      desc: "Trained a SpaCy + TensorFlow NER model for clinical entity extraction (95% F1-score).",
      story:
        "Healthcare data is notoriously unstructured. I took on the challenge of extracting structured insights from clinical text. By training a custom SpaCy and TensorFlow model and optimizing tokenization rules for medical jargon, I achieved a 95% F1-score.",
      tags: ["spaCy", "TensorFlow", "NLP", "Python"],
      icon: "Database",
    },
    {
      title: "IoT Pothole Prediction",
      desc: "ML pipeline analyzing road sensor data for pothole prediction with 85% accuracy.",
      story:
        "Road maintenance is often reactive, but I wanted to make it predictive. Using scikit-learn and NumPy, I designed a machine learning pipeline that analyzes raw sensor data to identify the vibration patterns that precede pothole formation.",
      tags: ["Python", "IoT", "Scikit-Learn", "NumPy"],
      icon: "Cpu",
    },
    {
      title: "ChefConnect",
      desc: "Android app connecting users with local chefs; won Best Capstone Project award.",
      story:
        "For my Capstone, I wanted to support the local culinary economy. I built a native Android app (Java/XML) that connects home chefs with local foodies. The technical highlight was implementing a real-time backend using Firebase.",
      tags: ["Java", "Firebase", "Android", "XML"],
      icon: "Code",
    },
    {
      title: "Cloud Cost Bot",
      desc: "Automated AWS cost monitoring via Lambda functions and CloudWatch.",
      story:
        "Cloud bills can spiral quickly in enterprise environments. I automated the solution using AWS Lambda and Python. This bot acts as an automated DevOps engineer, monitoring usage patterns in real-time.",
      tags: ["AWS Lambda", "Python", "Boto3"],
      icon: "Cloud",
    },
    {
      title: "Resume Analyzer",
      desc: "ATS-style insights tool using LangChain parsers and Transformer models.",
      story:
        "ATS systems are often black boxes. I built this tool to demystify them. Using LangChain to parse resumes against job descriptions, it provides actionable feedback, simulating how an AI recruiter reads a CV.",
      tags: ["LangChain", "LLMs", "Streamlit"],
      icon: "Server",
    },
  ],

  skillsList: [
    { name: "Python/AI", level: 98 },
    { name: "AWS/Cloud", level: 92 },
    { name: "Frontend", level: 85 },
    { name: "Backend", level: 90 },
    { name: "DevOps", level: 88 },
    { name: "DBs", level: 82 },
  ],
};
