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
      { id: "3", title: "Facebook Marketing Tutorial", duration: "14:30", youtubeId: "_4kCmMZyJGA", watched: false },
    ],
    exercises: [
      { id: "1", description: "Analyze social media strategy of a brand", completed: false },
      { id: "2", description: "Create a content calendar for 30 days", completed: false },
    ],
  },

  "Accounting Principles": {
    skillName: "Accounting Principles",
    levelName: "Beginner",
    phaseName: "Accounting Principles",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Accounting Basics Full Course", duration: "15:20", youtubeId: "yYX4bvQSqbo", watched: false },
      { id: "2", title: "Financial Statements Explained", duration: "16:45", youtubeId: "uI4i_a0gOYE", watched: false },
      { id: "3", title: "Bookkeeping for Beginners", duration: "14:30", youtubeId: "4J3Gi1IhbXU", watched: false },
    ],
    exercises: [
      { id: "1", description: "Practice basic accounting equations", completed: false },
      { id: "2", description: "Create a simple balance sheet", completed: false },
    ],
  },

  "Taxation Basics": {
    skillName: "Taxation Basics",
    levelName: "Beginner",
    phaseName: "Taxation Basics",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Income Tax for Beginners India", duration: "15:20", youtubeId: "3k6M0VW9p1E", watched: false },
      { id: "2", title: "GST Complete Guide", duration: "16:45", youtubeId: "2Q-R2gNkm48", watched: false },
      { id: "3", title: "Tax Filing Tutorial India", duration: "14:30", youtubeId: "FP8pFHbHdE4", watched: false },
    ],
    exercises: [
      { id: "1", description: "Calculate income tax for a sample case", completed: false },
      { id: "2", description: "Understand GST registration process", completed: false },
    ],
  },

  "Financial Statements": {
    skillName: "Financial Statements",
    levelName: "Beginner",
    phaseName: "Financial Statements",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Financial Statements Full Course", duration: "15:20", youtubeId: "uI4i_a0gOYE", watched: false },
      { id: "2", title: "Balance Sheet Explained", duration: "16:45", youtubeId: "A5CJ_BZlIaA", watched: false },
      { id: "3", title: "Profit and Loss Statement", duration: "14:30", youtubeId: "nIMklDa_8MQ", watched: false },
    ],
    exercises: [
      { id: "1", description: "Analyze a sample balance sheet", completed: false },
      { id: "2", description: "Create a P&L statement", completed: false },
    ],
  },

  "Tally Excel": {
    skillName: "Tally Excel",
    levelName: "Beginner",
    phaseName: "Tally Excel",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Tally Prime Full Course", duration: "15:20", youtubeId: "bqbI4h-bCEg", watched: false },
      { id: "2", title: "Excel for Accountants", duration: "16:45", youtubeId: "PSNXoAs2FtQ", watched: false },
      { id: "3", title: "Advanced Excel Tutorial", duration: "14:30", youtubeId: "K74_FNnlIF8", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a company in Tally", completed: false },
      { id: "2", description: "Use Excel formulas for accounting", completed: false },
    ],
  },

  "Business Laws": {
    skillName: "Business Laws",
    levelName: "Beginner",
    phaseName: "Business Laws",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Business Law Basics", duration: "15:20", youtubeId: "dlYUAcwMY9g", watched: false },
      { id: "2", title: "Contract Law Explained", duration: "16:45", youtubeId: "VvqsEEB9Zj4", watched: false },
      { id: "3", title: "Company Law India", duration: "14:30", youtubeId: "4J3Gi1IhbXU", watched: false },
    ],
    exercises: [
      { id: "1", description: "Understand basic business law concepts", completed: false },
      { id: "2", description: "Review a sample contract", completed: false },
    ],
  },

  "CA Foundation Prep": {
    skillName: "CA Foundation Prep",
    levelName: "Beginner",
    phaseName: "CA Foundation Prep",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "CA Foundation Complete Guide", duration: "15:20", youtubeId: "n8TBWx8Yd7M", watched: false },
      { id: "2", title: "CA Foundation Maths", duration: "16:45", youtubeId: "yTGCOEpG9E0", watched: false },
      { id: "3", title: "CA Foundation Economics", duration: "14:30", youtubeId: "vRpCCh9x-NA", watched: false },
    ],
    exercises: [
      { id: "1", description: "Practice CA foundation sample questions", completed: false },
      { id: "2", description: "Create a study schedule", completed: false },
    ],
  },

  "Content Creation": {
    skillName: "Content Creation",
    levelName: "Beginner",
    phaseName: "Content Creation",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Content Creation Masterclass", duration: "13:20", youtubeId: "Jkc9HdGcTpM", watched: false },
      { id: "2", title: "Video Content for Beginners", duration: "16:45", youtubeId: "XpopyNZKYKw", watched: false },
      { id: "3", title: "Instagram Reels Strategy", duration: "14:30", youtubeId: "7n7g-9Y3eVU", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a content calendar for 30 days", completed: false },
      { id: "2", description: "Write and publish your first blog post", completed: false },
    ],
  },

  "Video Editing": {
    skillName: "Video Editing",
    levelName: "Beginner",
    phaseName: "Video Editing",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Video Editing for Beginners", duration: "13:20", youtubeId: "8NRi4T8RsAE", watched: false },
      { id: "2", title: "Premiere Pro Full Course", duration: "16:45", youtubeId: "Hls3Tp7JS8E", watched: false },
      { id: "3", title: "Reels Editing Tutorial", duration: "14:30", youtubeId: "GhFHi4dTKtc", watched: false },
    ],
    exercises: [
      { id: "1", description: "Edit a simple video using free tools", completed: false },
      { id: "2", description: "Add transitions and effects to a video", completed: false },
    ],
  },

  "YouTube SEO": {
    skillName: "YouTube SEO",
    levelName: "Beginner",
    phaseName: "YouTube SEO",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "YouTube SEO Tutorial", duration: "13:20", youtubeId: "aMdYKCB2ELw", watched: false },
      { id: "2", title: "YouTube Algorithm Explained", duration: "16:45", youtubeId: "oAJnwBaSyAs", watched: false },
      { id: "3", title: "YouTube Growth Strategy", duration: "14:30", youtubeId: "XpopyNZKYKw", watched: false },
    ],
    exercises: [
      { id: "1", description: "Optimize a video title and description", completed: false },
      { id: "2", description: "Research keywords for your niche", completed: false },
    ],
  },

  "Storytelling": {
    skillName: "Storytelling",
    levelName: "Beginner",
    phaseName: "Storytelling",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Storytelling Masterclass", duration: "13:20", youtubeId: "HSoHeSjFMkk", watched: false },
      { id: "2", title: "How to Tell a Great Story", duration: "16:45", youtubeId: "oP3c1h8v2ZQ", watched: false },
      { id: "3", title: "Narrative Writing Tips", duration: "14:30", youtubeId: "sDI7EiPV3tA", watched: false },
    ],
    exercises: [
      { id: "1", description: "Write a short story with a clear arc", completed: false },
      { id: "2", description: "Practice telling a story to someone", completed: false },
    ],
  },

  "Digital Reporting": {
    skillName: "Digital Reporting",
    levelName: "Beginner",
    phaseName: "Digital Reporting",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Digital Journalism Course", duration: "13:20", youtubeId: "Jkc9HdGcTpM", watched: false },
      { id: "2", title: "Online Reporting Basics", duration: "16:45", youtubeId: "sDI7EiPV3tA", watched: false },
      { id: "3", title: "Fact Checking in Journalism", duration: "14:30", youtubeId: "HSoHeSjFMkk", watched: false },
    ],
    exercises: [
      { id: "1", description: "Write a digital news article", completed: false },
      { id: "2", description: "Practice fact-checking online content", completed: false },
    ],
  },

  // Hyphenated skill mappings for URL compatibility
  "social-media-marketing": {
    skillName: "Social Media Marketing",
    levelName: "Beginner",
    phaseName: "Social Media Marketing",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Social Media Marketing Full Course", duration: "18:30", youtubeId: "q9gag_dJubQ", watched: false },
      { id: "2", title: "Instagram Growth Strategy 2024", duration: "15:45", youtubeId: "7n7g-9Y3eVU", watched: false },
      { id: "3", title: "Facebook & Instagram Ads Tutorial", duration: "22:10", youtubeId: "_4kCmMZyJGA", watched: false },
    ],
    exercises: [
      { id: "1", description: "Analyze social media strategy of a brand", completed: false },
      { id: "2", description: "Create a content calendar for 30 days", completed: false },
    ],
  },

  "content-creation": {
    skillName: "Content Creation",
    levelName: "Beginner",
    phaseName: "Content Creation",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Content Creation Masterclass", duration: "20:15", youtubeId: "Jkc9HdGcTpM", watched: false },
      { id: "2", title: "How to Make Viral Reels", duration: "12:30", youtubeId: "7n7g-9Y3eVU", watched: false },
      { id: "3", title: "YouTube Content Strategy", duration: "16:45", youtubeId: "XpopyNZKYKw", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a content calendar for 30 days", completed: false },
      { id: "2", description: "Write and publish your first blog post", completed: false },
    ],
  },

  "communication-skills": {
    skillName: "Communication Skills",
    levelName: "Beginner",
    phaseName: "Communication Skills",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Communication Skills Training", duration: "14:20", youtubeId: "HAnw168huqA", watched: false },
      { id: "2", title: "How to Speak Confidently", duration: "11:30", youtubeId: "tShavGuo0_E", watched: false },
      { id: "3", title: "Active Listening Masterclass", duration: "13:15", youtubeId: "H0_yKBitO8M", watched: false },
    ],
    exercises: [
      { id: "1", description: "Practice active listening in a conversation", completed: false },
      { id: "2", description: "Record yourself speaking and review it", completed: false },
    ],
  },

  "accounting-principles": {
    skillName: "Accounting Principles",
    levelName: "Beginner",
    phaseName: "Accounting Principles",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Accounting Basics Full Course", duration: "25:30", youtubeId: "yYX4bvQSqbo", watched: false },
      { id: "2", title: "Financial Statements Explained", duration: "18:45", youtubeId: "uI4i_a0gOYE", watched: false },
      { id: "3", title: "Bookkeeping for Beginners", duration: "20:10", youtubeId: "4J3Gi1IhbXU", watched: false },
    ],
    exercises: [
      { id: "1", description: "Practice basic accounting equations", completed: false },
      { id: "2", description: "Create a simple balance sheet", completed: false },
    ],
  },

  "python": {
    skillName: "Python",
    levelName: "Beginner",
    phaseName: "Python Programming",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Python for Beginners Full Course", duration: "15:30", youtubeId: "kqtD5dpn9C8", watched: false },
      { id: "2", title: "Python Variables and Data Types", duration: "12:45", youtubeId: "cQT33yu9pY8", watched: false },
      { id: "3", title: "Python Control Flow", duration: "18:20", youtubeId: "DZwmZ8Usvnk", watched: false },
    ],
    exercises: [
      { id: "1", description: "Write a Hello World program", completed: false },
      { id: "2", description: "Create variables of different types", completed: false },
    ],
  },

  "web-development": {
    skillName: "Web Development",
    levelName: "Beginner",
    phaseName: "Web Development",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "HTML Full Course for Beginners", duration: "19:45", youtubeId: "pQN-pnXPaVg", watched: false },
      { id: "2", title: "CSS Tutorial for Beginners", duration: "16:30", youtubeId: "1Rs2ND1ryYc", watched: false },
      { id: "3", title: "JavaScript Basics", duration: "22:15", youtubeId: "W6NZfCO5SIk", watched: false },
    ],
    exercises: [
      { id: "1", description: "Build your first HTML page", completed: false },
      { id: "2", description: "Create a simple personal bio page", completed: false },
    ],
  },

  "digital-marketing": {
    skillName: "Digital Marketing",
    levelName: "Beginner",
    phaseName: "Digital Marketing",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Digital Marketing Full Course", duration: "24:30", youtubeId: "nU-IIXBWlS4", watched: false },
      { id: "2", title: "SEO Tutorial for Beginners", duration: "18:15", youtubeId: "xsVTqzratPs", watched: false },
      { id: "3", title: "Google Ads Tutorial", duration: "20:45", youtubeId: "lD3PzWBJ7k4", watched: false },
    ],
    exercises: [
      { id: "1", description: "Analyze the marketing funnel of a brand", completed: false },
      { id: "2", description: "Create a simple customer journey map", completed: false },
    ],
  },

  "graphic-design": {
    skillName: "Graphic Design",
    levelName: "Beginner",
    phaseName: "Graphic Design",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Graphic Design Full Course", duration: "16:20", youtubeId: "9QTCvayLhCA", watched: false },
      { id: "2", title: "Canva Tutorial for Beginners", duration: "14:30", youtubeId: "DHBBbfMoFbE", watched: false },
      { id: "3", title: "Color Theory for Designers", duration: "12:15", youtubeId: "AvgCkHrcj90", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a mood board for a brand", completed: false },
      { id: "2", description: "Practice color palette creation in Canva", completed: false },
    ],
  },

  "ui-ux-design": {
    skillName: "UI/UX Design",
    levelName: "Beginner",
    phaseName: "UI/UX Design",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "UI UX Design Full Course", duration: "20:30", youtubeId: "5CxXhyhT6Fc", watched: false },
      { id: "2", title: "Figma Tutorial for Beginners", duration: "25:15", youtubeId: "FTFaQWZBqQ8", watched: false },
      { id: "3", title: "Design Thinking Process", duration: "16:45", youtubeId: "a7sEoEvT8l8", watched: false },
    ],
    exercises: [
      { id: "1", description: "Create a free Figma account and explore", completed: false },
      { id: "2", description: "Sketch wireframes for a simple app by hand", completed: false },
    ],
  },

  "data-science": {
    skillName: "Data Science",
    levelName: "Beginner",
    phaseName: "Data Science",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Data Science Full Course", duration: "28:30", youtubeId: "ua-CiDNNj30", watched: false },
      { id: "2", title: "Statistics for Data Science", duration: "22:15", youtubeId: "xxpc-HPKN28", watched: false },
      { id: "3", title: "Excel for Data Analysis", duration: "18:45", youtubeId: "PSNXoAs2FtQ", watched: false },
    ],
    exercises: [
      { id: "1", description: "Install Python and Jupyter Notebook", completed: false },
      { id: "2", description: "Practice basic Python operations in Jupyter", completed: false },
    ],
  },

  "machine-learning": {
    skillName: "Machine Learning",
    levelName: "Beginner",
    phaseName: "Machine Learning",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Machine Learning for Beginners", duration: "24:20", youtubeId: "NWONeJKn6kc", watched: false },
      { id: "2", title: "ML Algorithms Explained", duration: "19:30", youtubeId: "OGxgnH8y2NM", watched: false },
      { id: "3", title: "Python for Machine Learning", duration: "22:15", youtubeId: "7eh4d6sabA0", watched: false },
    ],
    exercises: [
      { id: "1", description: "Identify real-world ML applications", completed: false },
      { id: "2", description: "Practice with a simple classification dataset", completed: false },
    ],
  },

  "cybersecurity": {
    skillName: "Cybersecurity",
    levelName: "Beginner",
    phaseName: "Cybersecurity",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Cybersecurity Full Course", duration: "26:30", youtubeId: "hXSFdwIOfnE", watched: false },
      { id: "2", title: "Ethical Hacking Basics", duration: "20:15", youtubeId: "aU5uMqniukA", watched: false },
      { id: "3", title: "Network Security Fundamentals", duration: "18:45", youtubeId: "E03gh1huvW4", watched: false },
    ],
    exercises: [
      { id: "1", description: "Research and list 5 recent cyber attacks from news", completed: false },
      { id: "2", description: "Identify security vulnerabilities in a sample scenario", completed: false },
    ],
  },

  "public-speaking": {
    skillName: "Public Speaking",
    levelName: "Beginner",
    phaseName: "Public Speaking",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "Public Speaking Full Course", duration: "16:20", youtubeId: "tUqzMkKqVNY", watched: false },
      { id: "2", title: "Overcome Stage Fear", duration: "12:30", youtubeId: "KIMsHKjMmLY", watched: false },
      { id: "3", title: "TED Talk Secrets", duration: "14:15", youtubeId: "Unzc731iCUY", watched: false },
    ],
    exercises: [
      { id: "1", description: "Write and practice a 3-minute speech", completed: false },
      { id: "2", description: "Record yourself and identify improvements", completed: false },
    ],
  },

  "interview-preparation": {
    skillName: "Interview Preparation",
    levelName: "Beginner",
    phaseName: "Interview Preparation",
    phaseNumber: 1,
    videos: [
      { id: "1", title: "How to Crack Job Interviews", duration: "18:30", youtubeId: "KIwVQ5XLKVA", watched: false },
      { id: "2", title: "Common Interview Questions", duration: "15:45", youtubeId: "1mHjMNZZvFo", watched: false },
      { id: "3", title: "Body Language in Interviews", duration: "12:20", youtubeId: "PCWVi5pAa30", watched: false },
    ],
    exercises: [
      { id: "1", description: "Prepare answers for 10 common interview questions", completed: false },
      { id: "2", description: "Practice mock interview with a friend", completed: false },
    ],
  },
};

// Function to get videos for a skill
export function getVideosForSkill(skillName: string, level: string = "Beginner", phase: number = 1): SkillVideos {
  // Normalize skill name for matching - convert to lowercase and replace spaces with hyphens
  const normalizedSkill = skillName.trim().toLowerCase().replace(/\s+/g, '-');
  
  // Try to find exact match with hyphens
  const exactMatch = Object.keys(SKILL_VIDEO_MAPPING).find(
    key => key.toLowerCase().replace(/\s+/g, '-') === normalizedSkill
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
  
  // Try exact match without hyphens
  const exactMatchNoHyphen = Object.keys(SKILL_VIDEO_MAPPING).find(
    key => key.toLowerCase() === normalizedSkill
  );
  
  if (exactMatchNoHyphen) {
    const mapping = SKILL_VIDEO_MAPPING[exactMatchNoHyphen];
    return {
      ...mapping,
      levelName: level,
      phaseNumber: phase,
      phaseName: mapping.phaseName,
    };
  }
  
  // Try partial match
  const partialMatch = Object.keys(SKILL_VIDEO_MAPPING).find(
    key => normalizedSkill.includes(key.toLowerCase().replace(/\s+/g, '-')) || 
           key.toLowerCase().replace(/\s+/g, '-').includes(normalizedSkill)
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
  
  // Generic fallback with skill name in title - using communication skill videos (NOT Python)
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
        youtubeId: "HAnw168huqA", // Communication Skills video as fallback (NOT Python)
        watched: false 
      },
      { 
        id: "2", 
        title: `${skillName} Fundamentals`, 
        duration: "18:00", 
        youtubeId: "tShavGuo0_E", // Communication Skills video as fallback (NOT Python)
        watched: false 
      },
      { 
        id: "3", 
        title: `Getting Started with ${skillName}`, 
        duration: "20:00", 
        youtubeId: "H0_yKBitO8M", // Communication Skills video as fallback (NOT Python)
        watched: false 
      },
    ],
    exercises: [
      { id: "1", description: `Complete the introduction tutorial for ${skillName}`, completed: false },
      { id: "2", description: `Practice basic concepts of ${skillName}`, completed: false },
    ],
  };
}
