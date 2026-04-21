export interface SkillVideo {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  watched: boolean;
}

export interface SkillVideos {
  skillName: string;
  levelName: string;
  phaseName: string;
  phaseNumber: number;
  videos: SkillVideo[];
  exercises: { id: string; description: string; completed: boolean }[];
}

// Video mapping for each skill - Phase 1 videos
export const SKILL_VIDEO_MAPPING: Record<string, SkillVideos> = {
  "Communication Skills": {
    skillName: "Communication Skills",
    levelName: "Beginner",
    phaseName: "Communication Skills",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Communication Skills - Full Course", duration: "14:20", youtubeId: "HAnw168huqA", watched: false },
      { id: "2", title: "How to Speak Confidently", duration: "16:45", youtubeId: "tShavGuo0_E", watched: false },
      { id: "3", title: "Active Listening Masterclass", duration: "14:30", youtubeId: "H0_yKBitO8M", watched: false },
    ],
    exercises: [
      { id: "1", description: "Practice active listening in a conversation", completed: false },
      { id: "2", description: "Record yourself speaking and review it", completed: false },
    ],
  },

  "Content Writing": {
    skillName: "Content Writing",
    levelName: "Beginner",
    phaseName: "Content Writing",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Content Writing for Beginners", duration: "13:20", youtubeId: "Jkc9HdGcTpM", watched: false },
      { id: "2", title: "How to Write Engaging Blog Posts", duration: "16:45", youtubeId: "sDI7EiPV3tA", watched: false },
      { id: "3", title: "SEO Writing Tutorial", duration: "14:30", youtubeId: "xsVTqzratPs", watched: false },
    ],
    exercises: [
      { id: "1", description: "Write a blog post outline", completed: false },
      { id: "2", description: "Practice writing 5 headline variations", completed: false },
    ],
  },

  "Digital Marketing": {
    skillName: "Digital Marketing",
    levelName: "Beginner",
    phaseName: "Digital Marketing",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Digital Marketing Full Course", duration: "14:20", youtubeId: "nU-IIXBWlS4", watched: false },
      { id: "2", title: "Social Media Marketing Strategy", duration: "16:45", youtubeId: "q9gag_dJubQ", watched: false },
      { id: "3", title: "SEO Tutorial for Beginners", duration: "12:30", youtubeId: "xsVTqzratPs", watched: false },
    ],
    exercises: [
      { id: "1", description: "Analyze the marketing funnel of a brand you like", completed: false },
      { id: "2", description: "Create a simple customer journey map", completed: false },
    ],
  },

  "Canva": {
    skillName: "Canva",
    levelName: "Beginner",
    phaseName: "Canva Design",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Canva Tutorial for Beginners", duration: "13:20", youtubeId: "DHBBbfMoFbE", watched: false },
      { id: "2", title: "Graphic Design Basics", duration: "16:45", youtubeId: "9QTCvayLhCA", watched: false },
      { id: "3", title: "Color Theory for Designers", duration: "14:30", youtubeId: "AvgCkHrcj90", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a mood board for a brand", completed: false },
      { id: "2", description: "Practice color palette creation in Canva", completed: false },
    ],
  },

  "Graphic Design": {
    skillName: "Graphic Design",
    levelName: "Beginner",
    phaseName: "Graphic Design",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Canva Tutorial for Beginners", duration: "13:20", youtubeId: "DHBBbfMoFbE", watched: false },
      { id: "2", title: "Graphic Design Basics", duration: "16:45", youtubeId: "9QTCvayLhCA", watched: false },
      { id: "3", title: "Color Theory for Designers", duration: "14:30", youtubeId: "AvgCkHrcj90", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a mood board for a brand", completed: false },
      { id: "2", description: "Practice color palette creation in Canva", completed: false },
    ],
  },

  "MS Office": {
    skillName: "MS Office",
    levelName: "Beginner",
    phaseName: "Microsoft Office",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Microsoft Excel Full Course", duration: "15:20", youtubeId: "PSNXoAs2FtQ", watched: false },
      { id: "2", title: "Word for Beginners", duration: "16:45", youtubeId: "S-qlL8tDMuQ", watched: false },
      { id: "3", title: "PowerPoint Tutorial", duration: "14:30", youtubeId: "MHoI7cMiEwo", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a simple spreadsheet in Excel", completed: false },
      { id: "2", description: "Write a document in Word with formatting", completed: false },
    ],
  },

  "MS Excel": {
    skillName: "MS Excel",
    levelName: "Beginner",
    phaseName: "Microsoft Excel",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Microsoft Excel Full Course", duration: "15:20", youtubeId: "PSNXoAs2FtQ", watched: false },
      { id: "2", title: "Word for Beginners", duration: "16:45", youtubeId: "S-qlL8tDMuQ", watched: false },
      { id: "3", title: "PowerPoint Tutorial", duration: "14:30", youtubeId: "MHoI7cMiEwo", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a simple spreadsheet in Excel", completed: false },
      { id: "2", description: "Write a document in Word with formatting", completed: false },
    ],
  },

  "Interview Preparation": {
    skillName: "Interview Preparation",
    levelName: "Beginner",
    phaseName: "Interview Preparation",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "How to Crack Job Interviews", duration: "13:20", youtubeId: "KIwVQ5XLKVA", watched: false },
      { id: "2", title: "Common Interview Questions", duration: "16:45", youtubeId: "1mHjMNZZvFo", watched: false },
      { id: "3", title: "Body Language in Interviews", duration: "14:30", youtubeId: "PCWVi5pAa30", watched: false },
    ],
    exercises: [
      { id: "1", description: "Prepare answers for 10 common interview questions", completed: false },
      { id: "2", description: "Practice mock interview with a friend", completed: false },
    ],
  },

  "Resume Building": {
    skillName: "Resume Building",
    levelName: "Beginner",
    phaseName: "Resume Building",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "How to Write a Resume", duration: "13:20", youtubeId: "y8YH0Qbu5h4", watched: false },
      { id: "2", title: "Resume Tips for Freshers", duration: "16:45", youtubeId: "Tt08KmFfIYQ", watched: false },
      { id: "3", title: "LinkedIn Profile Tips", duration: "14:30", youtubeId: "BcfGWi8ATCs", watched: false },
    ],
    exercises: [
      { id: "1", description: "Draft your resume from scratch", completed: false },
      { id: "2", description: "Update your LinkedIn profile", completed: false },
    ],
  },

  "Public Speaking": {
    skillName: "Public Speaking",
    levelName: "Beginner",
    phaseName: "Public Speaking",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Public Speaking Full Course", duration: "13:20", youtubeId: "tUqzMkKqVNY", watched: false },
      { id: "2", title: "Overcome Stage Fear", duration: "16:45", youtubeId: "KIMsHKjMmLY", watched: false },
      { id: "3", title: "TED Talk Secrets", duration: "14:30", youtubeId: "Unzc731iCUY", watched: false },
    ],
    exercises: [
      { id: "1", description: "Write and practice a 3-minute speech", completed: false },
      { id: "2", description: "Record yourself and identify improvements", completed: false },
    ],
  },

  "Python": {
    skillName: "Python",
    levelName: "Beginner",
    phaseName: "Python Programming",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Python for Beginners Full Course", duration: "15:20", youtubeId: "kqtD5dpn9C8", watched: false },
      { id: "2", title: "Python Variables and Data Types", duration: "12:45", youtubeId: "cQT33yu9pY8", watched: false },
      { id: "3", title: "Python Control Flow", duration: "18:20", youtubeId: "DZwmZ8Usvnk", watched: false },
    ],
    exercises: [
      { id: "1", description: "Write a Hello World program", completed: false },
      { id: "2", description: "Create variables of different types", completed: false },
    ],
  },

  "Web Development": {
    skillName: "Web Development",
    levelName: "Beginner",
    phaseName: "Web Development",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "HTML Full Course", duration: "12:20", youtubeId: "pQN-pnXPaVg", watched: false },
      { id: "2", title: "CSS Tutorial", duration: "19:45", youtubeId: "1Rs2ND1ryYc", watched: false },
      { id: "3", title: "JavaScript Basics", duration: "16:30", youtubeId: "W6NZfCO5SIk", watched: false },
    ],
    exercises: [
      { id: "1", description: "Build your first HTML page", completed: false },
      { id: "2", description: "Create a simple personal bio page", completed: false },
    ],
  },

  "UI/UX Design": {
    skillName: "UI/UX Design",
    levelName: "Beginner",
    phaseName: "UI/UX Design",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "UI UX Design Full Course", duration: "13:20", youtubeId: "5CxXhyhT6Fc", watched: false },
      { id: "2", title: "Figma Tutorial", duration: "18:45", youtubeId: "FTFaQWZBqQ8", watched: false },
      { id: "3", title: "Design Thinking", duration: "22:30", youtubeId: "a7sEoEvT8l8", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a free Figma account and explore", completed: false },
      { id: "2", description: "Sketch wireframes for a simple app by hand", completed: false },
    ],
  },

  "Data Science": {
    skillName: "Data Science",
    levelName: "Beginner",
    phaseName: "Data Science",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Data Science Full Course", duration: "15:20", youtubeId: "ua-CiDNNj30", watched: false },
      { id: "2", title: "Statistics for Beginners", duration: "18:45", youtubeId: "xxpc-HPKN28", watched: false },
      { id: "3", title: "Excel for Data Analysis", duration: "14:30", youtubeId: "PSNXoAs2FtQ", watched: false },
    ],
    exercises: [
      { id: "1", description: "Install Python and Jupyter Notebook", completed: false },
      { id: "2", description: "Practice basic Python operations in Jupyter", completed: false },
    ],
  },

  "Machine Learning": {
    skillName: "Machine Learning",
    levelName: "Beginner",
    phaseName: "Machine Learning",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Machine Learning Basics", duration: "17:20", youtubeId: "NWONeJKn6kc", watched: false },
      { id: "2", title: "ML Algorithms Explained", duration: "19:45", youtubeId: "OGxgnH8y2NM", watched: false },
      { id: "3", title: "Python for ML Setup", duration: "15:30", youtubeId: "7eh4d6sabA0", watched: false },
    ],
    exercises: [
      { id: "1", description: "Identify real-world ML applications", completed: false },
      { id: "2", description: "Practice with a simple classification dataset", completed: false },
    ],
  },

  "Cybersecurity": {
    skillName: "Cybersecurity",
    levelName: "Beginner",
    phaseName: "Cybersecurity",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Cybersecurity Full Course", duration: "14:20", youtubeId: "hXSFdwIOfnE", watched: false },
      { id: "2", title: "Ethical Hacking Basics", duration: "11:45", youtubeId: "aU5uMqniukA", watched: false },
      { id: "3", title: "Network Security Fundamentals", duration: "16:30", youtubeId: "E03gh1huvW4", watched: false },
    ],
    exercises: [
      { id: "1", description: "Research and list 5 recent cyber attacks from news", completed: false },
      { id: "2", description: "Identify security vulnerabilities in a sample scenario", completed: false },
    ],
  },

  "Social Media Marketing": {
    skillName: "Social Media Marketing",
    levelName: "Beginner",
    phaseName: "Social Media Marketing",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Social Media Marketing Course", duration: "14:20", youtubeId: "q9gag_dJubQ", watched: false },
      { id: "2", title: "Instagram Growth Strategy", duration: "16:45", youtubeId: "7n7g-9Y3eVU", watched: false },
      { id: "3", title: "YouTube Channel Growth", duration: "14:30", youtubeId: "XpopyNZKYKw", watched: false },
    ],
    exercises: [
      { id: "1", description: "Analyze social media strategy of a brand", completed: false },
      { id: "2", description: "Create a content calendar for 30 days", completed: false },
    ],
  },
};

// Function to get videos for a skill
export function getVideosForSkill(skillName: string, level: string = "Beginner", phase: number = 1): SkillVideos {
  // Normalize skill name for matching
  const normalizedSkill = skillName.trim().toLowerCase();
  
  // Try to find exact match
  const exactMatch = Object.keys(SKILL_VIDEO_MAPPING).find(
    key => key.toLowerCase() === normalizedSkill
  );
  
  if (exactMatch) {
    const mapping = SKILL_VIDEO_MAPPING[exactMatch];
    return {
      ...mapping,
      levelName: level,
      phaseNumber: phase,
      phaseName: mapping.phaseName,
    };
  }
  
  // Try partial match
  const partialMatch = Object.keys(SKILL_VIDEO_MAPPING).find(
    key => normalizedSkill.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedSkill)
  );
  
  if (partialMatch) {
    const mapping = SKILL_VIDEO_MAPPING[partialMatch];
    return {
      ...mapping,
      levelName: level,
      phaseNumber: phase,
      phaseName: mapping.phaseName,
    };
  }
  
  // Generic fallback with skill name in title
  return {
    skillName: skillName,
    levelName: level,
    phaseName: `Phase ${phase}`,
    phaseNumber: phase,
    videos: [
      { 
        id: "1", 
        title: `${skillName} - Introduction`, 
        duration: "15:00", 
        youtubeId: "kqtD5dpn9C8", // Generic Python video as fallback
        watched: false 
      },
      { 
        id: "2", 
        title: `${skillName} Fundamentals`, 
        duration: "18:00", 
        youtubeId: "cQT33yu9pY8", // Generic Python video as fallback
        watched: false 
      },
      { 
        id: "3", 
        title: `Getting Started with ${skillName}`, 
        duration: "20:00", 
        youtubeId: "DZwmZ8Usvnk", // Generic Python video as fallback
        watched: false 
      },
    ],
    exercises: [
      { id: "1", description: `Complete the introduction tutorial for ${skillName}`, completed: false },
      { id: "2", description: `Practice basic concepts of ${skillName}`, completed: false },
    ],
  };
}
