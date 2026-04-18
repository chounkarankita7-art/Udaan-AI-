import { useState } from "react";
import { useLocation } from "wouter";
import { StarField } from "@/components/StarField";
import { getStoredStudent } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { setAssessmentSnapshot, type AssessmentDraft, type ChatMessage } from "@/lib/assessment-draft";
import logoPath from "/logo.png";

type Answer = string;
type QuestionStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | "complete";

interface QuestionData {
  question: string;
  options: string[];
  isFreeText: boolean;
}

// Q1: Fixed goal question
const Q1: QuestionData = {
  question: "What's your main goal right now?",
  options: ["Get a Job", "Freelancing", "Start a Business", "Upskilling"],
  isFreeText: false,
};

// Q2: Depends on Q1 answer
function getQ2(q1Answer: string): QuestionData {
  if (q1Answer === "Get a Job") {
    return {
      question: "What kind of role are you targeting?",
      options: ["Software Developer", "Data Analyst", "UI/UX Designer", "Digital Marketer", "Other"],
      isFreeText: false,
    };
  } else if (q1Answer === "Freelancing") {
    return {
      question: "What service do you want to offer?",
      options: ["Web Development", "Graphic Design", "Content Writing", "Video Editing", "Other"],
      isFreeText: false,
    };
  } else if (q1Answer === "Start a Business") {
    return {
      question: "What kind of business are you thinking about?",
      options: ["Tech Startup", "E-commerce", "Service Business", "Content/Media", "Not sure yet"],
      isFreeText: false,
    };
  } else {
    // Upskilling
    return {
      question: "What area do you want to grow in?",
      options: ["Tech & Coding", "Soft Skills", "Business Skills", "Design & Creative", "AI & Data Science"],
      isFreeText: false,
    };
  }
}

// Q3: Depends on Q1 + Q2 answers
function getQ3(q1Answer: string, q2Answer: string): QuestionData {
  // Job paths
  if (q1Answer === "Get a Job") {
    if (q2Answer === "Software Developer") {
      return {
        question: "Which tech area interests you?",
        options: ["Web Development", "Mobile Apps", "AI/ML", "Backend", "Full Stack"],
        isFreeText: false,
      };
    } else if (q2Answer === "Data Analyst") {
      return {
        question: "Which tool do you want to master?",
        options: ["Excel & SQL", "Python", "Power BI", "Tableau", "All of them"],
        isFreeText: false,
      };
    } else if (q2Answer === "UI/UX Designer") {
      return {
        question: "Which design tool do you prefer?",
        options: ["Figma", "Adobe XD", "Sketch", "Just starting out"],
        isFreeText: false,
      };
    } else if (q2Answer === "Digital Marketer") {
      return {
        question: "Which area of marketing?",
        options: ["Social Media", "SEO", "Paid Ads", "Content Marketing", "Email Marketing"],
        isFreeText: false,
      };
    }
  }
  // Freelancing paths
  else if (q1Answer === "Freelancing") {
    if (q2Answer === "Web Development") {
      return {
        question: "What type of websites do you want to build?",
        options: ["Business Websites", "E-commerce", "Web Apps", "Landing Pages"],
        isFreeText: false,
      };
    } else if (q2Answer === "Graphic Design") {
      return {
        question: "What design work interests you?",
        options: ["Logo & Branding", "Social Media Posts", "UI Design", "Print Design"],
        isFreeText: false,
      };
    } else if (q2Answer === "Content Writing") {
      return {
        question: "What type of content?",
        options: ["Blogs & Articles", "Copywriting", "Social Media", "Technical Writing"],
        isFreeText: false,
      };
    } else if (q2Answer === "Video Editing") {
      return {
        question: "What kind of videos?",
        options: ["YouTube Videos", "Reels & Shorts", "Corporate Videos", "Ads & Promos"],
        isFreeText: false,
      };
    }
  }
  // Business paths
  else if (q1Answer === "Start a Business") {
    if (q2Answer === "Tech Startup") {
      return {
        question: "What kind of tech product?",
        options: ["Mobile App", "Web Platform", "AI Tool", "SaaS Product"],
        isFreeText: false,
      };
    } else if (q2Answer === "E-commerce") {
      return {
        question: "What do you want to sell?",
        options: ["Physical Products", "Digital Products", "Dropshipping", "Handmade Items"],
        isFreeText: false,
      };
    }
  }
  // Upskilling paths
  else if (q1Answer === "Upskilling") {
    if (q2Answer === "Tech & Coding") {
      return {
        question: "Which skill do you want to master?",
        options: ["Python", "Web Dev", "AI & ML", "App Development", "Data Science"],
        isFreeText: false,
      };
    } else if (q2Answer === "Soft Skills") {
      return {
        question: "Which soft skill?",
        options: ["Communication", "Leadership", "Public Speaking", "Time Management", "Problem Solving"],
        isFreeText: false,
      };
    } else if (q2Answer === "Business Skills") {
      return {
        question: "Which business skill?",
        options: ["Finance & Accounting", "Marketing", "Sales", "Entrepreneurship", "Management"],
        isFreeText: false,
      };
    } else if (q2Answer === "Design & Creative") {
      return {
        question: "Which design skill?",
        options: ["UI/UX Design", "Graphic Design", "Video Editing", "Photography", "Animation"],
        isFreeText: false,
      };
    } else if (q2Answer === "AI & Data Science") {
      return {
        question: "Which AI skill?",
        options: ["Machine Learning", "Data Analysis", "ChatGPT & AI Tools", "Computer Vision", "NLP"],
        isFreeText: false,
      };
    }
  }

  // Fallback for "Other" options
  return {
    question: "Tell me more about what you want to achieve",
    options: ["I'll explain in detail"],
    isFreeText: true,
  };
}

// Q4: Previous learning experience
const Q4: QuestionData = {
  question: "Have you tried learning this before?",
  options: ["Never started", "Tried but gave up", "Done some tutorials", "Have basic knowledge"],
  isFreeText: false,
};

// Q5: Biggest challenge
const Q5: QuestionData = {
  question: "What's your biggest challenge in learning?",
  options: ["No proper guidance", "Lack of motivation", "Too much theory no practice", "Don't know where to start", "No time management"],
  isFreeText: false,
};

// Q6: Daily time
const Q6: QuestionData = {
  question: "How much time can you give daily?",
  options: ["30 Minutes", "1 Hour", "2 Hours", "3+ Hours"],
  isFreeText: false,
};

// Q7: Extra skills
const Q7: QuestionData = {
  question: "Any specific skills you want to add?",
  options: [],
  isFreeText: true,
};

function parseTimeToMinutes(timeString: string): number {
  if (!timeString) return 60;
  const lower = timeString.toLowerCase();
  if (lower.includes("30 minutes")) return 30;
  if (lower.includes("1 hour")) return 60;
  if (lower.includes("2 hours")) return 120;
  if (lower.includes("3+ hours") || lower.includes("3 hours")) return 180;
  return 60;
}

// Goal-based skill filter mapping
const ALL_SKILLS = [
  { icon: "🐍", name: "Python", description: "The most beginner friendly programming language. Used in AI, data science, automation and web development. One of the highest paying skills in tech." },
  { icon: "🌐", name: "Web Development", description: "Build websites and web apps from scratch. Combines HTML, CSS and JavaScript. High demand skill for jobs and freelancing." },
  { icon: "🤖", name: "AI/ML", description: "Teach computers to think and learn. Used in ChatGPT, recommendation systems, self driving cars. The hottest field in tech right now." },
  { icon: "📊", name: "Data Science", description: "Extract insights from data to help businesses make decisions. Combines statistics, programming and visualization." },
  { icon: "🎨", name: "UI/UX Design", description: "Design beautiful and easy to use digital products. Bridge between users and technology. High demand in both jobs and freelancing." },
  { icon: "📱", name: "App Development", description: "Build apps for Android and iOS. Used by billions of people daily. Great for jobs, freelancing and your own startup." },
  { icon: "✏️", name: "Graphic Design", description: "Create visual content for brands, social media and marketing. Creative skill with high freelancing demand." },
  { icon: "📢", name: "Digital Marketing", description: "Promote businesses online through social media, SEO and ads. Every business needs this skill today." },
  { icon: "💬", name: "Soft Skills - Communication", description: "The ability to express ideas clearly and confidently. Most in-demand skill by every employer globally." },
  { icon: "👥", name: "Soft Skills - Leadership", description: "Inspire and guide teams to achieve goals. Essential for career growth and entrepreneurship." },
  { icon: "🎤", name: "Public Speaking", description: "Present ideas confidently in front of any audience. Transforms your career and personal brand." },
  { icon: "🔒", name: "Cybersecurity", description: "Protect systems and data from hackers and threats. One of the fastest growing and highest paying fields in tech." },
  { icon: "📈", name: "Excel & Data Analysis", description: "Master spreadsheets and data tools used by every business. Quick to learn, immediately useful." },
];

function getSkillsForGoal(goal: string): typeof ALL_SKILLS {
  const goalLower = goal.toLowerCase();
  
  if (goalLower.includes("get a job")) {
    return ALL_SKILLS.filter(skill => 
      ["Python", "Web Development", "Data Science", "Soft Skills - Communication", "Soft Skills - Leadership", "Cybersecurity"].includes(skill.name)
    );
  }
  
  if (goalLower.includes("freelancing")) {
    return ALL_SKILLS.filter(skill => 
      ["Web Development", "Graphic Design", "Digital Marketing", "UI/UX Design", "App Development"].includes(skill.name)
    );
  }
  
  if (goalLower.includes("start a business")) {
    return ALL_SKILLS.filter(skill => 
      ["Digital Marketing", "Soft Skills - Leadership", "Public Speaking", "Graphic Design", "Web Development"].includes(skill.name)
    );
  }
  
  // Default: Upskilling or other - show all skills
  return ALL_SKILLS;
}

function normalizeDraft(raw: unknown): AssessmentDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const d = raw as Record<string, unknown>;
  const profile = d.profile as Record<string, unknown> | undefined;
  if (!profile) return null;
  const skillLevel = profile.skillLevel;
  const sl =
    skillLevel === "beginner" || skillLevel === "intermediate" || skillLevel === "advanced" ? skillLevel : null;
  return {
    hasEnoughInfo: Boolean(d.hasEnoughInfo),
    profile: {
      goal: typeof profile.goal === "string" ? profile.goal : null,
      field: typeof profile.field === "string" ? profile.field : null,
      skillLevel: sl,
      timePerDayMinutes: typeof profile.timePerDayMinutes === "number" ? profile.timePerDayMinutes : null,
      timelineWeeks: typeof profile.timelineWeeks === "number" ? profile.timelineWeeks : null,
      extraSkills: Array.isArray(profile.extraSkills) ? (profile.extraSkills as string[]).filter(Boolean) : [],
      interests: Array.isArray(profile.interests) ? (profile.interests as string[]).filter(Boolean) : [],
    },
    draftSummary: typeof d.draftSummary === "string" ? d.draftSummary : null,
  };
}

export function AssessmentChat() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const student = getStoredStudent();

  const [step, setStep] = useState<QuestionStep>(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [customAnswer, setCustomAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  if (!student) {
    setLocation("/signup");
    return null;
  }

  // Get current question based on step and previous answers
  function getCurrentQuestion(): QuestionData {
    if (step === 1) return Q1;
    if (step === 2) return getQ2(answers[0]);
    if (step === 3) return getQ3(answers[0], answers[1]);
    if (step === 4) return Q4;
    if (step === 5) return Q5;
    if (step === 6) return Q6;
    if (step === 7) return Q7;
    return Q7;
  }

  const currentQuestion = getCurrentQuestion();

  function handleAnswer(answer: string) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
      if (typeof step === "number" && step < 7) {
        setStep((step + 1) as QuestionStep);
      } else {
        // All questions answered, show skills preview
        const matchedSkills = getSkillsForGoal(newAnswers[0] || "").map(s => s.name);
        setSelectedSkills(matchedSkills);
        setStep("complete");
      }
    }, 300);
  }

  function handleSkip() {
    handleAnswer("Skipped");
  }

  async function generateRoadmap(finalAnswers: Answer[]) {
    setLoading(true);
    try {
      const res = await fetch("/api/assessment/extract-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationHistory: buildConversationHistory(finalAnswers) }),
      });
      if (!res.ok) throw new Error((await res.text()) || "API error");
      const data = await res.json();
      
      const draft = normalizeDraft(data.draft);
      if (!draft) throw new Error("Invalid draft");
      
      // Override extracted interests with the selected skills from the UI
      draft.profile.interests = [...selectedSkills];
      const userExtra = finalAnswers[6] !== "Skipped" && finalAnswers[6] ? finalAnswers[6] : null;
      if (userExtra && !draft.profile.interests.includes(userExtra)) {
        draft.profile.interests.push(userExtra);
      }
      
      const messages: ChatMessage[] = buildConversationHistory(finalAnswers).map(h => ({
        role: "assistant" as const,
        content: h.question
      })).flatMap((msg, i) => [
        msg,
        { role: "user" as const, content: finalAnswers[i] }
      ]);
      
      setAssessmentSnapshot({ messages, draft, updatedAt: Date.now() });
      toast({ title: "Nice — let's confirm your roadmap" });
      setLocation("/assessment/confirm");
    } catch (error) {
      // Fallback to mock draft
      const userExtra = finalAnswers[6] !== "Skipped" && finalAnswers[6] ? finalAnswers[6] : null;
      const mockInterests = [...selectedSkills];
      if (userExtra && !mockInterests.includes(userExtra)) {
        mockInterests.push(userExtra);
      }
      
      const mockDraft: AssessmentDraft = {
        hasEnoughInfo: true,
        profile: {
          goal: finalAnswers[0] || "Get a Job",
          field: finalAnswers[1] || "Tech",
          skillLevel: "beginner",
          timePerDayMinutes: parseTimeToMinutes(finalAnswers[5]) || 60,
          timelineWeeks: 12,
          extraSkills: [],
          interests: mockInterests
        },
        draftSummary: "Assessment completed"
      };
      const messages: ChatMessage[] = buildConversationHistory(finalAnswers).map(h => ({
        role: "assistant" as const,
        content: h.question
      })).flatMap((msg, i) => [
        msg,
        { role: "user" as const, content: finalAnswers[i] }
      ]);
      setAssessmentSnapshot({ messages, draft: mockDraft, updatedAt: Date.now() });
      toast({ title: "Roadmap generated" });
      setLocation("/assessment/confirm");
    } finally {
      setLoading(false);
    }
  }

  function buildConversationHistory(ans: Answer[]): { question: string; answer: string }[] {
    const history: { question: string; answer: string }[] = [];
    if (ans[0]) history.push({ question: Q1.question, answer: ans[0] });
    if (ans[1]) history.push({ question: getQ2(ans[0]).question, answer: ans[1] });
    if (ans[2]) history.push({ question: getQ3(ans[0], ans[1]).question, answer: ans[2] });
    if (ans[3]) history.push({ question: Q4.question, answer: ans[3] });
    if (ans[4]) history.push({ question: Q5.question, answer: ans[4] });
    if (ans[5]) history.push({ question: Q6.question, answer: ans[5] });
    if (ans[6]) history.push({ question: Q7.question, answer: ans[6] });
    return history;
  }

  const pageBg = "linear-gradient(135deg, #050511 0%, #0d0d2b 60%, #050511 100%)";
  const cardBg = "rgba(13,10,40,0.85)";

  // Get filtered skills based on user's goal
  const filteredSkills = answers[0] ? getSkillsForGoal(answers[0]) : ALL_SKILLS;

  return (
    <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
      <StarField />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img
            src={logoPath}
            alt="Udaan AI"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "contain",
              filter: "brightness(0) invert(1) drop-shadow(0 0 6px rgba(245,158,11,0.5))",
              marginBottom: "0.5rem",
            }}
          />
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "white", marginBottom: "0.2rem" }}>AI Assessment</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem" }}>Let's build your personalized learning path</p>
        </div>

        {answers.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1rem" }}>
            {answers.map((answer, i) => {
              const q = i === 0 ? Q1 : i === 1 ? getQ2(answers[0]) : i === 2 ? getQ3(answers[0], answers[1]) : i === 3 ? Q4 : i === 4 ? Q5 : i === 5 ? Q6 : Q7;
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0.35rem",
                    background: "rgba(76,53,200,0.08)",
                    border: "1px solid rgba(76,53,200,0.22)",
                    borderRadius: "14px",
                    padding: "0.65rem 0.75rem",
                  }}
                >
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", fontWeight: 700 }}>{q.question}</p>
                  <p style={{ margin: 0, color: "#ddd6fe", fontSize: "0.88rem" }}>{answer}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Skills Preview Screen */}
        {step === "complete" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Your Learning Path</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Based on your goals, you'll be learning these skills</p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2rem", maxHeight: "60vh", overflowY: "auto" }}>
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill.name);
                return (
                  <div
                    key={skill.name}
                    onClick={() => {
                      setSelectedSkills(prev => 
                        prev.includes(skill.name) 
                          ? prev.filter(s => s !== skill.name)
                          : [...prev, skill.name]
                      );
                    }}
                    style={{
                      background: isSelected ? "rgba(76,53,200,0.2)" : cardBg,
                      border: isSelected ? "2px solid #9333ea" : "1px solid rgba(76,53,200,0.28)",
                      borderRadius: "16px",
                      padding: "1.25rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      position: "relative",
                      opacity: isSelected ? 1 : 0.65,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(76,53,200,0.2)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.opacity = isSelected ? "1" : "0.65";
                    }}
                  >
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "24px", height: "24px", borderRadius: "50%", border: isSelected ? "none" : "2px solid rgba(255,255,255,0.2)", background: isSelected ? "#9333ea" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {isSelected && <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>✓</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "2rem" }}>{skill.icon}</span>
                      <h3 style={{ color: "white", fontSize: "1rem", fontWeight: 700, margin: 0, paddingRight: "1.5rem" }}>{skill.name}</h3>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>{skill.description}</p>
                  </div>
                );
              })}
            </div>
            
            <button
              type="button"
              disabled={loading}
              onClick={() => void generateRoadmap(answers)}
              style={{
                width: "100%",
                padding: "1rem",
                border: "none",
                borderRadius: "12px",
                background: loading ? "rgba(76,53,200,0.35)" : "linear-gradient(135deg, #4c35c8, #9333ea)",
                color: "white",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: loading ? "wait" : "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "linear-gradient(135deg, #9333ea, #4c35c8)";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "linear-gradient(135deg, #4c35c8, #9333ea)";
              }}
            >
              {loading ? "Generating Roadmap..." : "Looks Great! Build My Roadmap →"}
            </button>
          </div>
        )}

        {/* Question Card */}
        {step !== "complete" && (
        <div
          style={{
            background: cardBg,
            border: "1px solid rgba(76,53,200,0.28)",
            borderRadius: "18px",
            padding: "1rem",
            boxShadow: "0 0 40px rgba(76,53,200,0.1)",
            opacity: animate ? 0.5 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <p style={{ color: "white", fontWeight: 800, fontSize: "1.02rem", lineHeight: 1.5, marginTop: 0 }}>{currentQuestion.question}</p>

          {!currentQuestion.isFreeText && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
              {currentQuestion.options.map(option => (
                <button
                  key={option}
                  type="button"
                  disabled={loading || animate}
                  onClick={() => handleAnswer(option)}
                  style={{
                    border: "1px solid rgba(76,53,200,0.45)",
                    borderRadius: "12px",
                    padding: "0.65rem 0.7rem",
                    color: "white",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, rgba(76,53,200,0.7), rgba(147,51,234,0.55))",
                    cursor: loading || animate ? "wait" : "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.86rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(147,51,234,0.8), rgba(76,53,200,0.7))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(76,53,200,0.7), rgba(147,51,234,0.55))";
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.isFreeText && (
            <>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", margin: "0 0 0.35rem" }}>Type your answer or skip</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <input
                  value={customAnswer}
                  onChange={e => setCustomAnswer(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && customAnswer.trim() && handleAnswer(customAnswer)}
                  placeholder="Your answer…"
                  disabled={loading || animate}
                  style={{
                    flex: "1 1 200px",
                    padding: "0.7rem 0.85rem",
                    background: "rgba(76,53,200,0.1)",
                    border: "1px solid rgba(76,53,200,0.35)",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                />
                <button
                  type="button"
                  disabled={loading || animate || !customAnswer.trim()}
                  onClick={() => handleAnswer(customAnswer)}
                  style={{
                    padding: "0.7rem 1rem",
                    border: "none",
                    borderRadius: "12px",
                    background: loading || animate || !customAnswer.trim() ? "rgba(76,53,200,0.35)" : "linear-gradient(135deg, #4c35c8, #9333ea)",
                    color: "white",
                    fontWeight: 800,
                    cursor: loading || animate || !customAnswer.trim() ? "wait" : "pointer",
                  }}
                >
                  {loading ? "Processing…" : "Send"}
                </button>
                <button
                  type="button"
                  disabled={loading || animate}
                  onClick={handleSkip}
                  style={{
                    padding: "0.7rem 1rem",
                    border: "1px solid rgba(76,53,200,0.45)",
                    borderRadius: "12px",
                    background: "transparent",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 700,
                    cursor: loading || animate ? "wait" : "pointer",
                  }}
                >
                  Skip
                </button>
              </div>
            </>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
