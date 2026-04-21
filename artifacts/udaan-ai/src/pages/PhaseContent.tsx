import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { StarField } from "@/components/StarField";
import logoPath from "/logo.png";
import { getStoredStudent } from "@/lib/auth";

type TabType = "videos" | "study" | "practice";

interface Video {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  watched: boolean;
}

interface PracticeExercise {
  id: string;
  description: string;
  completed: boolean;
}

interface PhaseData {
  skillName: string;
  levelName: string;
  phaseName: string;
  phaseNumber: number;
  videos: Video[];
  studyMaterial: string;
  exercises: PracticeExercise[];
}

// Skill-specific phase content mapping
function getPhaseContent(skill: string, level: string, phase: number): PhaseData {
  const skillLower = skill.toLowerCase();
  const levelLower = level.toLowerCase();
  const phaseKey = phase;

  // CYBERSECURITY - Beginner - Phase 1
  if (skillLower.includes("cybersecurity") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Cybersecurity",
      levelName: "Beginner",
      phaseName: "Introduction to Cybersecurity",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "Cybersecurity Full Course", duration: "14:20", youtubeId: "hXSFdwIOfnE", watched: false },
        { id: "2", title: "How Hackers Hack", duration: "11:45", youtubeId: "aU5uMqniukA", watched: false },
        { id: "3", title: "Network Security Basics", duration: "16:30", youtubeId: "E03gh1huvW4", watched: false },
      ],
      studyMaterial: "# Cybersecurity Fundamentals - Phase 1\n\n## What is Cybersecurity?\nCybersecurity is the practice of protecting computer systems, networks, and data from digital attacks, unauthorized access, or damage. It's crucial in today's digital world where cyber threats are constantly evolving.\n\n## Types of Cyber Threats\n- **Malware**: Malicious software that can damage or disrupt systems\n- **Phishing**: Fraudulent attempts to obtain sensitive information\n- **Ransomware**: Malware that encrypts data and demands payment\n- **DDoS Attacks**: Overwhelming systems with traffic to cause disruption\n- **Social Engineering**: Manipulating people to gain access to systems\n\n## Basic Security Terminology\n- **Vulnerability**: Weakness in a system that can be exploited\n- **Threat**: Potential cause of an incident\n- **Risk**: Likelihood of a threat exploiting a vulnerability\n- **Attack**: Actual attempt to compromise security\n- **Exploit**: Method used to take advantage of a vulnerability\n\n## Why Cybersecurity Matters\n- Protects personal and sensitive data\n- Prevents financial losses from cyber attacks\n- Maintains business continuity\n- Ensures compliance with regulations\n- Builds trust with customers",
      exercises: [
        { id: "1", description: "Research and list 5 recent cyber attacks from news", completed: false },
        { id: "2", description: "Identify security vulnerabilities in a sample scenario", completed: false },
        { id: "3", description: "Complete a basic security quiz", completed: false },
      ],
    };
  }

  // CYBERSECURITY - Beginner - Phase 2
  if (skillLower.includes("cybersecurity") && levelLower.includes("beginner") && phaseKey === 2) {
    return {
      skillName: "Cybersecurity",
      levelName: "Beginner",
      phaseName: "Network Security and Ethical Hacking",
      phaseNumber: 2,
      videos: [
        { id: "1", title: "Network Basics for Security", duration: "18:20", youtubeId: "3QhU9jdF4AE", watched: false },
        { id: "2", title: "Introduction to Ethical Hacking", duration: "22:15", youtubeId: "3Kq1MIfTWCE", watched: false },
        { id: "3", title: "Setting up Your Lab Environment", duration: "15:40", youtubeId: "WnNPBZM8xI4", watched: false },
      ],
      studyMaterial: "# Network Security - Phase 2\n\n## How Networks Communicate\n- IP addresses and ports\n- TCP/IP protocol suite\n- Network layers and their functions\n- Packet transmission process\n\n## Ethical Hacking vs Malicious Hacking\n- **Ethical Hacking**: Legal, authorized security testing\n- **Malicious Hacking**: Illegal, unauthorized access\n- Legal frameworks around ethical hacking\n- Certification requirements (CEH, OSCP)\n\n## Setting up Kali Linux for Practice\n- Download and install Kali Linux\n- Set up a virtual machine\n- Configure network settings\n- Install essential security tools\n\n## Key Security Tools\n- **Nmap**: Network scanning and discovery\n- **Wireshark**: Network protocol analysis\n- **Metasploit**: Penetration testing framework\n- **Burp Suite**: Web application security testing\n\n## Getting Started with CTF (Capture The Flag)\n- What are CTF challenges\n- Beginner-friendly CTF platforms\n- Common challenge types\n- Practice strategies",
      exercises: [
        { id: "1", description: "Set up a virtual lab environment", completed: false },
        { id: "2", description: "Practice basic network commands", completed: false },
        { id: "3", description: "Try a beginner CTF challenge", completed: false },
      ],
    };
  }

  // ETHICAL HACKING - Beginner - Phase 1
  if (skillLower.includes("ethical hacking") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Ethical Hacking",
      levelName: "Beginner",
      phaseName: "Introduction to Ethical Hacking",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "What is Ethical Hacking", duration: "12:30", youtubeId: "3Kq1MIfTWCE", watched: false },
        { id: "2", title: "Legal and Ethical Considerations", duration: "9:45", youtubeId: "Y1bhoMfXChw", watched: false },
        { id: "3", title: "Reconnaissance Techniques", duration: "20:15", youtubeId: "WnNPBZM8xI4", watched: false },
      ],
      studyMaterial: "# Ethical Hacking Fundamentals - Phase 1\n\n## Types of Hackers\n- White Hat: Ethical hackers who help improve security\n- Black Hat: Malicious hackers who exploit systems\n- Grey Hat: Hackers who may violate ethics but not laws\n- Script Kiddies: Inexperienced hackers using tools\n\n## Laws Around Ethical Hacking\n- IT Act (India)\n- Computer Fraud and Abuse Act (US)\n- GDPR implications\n- Legal authorization requirements\n- Penetration testing contracts\n\n## Information Gathering Methods\n- OSINT: Open Source Intelligence gathering\n- Passive Reconnaissance: Gathering info without direct interaction\n- Active Reconnaissance: Direct interaction with target\n- Whois: Domain registration information\n- DNS Enumeration: Discovering subdomains and IPs\n\n## Documentation Best Practices\n- Professional report writing\n- Evidence preservation\n- Vulnerability classification\n- Risk assessment methodologies\n- Client communication",
      exercises: [
        { id: "1", description: "Research a target website legally using OSINT", completed: false },
        { id: "2", description: "Practice using Whois and DNS lookup tools", completed: false },
        { id: "3", description: "Document findings in a professional report", completed: false },
      ],
    };
  }

  // GRAPHIC DESIGN - Beginner - Phase 1
  if (skillLower.includes("graphic design") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Graphic Design",
      levelName: "Beginner",
      phaseName: "Introduction to Graphic Design",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "Graphic Design Tutorial for Beginners", duration: "13:20", youtubeId: "9QTCvayLhCA", watched: false },
        { id: "2", title: "Color Theory Basics", duration: "16:45", youtubeId: "AvgCkHrcj90", watched: false },
        { id: "3", title: "Typography Fundamentals", duration: "14:30", youtubeId: "sByzHoiYFX0", watched: false },
      ],
      studyMaterial: "# Graphic Design Fundamentals - Phase 1\n\n## Principles of Good Design\n- Balance: Visual equilibrium in design\n- Contrast: Creating visual interest through differences\n- Hierarchy: Organizing elements by importance\n- Alignment: Creating visual connections\n- Proximity: Grouping related elements\n- Repetition: Consistency across design\n\n## Understanding Color Psychology\n- Red: Energy, passion, urgency\n- Blue: Trust, calm, professionalism\n- Green: Growth, nature, money\n- Yellow: Optimism, attention, caution\n- Purple: Luxury, creativity, wisdom\n- Black: Sophistication, authority, elegance\n\n## Font Pairing and Typography Rules\n- Limit fonts to 2-3 per design\n- Pair contrasting font families (serif + sans-serif)\n- Establish hierarchy with size and weight\n- Ensure readability\n- Consider context and audience\n\n## Design Tools Overview\n- Canva: Beginner-friendly online tool\n- Adobe Photoshop: Professional image editing\n- Adobe Illustrator: Vector graphics\n- Figma: UI/UX design and collaboration",
      exercises: [
        { id: "1", description: "Create a mood board for a brand", completed: false },
        { id: "2", description: "Practice color palette creation in Canva", completed: false },
        { id: "3", description: "Design a simple social media post", completed: false },
      ],
    };
  }

  // UI/UX DESIGN - Beginner - Phase 1
  if ((skillLower.includes("ui/ux") || skillLower.includes("ui") || skillLower.includes("ux")) && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "UI/UX Design",
      levelName: "Beginner",
      phaseName: "Introduction to UI/UX Design",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "UI vs UX Design Explained", duration: "11:20", youtubeId: "5CxXhyhT6Fc", watched: false },
        { id: "2", title: "Figma Tutorial for Beginners", duration: "18:45", youtubeId: "FTFaQWZBqQ8", watched: false },
        { id: "3", title: "Design Thinking Process", duration: "22:30", youtubeId: "a7sEoEvT8l8", watched: false },
      ],
      studyMaterial: "# UI/UX Design Fundamentals - Phase 1\n\n## The Design Thinking Process\n1. Empathize: Understand user needs\n2. Define: Clearly state the problem\n3. Ideate: Generate potential solutions\n4. Prototype: Create tangible representations\n5. Test: Validate with real users\n\n## How to Conduct User Interviews\n- Prepare open-ended questions\n- Listen more than you speak\n- Observe non-verbal cues\n- Record and analyze responses\n- Identify patterns and insights\n\n## Figma Interface Walkthrough\n- Canvas: Main design area\n- Layers Panel: Organize design elements\n- Properties Panel: Adjust element settings\n- Tools Panel: Access design tools\n- Components: Reusable design elements\n\n## Wireframing Basics\n- Low-fidelity sketches\n- Focus on layout and structure\n- Don't worry about aesthetics\n- Iterate quickly\n- Get feedback early",
      exercises: [
        { id: "1", description: "Create a free Figma account and explore", completed: false },
        { id: "2", description: "Sketch wireframes for a simple app by hand", completed: false },
        { id: "3", description: "Analyze the UX of 3 apps you use daily", completed: false },
      ],
    };
  }

  // WEB DEVELOPMENT - Beginner - Phase 1
  if ((skillLower.includes("web development") || skillLower.includes("web dev")) && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Web Development",
      levelName: "Beginner",
      phaseName: "Introduction to Web Development",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "HTML Full Course for Beginners", duration: "12:20", youtubeId: "pQN-pnXPaVg", watched: false },
        { id: "2", title: "CSS Tutorial for Beginners", duration: "19:45", youtubeId: "1Rs2ND1ryYc", watched: false },
        { id: "3", title: "Build Your First Website", duration: "16:30", youtubeId: "PlxWf493en4", watched: false },
      ],
      studyMaterial: "# Web Development Fundamentals - Phase 1\n\n## How Browsers Render Websites\n1. DNS Lookup: Converts domain to IP address\n2. HTTP Request: Browser requests resources from server\n3. Server Response: Server sends HTML, CSS, JS files\n4. Parsing: Browser parses HTML into DOM\n5. Rendering: Browser paints pixels on screen\n6. JavaScript Execution: Runs interactive features\n\n## HTML Tags and Their Purposes\n- html: Root element\n- head: Metadata and resources\n- body: Visible content\n- h1-h6: Headings\n- p: Paragraphs\n- div: Container for grouping\n- a: Links\n- img: Images\n\n## Basic Page Structure\nCreate an HTML file with proper structure including DOCTYPE, html, head, and body tags.\n\n## Development Tools\n- VS Code: Popular code editor\n- Chrome DevTools: Browser debugging\n- GitHub: Version control\n- CodePen: Online code playground",
      exercises: [
        { id: "1", description: "Build your first HTML page", completed: false },
        { id: "2", description: "Create a simple personal bio page", completed: false },
        { id: "3", description: "Add headings, paragraphs and links", completed: false },
      ],
    };
  }

  // DIGITAL MARKETING - Beginner - Phase 1
  if (skillLower.includes("digital marketing") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Digital Marketing",
      levelName: "Beginner",
      phaseName: "Introduction to Digital Marketing",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "Digital Marketing Full Course", duration: "14:20", youtubeId: "nU-IIXBWlS4", watched: false },
        { id: "2", title: "Social Media Marketing Strategy", duration: "16:45", youtubeId: "q9gag_dJubQ", watched: false },
        { id: "3", title: "SEO Tutorial for Beginners", duration: "12:30", youtubeId: "xsVTqzratPs", watched: false },
      ],
      studyMaterial: "# Digital Marketing Fundamentals - Phase 1\n\n## What is Digital Marketing?\nDigital marketing is the practice of promoting products or services using digital channels. It encompasses all marketing efforts that use electronic devices or the internet.\n\n## Key Digital Marketing Channels\n- SEO: Search Engine Optimization\n- Social Media Marketing: Facebook, Instagram, LinkedIn, Twitter\n- Email Marketing: Direct communication with subscribers\n- Content Marketing: Creating valuable content to attract customers\n- PPC: Pay-Per-Click advertising\n- Affiliate Marketing: Partnering with others to promote products\n\n## Understanding Marketing Funnels\n1. Awareness: Potential customers discover your brand\n2. Interest: Customers learn more about your offerings\n3. Consideration: Customers compare options\n4. Intent: Customers show purchase intent\n5. Evaluation: Final decision-making\n6. Purchase: Transaction occurs\n\n## Setting Marketing Goals\n- SMART goals framework\n- KPIs and metrics to track\n- Budget allocation strategies\n- Target audience definition",
      exercises: [
        { id: "1", description: "Analyze the marketing funnel of a brand you like", completed: false },
        { id: "2", description: "Create a simple customer journey map", completed: false },
        { id: "3", description: "Define marketing goals for a hypothetical business", completed: false },
      ],
    };
  }

  // DATA SCIENCE - Beginner - Phase 1
  if (skillLower.includes("data science") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Data Science",
      levelName: "Beginner",
      phaseName: "Introduction to Data Science",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "Data Science Full Course", duration: "15:20", youtubeId: "ua-CiDNNj30", watched: false },
        { id: "2", title: "Statistics for Data Science", duration: "18:45", youtubeId: "xxpc-HPKN28", watched: false },
        { id: "3", title: "Excel for Data Analysis", duration: "14:30", youtubeId: "PSNXoAs2FtQ", watched: false },
      ],
      studyMaterial: "# Data Science Fundamentals - Phase 1\n\n## What is Data Science?\nData science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.\n\n## The Data Science Process\n1. Data Collection: Gathering relevant data\n2. Data Cleaning: Handling missing values and errors\n3. Exploratory Data Analysis: Understanding patterns\n4. Feature Engineering: Creating useful features\n5. Model Building: Training machine learning models\n6. Evaluation: Testing model performance\n7. Deployment: Putting models into production\n\n## Essential Tools for Data Science\n- Python: Primary programming language\n- Jupyter Notebooks: Interactive coding environment\n- Pandas: Data manipulation library\n- NumPy: Numerical computing library\n- Matplotlib/Seaborn: Data visualization\n- Scikit-learn: Machine learning library\n\n## Getting Started with Python\n- Install Anaconda or Miniconda\n- Set up Jupyter Notebook\n- Learn basic Python syntax\n- Practice with real datasets",
      exercises: [
        { id: "1", description: "Install Python and Jupyter Notebook", completed: false },
        { id: "2", description: "Practice basic Python operations in Jupyter", completed: false },
        { id: "3", description: "Load and explore a sample dataset", completed: false },
      ],
    };
  }

  // MACHINE LEARNING - Beginner - Phase 1
  if (skillLower.includes("machine learning") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Machine Learning",
      levelName: "Beginner",
      phaseName: "Introduction to Machine Learning",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "Machine Learning for Beginners", duration: "17:20", youtubeId: "NWONeJKn6kc", watched: false },
        { id: "2", title: "Types of Machine Learning", duration: "19:45", youtubeId: "OGxgnH8y2NM", watched: false },
        { id: "3", title: "Python for Machine Learning", duration: "15:30", youtubeId: "7eh4d6sabA0", watched: false },
      ],
      studyMaterial: "# Machine Learning Fundamentals - Phase 1\n\n## What is Machine Learning?\nMachine learning is a subset of artificial intelligence that enables computers to learn from data and improve their performance without being explicitly programmed.\n\n## Types of Machine Learning\n1. Supervised Learning: Learning from labeled data\n   - Classification: Predicting categories\n   - Regression: Predicting continuous values\n2. Unsupervised Learning: Finding patterns in unlabeled data\n   - Clustering: Grouping similar data points\n   - Dimensionality Reduction: Reducing features\n3. Reinforcement Learning: Learning through trial and error\n   - Agent learns from environment feedback\n   - Used in games, robotics, optimization\n\n## Common ML Algorithms\n- Linear Regression: Predicting numerical values\n- Logistic Regression: Binary classification\n- Decision Trees: Tree-based classification\n- K-Means: Clustering algorithm\n- K-Nearest Neighbors: Instance-based learning\n- Random Forest: Ensemble of decision trees\n\n## ML Workflow\n1. Define the problem\n2. Collect and prepare data\n3. Choose appropriate algorithm\n4. Train the model\n5. Evaluate performance\n6. Tune hyperparameters\n7. Deploy and monitor",
      exercises: [
        { id: "1", description: "Identify real-world ML applications", completed: false },
        { id: "2", description: "Practice with a simple classification dataset", completed: false },
        { id: "3", description: "Build a basic linear regression model", completed: false },
      ],
    };
  }

  // CONTENT WRITING - Beginner - Phase 1
  if (skillLower.includes("content writing") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Content Writing",
      levelName: "Beginner",
      phaseName: "Introduction to Content Writing",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "How to Start a YouTube Channel", duration: "13:20", youtubeId: "XpopyNZKYKw", watched: false },
        { id: "2", title: "Instagram Growth Strategy", duration: "16:45", youtubeId: "7n7g-9Y3eVU", watched: false },
        { id: "3", title: "Blog Writing for Beginners", duration: "14:30", youtubeId: "Jkc9HdGcTpM", watched: false },
      ],
      studyMaterial: "# Content Writing Fundamentals - Phase 1\n\n## Understanding Content Writing\nContent writing is the art of creating valuable, relevant content that engages your audience and achieves specific business goals.\n\n## Types of Content\n- Blog Posts: Long-form educational content\n- Social Media: Short, engaging updates\n- Email Newsletters: Direct communication\n- Website Copy: Sales and informational text\n- White Papers: In-depth research documents\n- Case Studies: Success stories and examples\n\n## Writing Process Steps\n1. Research: Gather information on your topic\n2. Outline: Structure your content logically\n3. Draft: Write your first version freely\n4. Edit: Refine and improve your writing\n5. Proofread: Check for errors\n6. Publish: Share your content\n\n## How to Research Topics Effectively\n- Use multiple sources\n- Verify information\n- Find unique angles\n- Organize research notes\n- Cite sources appropriately\n\n## Writing Headlines That Get Clicks\n- Use numbers (e.g., 7 Ways to...)\n- Address pain points\n- Create curiosity\n- Make specific promises\n- Test different variations\n\n## SEO Basics for Writers\n- Keyword research\n- Natural keyword placement\n- Meta descriptions\n- Alt text for images\n- Internal linking",
      exercises: [
        { id: "1", description: "Write a blog post outline", completed: false },
        { id: "2", description: "Practice writing 5 headline variations", completed: false },
        { id: "3", description: "Optimize a piece of content for SEO", completed: false },
      ],
    };
  }

  // SOFT SKILLS - Communication - Phase 1
  if ((skillLower.includes("soft skills") || skillLower.includes("communication")) && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Soft Skills",
      levelName: "Beginner",
      phaseName: "Communication Skills",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "Communication Skills Training", duration: "13:20", youtubeId: "HAnw168huqA", watched: false },
        { id: "2", title: "How to Speak Confidently", duration: "16:45", youtubeId: "tShavGuo0_E", watched: false },
        { id: "3", title: "Active Listening Skills", duration: "14:30", youtubeId: "H0_yKBitO8M", watched: false },
      ],
      studyMaterial: "# Communication Skills - Phase 1\n\n## Effective Communication Basics\nCommunication is the exchange of information, ideas, thoughts, feelings, and emotions between two or more people.\n\n## Types of Communication\n- Verbal: Spoken words and conversations\n- Non-verbal: Body language, gestures, facial expressions\n- Written: Emails, messages, documents\n- Visual: Charts, graphs, images\n\n## Active Listening Skills\n- Give full attention to the speaker\n- Show that you're listening (nodding, eye contact)\n- Provide feedback\n- Don't interrupt\n- Ask clarifying questions\n\n## Speaking Confidently\n- Prepare what you want to say\n- Speak clearly and at a moderate pace\n- Maintain eye contact\n- Use appropriate body language\n- Practice regularly\n\n## Body Language Basics\n- Maintain open posture\n- Use appropriate gestures\n- Respect personal space\n- Mirror positive body language\n- Be aware of facial expressions",
      exercises: [
        { id: "1", description: "Practice active listening in a conversation", completed: false },
        { id: "2", description: "Record yourself speaking and review it", completed: false },
        { id: "3", description: "Practice a 2-minute presentation", completed: false },
      ],
    };
  }

  // PUBLIC SPEAKING - Beginner - Phase 1
  if (skillLower.includes("public speaking") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Public Speaking",
      levelName: "Beginner",
      phaseName: "Introduction to Public Speaking",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "Public Speaking Tips", duration: "13:20", youtubeId: "tUqzMkKqVNY", watched: false },
        { id: "2", title: "How to Overcome Stage Fear", duration: "16:45", youtubeId: "KIMsHKjMmLY", watched: false },
        { id: "3", title: "TED Talk Techniques", duration: "14:30", youtubeId: "Unzc731iCUY", watched: false },
      ],
      studyMaterial: "# Public Speaking Fundamentals - Phase 1\n\n## What is Public Speaking?\nPublic speaking is the act of speaking to a live audience with the purpose of informing, persuading, or entertaining.\n\n## Overcoming Stage Fear\n- Practice breathing exercises\n- Visualize success\n- Know your material well\n- Start with small audiences\n- Accept that nervousness is normal\n\n## Structuring Your Speech\n1. Introduction: Hook your audience\n2. Body: Main points with evidence\n3. Conclusion: Summarize and call to action\n\n## TED Talk Techniques\n- Start with a story\n- Keep it concise (18 minutes or less)\n- Use visual aids effectively\n- Be authentic and passionate\n- End with a powerful message\n\n## Delivery Tips\n- Maintain eye contact\n- Use appropriate gestures\n- Vary your voice tone\n- Pause for emphasis\n- Stand confidently\n\n## Practice Techniques\n- Record and review your speeches\n- Practice in front of a mirror\n- Get feedback from friends\n- Join a speaking club\n- Start with smaller audiences",
      exercises: [
        { id: "1", description: "Write and practice a 3-minute speech", completed: false },
        { id: "2", description: "Record yourself and identify improvements", completed: false },
        { id: "3", description: "Present to a small group and get feedback", completed: false },
      ],
    };
  }

  // CONTENT CREATION - Phase 1
  if (skillLower.includes("content creation") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Content Creation",
      levelName: "Beginner",
      phaseName: "Introduction to Content Creation",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "How to Start a YouTube Channel", duration: "13:20", youtubeId: "XpopyNZKYKw", watched: false },
        { id: "2", title: "Instagram Growth Strategy", duration: "16:45", youtubeId: "7n7g-9Y3eVU", watched: false },
        { id: "3", title: "Blog Writing for Beginners", duration: "14:30", youtubeId: "Jkc9HdGcTpM", watched: false },
      ],
      studyMaterial: "# Content Creation Fundamentals - Phase 1\n\n## What is Content Creation?\nContent creation is the process of identifying a new topic, deciding which form the content will take, formalizing your strategy, and then producing it.\n\n## Types of Content\n- Video: YouTube, TikTok, Instagram Reels\n- Written: Blogs, articles, social media captions\n- Visual: Infographics, memes, graphics\n- Audio: Podcasts, voiceovers\n- Interactive: Quizzes, polls, live streams\n\n## YouTube Channel Setup\n- Create a Google account\n- Set up your channel\n- Design channel art and logo\n- Write channel description\n- Plan your content calendar\n\n## Instagram Growth Strategy\n- Post consistently\n- Use relevant hashtags\n- Engage with your audience\n- Use Instagram Stories and Reels\n- Collaborate with others\n\n## Blog Writing Basics\n- Choose your niche\n- Research your topics\n- Write compelling headlines\n- Use proper formatting\n- Optimize for SEO\n\n## Content Planning\n- Define your target audience\n- Set content goals\n- Create a content calendar\n- Use content management tools\n- Analyze performance metrics",
      exercises: [
        { id: "1", description: "Create a content calendar for 30 days", completed: false },
        { id: "2", description: "Write and publish your first blog post", completed: false },
        { id: "3", description: "Create your first YouTube video", completed: false },
      ],
    };
  }

  // PYTHON - Beginner - Phase 1 (default)
  if (skillLower.includes("python") && levelLower.includes("beginner") && phaseKey === 1) {
    return {
      skillName: "Python",
      levelName: "Beginner",
      phaseName: "Getting Started with Python",
      phaseNumber: 1,
      videos: [
        { id: "1", title: "Python Tutorial for Beginners", duration: "15:30", youtubeId: "kqtD5dpn9C8", watched: false },
        { id: "2", title: "Python Variables and Data Types", duration: "12:45", youtubeId: "cQT33yu9pY8", watched: false },
        { id: "3", title: "Python Control Flow", duration: "18:20", youtubeId: "DZwmZ8Usvnk", watched: false },
      ],
      studyMaterial: "# Python Basics - Phase 1\n\n## What is Python and Where it's Used\nPython is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, automation, AI and more.\n\n## Variables, Strings, Numbers and Booleans\n- Variables: Containers for storing data\n- Strings: Text data (e.g., Hello)\n- Numbers: Integers and floats\n- Booleans: True or False values\n\n## If Statements and Loops Explained\n- If statements: Conditional execution of code\n- For loops: Iterate over sequences\n- While loops: Repeat while condition is true\n\n## Practice Exercises\n- Write a Hello World program\n- Create variables of different types (string, int, float, boolean)\n- Build a simple calculator",
      exercises: [
        { id: "1", description: "Write a Hello World program", completed: false },
        { id: "2", description: "Create variables of different types (string, int, float, boolean)", completed: false },
        { id: "3", description: "Build a simple calculator", completed: false },
      ],
    };
  }

  // Default fallback for any skill not listed
  return {
    skillName: skill,
    levelName: level,
    phaseName: "Phase " + phase,
    phaseNumber: phase,
    videos: [
      { id: "1", title: "Introduction to " + skill, duration: "15:00", youtubeId: "kqtD5dpn9C8", watched: false },
      { id: "2", title: skill + " Fundamentals", duration: "18:00", youtubeId: "cQT33yu9pY8", watched: false },
      { id: "3", title: "Getting Started with " + skill, duration: "20:00", youtubeId: "Zp5MuPOtsSY", watched: false },
    ],
    studyMaterial: "# " + skill + " - Phase " + phase + "\n\n## Overview\nThis phase introduces the fundamental concepts of " + skill + ". You'll learn the basics and build a strong foundation for advanced topics.\n\n## Key Concepts\n- Core principles of " + skill + "\n- Essential terminology\n- Best practices\n- Common use cases\n\n## Getting Started\n- Set up your development environment\n- Understand the basic concepts\n- Practice with simple examples\n- Build your first project\n\n## Next Steps\nAfter completing this phase, you'll be ready to move on to more advanced topics in " + skill + ".",
    exercises: [
      { id: "1", description: "Complete the introduction tutorial for " + skill, completed: false },
      { id: "2", description: "Practice basic concepts of " + skill, completed: false },
      { id: "3", description: "Build a simple project using " + skill, completed: false },
    ],
  };
}

// Sample data for Python - Beginner - Phase 1 (legacy, kept for reference)
const samplePhaseData: PhaseData = {
  skillName: "Python",
  levelName: "Beginner",
  phaseName: "Getting Started",
  phaseNumber: 1,
  videos: [
    { id: "1", title: "Python Introduction", duration: "15:30", youtubeId: "kqtD5dpn9C8", watched: false },
    { id: "2", title: "Variables and Data Types", duration: "12:45", youtubeId: "cQT33yu9pY8", watched: false },
    { id: "3", title: "Control Flow", duration: "18:20", youtubeId: "Zp5MuPOtsSY", watched: false },
  ],
  studyMaterial: "# Python Basics - Phase 1\n\n## Introduction to Python\nPython is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, automation, and more.\n\n## Variables and Data Types\n\n### Variables\nVariables are containers for storing data values.\n\n### Data Types\nPython has several built-in data types:\n\n- String: Text data (e.g., Hello)\n- Integer: Whole numbers (e.g., 42)\n- Float: Decimal numbers (e.g., 3.14)\n- Boolean: True or False\n- List: Ordered collection of items\n\n## Control Flow\n\n### If Statements\nConditional execution of code based on conditions.\n\n### Loops\n- For Loop: Iterate over sequences\n- While Loop: Repeat while condition is true\n\n## Key Points to Remember\n- Python uses indentation to define code blocks\n- Variables are dynamically typed\n- Comments start with #\n- Print statements use print()",
  exercises: [
    { id: "1", description: "Write a Hello World program", completed: false },
    { id: "2", description: "Create variables of different types (string, int, float, boolean)", completed: false },
    { id: "3", description: "Write a simple if-else program to check if a number is positive or negative", completed: false },
  ],
};

export default function PhaseContent() {
  const { skillId, levelId, phaseId } = useParams<{ skillId: string; levelId: string; phaseId: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("videos");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [phaseComplete, setPhaseComplete] = useState(false);

  // Get skill-specific phase content based on URL parameters
  const initialPhaseData = getPhaseContent(
    skillId || "Python",
    levelId || "Beginner",
    parseInt(phaseId || "1")
  );
  const [phaseData, setPhaseData] = useState<PhaseData>(initialPhaseData);

  const watchedCount = phaseData.videos.filter(v => v.watched).length;
  const completedExercises = phaseData.exercises.filter(e => e.completed).length;
  const totalProgress = Math.round(((watchedCount + completedExercises) / (phaseData.videos.length + phaseData.exercises.length)) * 100);

  function toggleWatched(videoId: string) {
    setPhaseData((prev: PhaseData) => ({
      ...prev,
      videos: prev.videos.map((v: Video) => v.id === videoId ? { ...v, watched: !v.watched } : v),
    }));
    toast({ title: "Video marked as watched" });
  }

  function toggleExercise(exerciseId: string) {
    setPhaseData((prev: PhaseData) => ({
      ...prev,
      exercises: prev.exercises.map((e: PracticeExercise) => e.id === exerciseId ? { ...e, completed: !e.completed } : e),
    }));
    toast({ title: "Exercise marked as complete" });
  }

  async function handlePhaseComplete() {
    if (totalProgress < 50) {
      toast({ title: "Please complete at least 50% of content first" });
      return;
    }

    const student = getStoredStudent();
    if (student) {
      try {
        // Initialize progress if not exists
        await fetch(`/api/skill-progress/initialize/${student.id}/${skillId}`, {
          method: "POST",
        });

        // Mark phase as completed
        await fetch(`/api/skill-progress/progress/${student.id}/${skillId}/${phaseId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "completed", level: levelId }),
        });
      } catch (error) {
        console.error("Failed to save phase progress:", error);
      }
    }

    setPhaseComplete(true);
    toast({ title: "Phase completed! Starting phase test..." });
    setLocation(`/mock-test?skillId=${skillId}&levelId=${levelId}&phaseId=${phaseId}&testType=phase`);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
      <StarField />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ color: "#a78bfa", fontSize: "0.85rem" }}>{phaseData.skillName}</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#a78bfa", fontSize: "0.85rem" }}>{phaseData.levelName}</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#c4b5fd", fontSize: "0.85rem", fontWeight: 600 }}>Phase {phaseData.phaseNumber}</span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>{phaseData.phaseName}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ flex: 1, height: "8px", borderRadius: "999px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${totalProgress}%`, background: "linear-gradient(90deg, #4c35c8, #9333ea)", borderRadius: "999px", transition: "width 0.3s ease" }} />
            </div>
            <span style={{ color: "#a78bfa", fontSize: "0.85rem", fontWeight: 700 }}>{totalProgress}%</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(76,53,200,0.2)", paddingBottom: "0.5rem" }}>
          {[
            { id: "videos" as TabType, label: "📹 Videos" },
            { id: "study" as TabType, label: "📖 Study Material" },
            { id: "practice" as TabType, label: "💻 Practice" },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "12px",
                background: activeTab === tab.id ? "linear-gradient(135deg, rgba(76,53,200,0.7), rgba(147,51,234,0.55))" : "transparent",
                color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.6)",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: "rgba(13,10,40,0.85)", border: "1px solid rgba(76,53,200,0.28)", borderRadius: "18px", padding: "1.5rem", marginBottom: "2rem", minHeight: "400px" }}>
          {activeTab === "videos" && (
            <div>
              {selectedVideo ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(null)}
                    style={{ padding: "0.5rem 1rem", border: "1px solid rgba(76,53,200,0.45)", borderRadius: "12px", background: "transparent", color: "white", fontWeight: 700, cursor: "pointer", marginBottom: "1rem" }}
                  >
                    ← Back to Videos
                  </button>
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "12px", overflow: "hidden" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                      title={selectedVideo.title}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ color: "white", fontSize: "1.2rem", fontWeight: 700 }}>{selectedVideo.title}</h3>
                    <button
                      type="button"
                      onClick={() => toggleWatched(selectedVideo.id)}
                      style={{
                        padding: "0.5rem 1rem",
                        border: selectedVideo.watched ? "1px solid #10b981" : "1px solid rgba(76,53,200,0.45)",
                        borderRadius: "12px",
                        background: selectedVideo.watched ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg, rgba(76,53,200,0.7), rgba(147,51,234,0.55))",
                        color: selectedVideo.watched ? "#10b981" : "white",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {selectedVideo.watched ? "✓ Watched" : "Mark as Watched"}
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                  {phaseData.videos.map(video => (
                    <div
                      key={video.id}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        background: "rgba(76,53,200,0.08)",
                        border: "1px solid rgba(76,53,200,0.22)",
                        borderRadius: "12px",
                        padding: "1rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div style={{ width: "160px", height: "90px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(76,53,200,0.3), rgba(147,51,234,0.2))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "2rem" }}>▶️</span>
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h3 style={{ color: "white", fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem" }}>{video.title}</h3>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{video.duration}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {video.watched && <span style={{ color: "#10b981", fontSize: "1.5rem" }}>✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "study" && (
            <div style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0 }}>
                {phaseData.studyMaterial}
              </pre>
            </div>
          )}

          {activeTab === "practice" && (
            <div style={{ display: "grid", gap: "1rem" }}>
              {phaseData.exercises.map(exercise => (
                <div
                  key={exercise.id}
                  style={{
                    background: exercise.completed ? "rgba(16,185,129,0.08)" : "rgba(76,53,200,0.08)",
                    border: exercise.completed ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(76,53,200,0.22)",
                    borderRadius: "12px",
                    padding: "1rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={exercise.completed}
                    onChange={() => toggleExercise(exercise.id)}
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />
                  <span style={{ color: exercise.completed ? "#10b981" : "white", fontSize: "0.95rem", flex: 1, fontWeight: exercise.completed ? 600 : 400 }}>
                    {exercise.description}
                  </span>
                  {exercise.completed && <span style={{ color: "#10b981", fontSize: "1.2rem" }}>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Progress and Complete Button */}
        <div style={{ background: "rgba(13,10,40,0.85)", border: "1px solid rgba(76,53,200,0.28)", borderRadius: "18px", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ color: "white", fontSize: "1.1rem", fontWeight: 700 }}>Phase Progress</span>
            <span style={{ color: "#a78bfa", fontSize: "1.1rem", fontWeight: 700 }}>{totalProgress}%</span>
          </div>
          <div style={{ height: "12px", borderRadius: "999px", background: "rgba(255,255,255,0.1)", overflow: "hidden", marginBottom: "1rem" }}>
            <div style={{ height: "100%", width: `${totalProgress}%`, background: "linear-gradient(90deg, #4c35c8, #9333ea)", borderRadius: "999px", transition: "width 0.3s ease" }} />
          </div>
          <button
            type="button"
            onClick={handlePhaseComplete}
            disabled={totalProgress < 50 || phaseComplete}
            style={{
              width: "100%",
              padding: "1rem",
              border: "none",
              borderRadius: "12px",
              background: totalProgress >= 50 && !phaseComplete ? "linear-gradient(135deg, #4c35c8, #9333ea)" : "rgba(76,53,200,0.3)",
              color: totalProgress >= 50 && !phaseComplete ? "white" : "rgba(255,255,255,0.4)",
              fontWeight: 800,
              fontSize: "1.1rem",
              cursor: totalProgress >= 50 && !phaseComplete ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}
          >
            {phaseComplete ? "✓ Phase Completed" : "Mark Phase as Complete"}
          </button>
        </div>
      </div>
    </div>
  );
}
