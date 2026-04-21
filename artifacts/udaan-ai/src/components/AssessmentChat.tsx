import { useState } from "react";
import { useLocation } from "wouter";
import { StarField } from "@/components/StarField";
import { getStoredStudent } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { setAssessmentSnapshot, type AssessmentDraft, type ChatMessage } from "@/lib/assessment-draft";
import {
  getNextQuestion,
  mapSkillsFromConversation,
  type QuestionData,
  type AnswerHistory,
  type QuestionStep,
} from "@/lib/assessment-questions";
import logoPath from "/logo.png";

// Skill descriptions mapping
function getSkillDescription(skill: string): string {
  const skillLower = skill.toLowerCase();
  
  if (skillLower.includes("python")) return "The most beginner friendly programming language. Used in AI, data science and automation.";
  if (skillLower.includes("data structures")) return "The foundation of programming. Essential for coding interviews and efficient code.";
  if (skillLower.includes("web development")) return "Build websites and web applications. Most in-demand tech skill globally.";
  if (skillLower.includes("system design")) return "Design large-scale systems. Required for senior engineering roles at big tech companies.";
  if (skillLower.includes("git")) return "Track and manage your code changes professionally. Used by every developer in the world.";
  if (skillLower.includes("interview prep")) return "Prepare for technical interviews with practice problems and mock interviews.";
  if (skillLower.includes("statistics")) return "The mathematical foundation of data science and AI. Essential for understanding how ML models work.";
  if (skillLower.includes("pandas") || skillLower.includes("numpy")) return "Python libraries for data manipulation and analysis. Core tools for data science.";
  if (skillLower.includes("data visualization")) return "Turn complex data into clear charts and graphs. Critical for communicating insights.";
  if (skillLower.includes("machine learning")) return "Teach computers to learn from data. Powers ChatGPT, Netflix recommendations and self driving cars.";
  if (skillLower.includes("sql")) return "Query and manage databases used by every company. Essential skill for data and backend roles.";
  if (skillLower.includes("bioinformatics")) return "Combine biology and computer science. Analyze biological data using computational methods.";
  if (skillLower.includes("healthcare data")) return "Work with medical data and health records. Growing field with high demand.";
  if (skillLower.includes("excel")) return "Master the world's most used data tool. Every business runs on Excel and spreadsheets.";
  if (skillLower.includes("medical terminology")) return "Understand medical language and terminology. Essential for healthcare careers.";
  if (skillLower.includes("research methods")) return "Learn scientific research methodology. Critical for academic and research careers.";
  if (skillLower.includes("biology advanced")) return "Advanced biology concepts for medical and biotech careers.";
  if (skillLower.includes("chemistry advanced")) return "Advanced chemistry for medical and NEET preparation.";
  if (skillLower.includes("physics for neet")) return "Physics concepts specifically for NEET medical entrance exam.";
  if (skillLower.includes("neet mock tests")) return "Practice tests for NEET medical entrance exam preparation.";
  if (skillLower.includes("study techniques")) return "Effective study methods and exam preparation strategies.";
  if (skillLower.includes("accounting")) return "Financial accounting principles. Foundation for finance and business careers.";
  if (skillLower.includes("taxation")) return "Understand tax laws and compliance. Essential for accounting and finance roles.";
  if (skillLower.includes("financial statements")) return "Analyze company financial reports. Core skill for finance professionals.";
  if (skillLower.includes("tally")) return "Popular accounting software used by small businesses in India.";
  if (skillLower.includes("business laws")) return "Legal framework for businesses. Important for entrepreneurs and managers.";
  if (skillLower.includes("ca foundation")) return "Prepare for Chartered Accountancy foundation exam.";
  if (skillLower.includes("stock market")) return "Understand how stock markets work. Foundation for investing and trading careers.";
  if (skillLower.includes("technical analysis")) return "Analyze stock price patterns and trends. Used by traders and investors.";
  if (skillLower.includes("fundamental analysis")) return "Evaluate company financials to make investment decisions.";
  if (skillLower.includes("trading psychology")) return "Mindset and discipline required for successful trading.";
  if (skillLower.includes("portfolio management")) return "Manage investment portfolios. Essential for wealth management careers.";
  if (skillLower.includes("social media marketing")) return "Grow brands on social media platforms. Most in-demand marketing skill.";
  if (skillLower.includes("content creation")) return "Create engaging content for social media and marketing.";
  if (skillLower.includes("seo")) return "Get websites to rank on Google without paying for ads. Long term free traffic.";
  if (skillLower.includes("google analytics")) return "Track and analyze website traffic. Essential for digital marketing.";
  if (skillLower.includes("canva")) return "Create professional graphics without design experience. Most popular design tool.";
  if (skillLower.includes("email marketing")) return "Build and nurture email lists. Best ROI marketing channel.";
  if (skillLower.includes("writing")) return "Professional writing skills for content, copywriting and journalism.";
  if (skillLower.includes("journalism ethics")) return "Ethical standards for journalism and media reporting.";
  if (skillLower.includes("digital reporting")) return "Modern digital journalism techniques and tools.";
  if (skillLower.includes("video journalism")) return "Video reporting and storytelling for digital platforms.";
  if (skillLower.includes("seo for content")) return "Optimize content for search engines. Critical for content visibility.";
  if (skillLower.includes("design principles")) return "Fundamental design principles. Foundation for any design career.";
  if (skillLower.includes("figma")) return "Industry standard tool for UI/UX design. Used by top tech companies.";
  if (skillLower.includes("ui design")) return "Design user interfaces for apps and websites. Core UI/UX skill.";
  if (skillLower.includes("ux research")) return "Understand user needs and behaviors. Critical for product design.";
  if (skillLower.includes("portfolio building")) return "Create professional portfolios to showcase your work.";
  if (skillLower.includes("user research methods")) return "Methods for researching user needs and behaviors.";
  if (skillLower.includes("usability testing")) return "Test how users interact with products. Essential for UX design.";
  if (skillLower.includes("survey design")) return "Create effective surveys for research and feedback.";
  if (skillLower.includes("data analysis basics")) return "Basic data analysis skills for research and decision making.";
  if (skillLower.includes("ux writing")) return "Writing for user interfaces and user experience.";
  if (skillLower.includes("dsa")) return "Data Structures and Algorithms. Essential for coding interviews.";
  if (skillLower.includes("java") || skillLower.includes("python")) return "Popular programming languages used in tech companies.";
  if (skillLower.includes("programming basics")) return "Foundation of programming. Learn to think like a developer.";
  if (skillLower.includes("data science intro")) return "Introduction to data science concepts and tools.";
  if (skillLower.includes("specialization")) return "Choose a specialized field to master for career growth.";
  if (skillLower.includes("portfolio projects")) return "Build real projects to showcase your skills to employers.";
  if (skillLower.includes("social media strategy")) return "Strategic planning for social media marketing and growth.";
  if (skillLower.includes("performance marketing")) return "Paid advertising on social media and search engines.";
  if (skillLower.includes("analytics")) return "Marketing analytics and measurement. Track campaign performance.";
  if (skillLower.includes("brand management")) return "Build and manage brand identity and reputation.";
  if (skillLower.includes("python advanced")) return "Advanced Python concepts for professional development.";
  if (skillLower.includes("deep learning")) return "Neural networks and advanced AI techniques.";
  if (skillLower.includes("nlp")) return "Natural Language Processing for AI applications.";
  if (skillLower.includes("mlops")) return "Machine Learning Operations. Deploy and manage ML models in production.";
  if (skillLower.includes("ai project building")) return "Build real AI projects to demonstrate your skills.";
  if (skillLower.includes("digital skills basics")) return "Foundation digital skills for modern careers.";
  if (skillLower.includes("ms office")) return "Microsoft Office suite for productivity and business.";
  if (skillLower.includes("freelancing skills")) return "Skills needed to succeed as a freelancer.";
  if (skillLower.includes("communication skills")) return "Professional communication for career success.";
  if (skillLower.includes("problem solving")) return "Critical thinking and problem-solving techniques.";
  if (skillLower.includes("project building")) return "Build real projects to demonstrate your skills.";
  
  return "Develop this skill to advance your career and achieve your goals.";
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

  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);
  const [customAnswer, setCustomAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  if (!student) {
    setLocation("/signup");
    return null;
  }

  const currentQuestion = getNextQuestion(answerHistory);
  const isComplete = currentQuestion === null;

  function handleAnswer(answer: string) {
    const newHistory: AnswerHistory[] = [
      ...answerHistory,
      {
        question: currentQuestion?.question || "",
        answer,
        questionIndex: answerHistory.length,
      },
    ];
    setAnswerHistory(newHistory);
    setAnimate(true);
    setSlideDirection("left");

    setTimeout(() => {
      setAnimate(false);
      const nextQ = getNextQuestion(newHistory);
      if (nextQ === null) {
        // Assessment complete, show skills preview
        const matchedSkills = mapSkillsFromConversation(newHistory);
        setSelectedSkills(matchedSkills);
      }
    }, 300);
  }

  function handleBack() {
    if (answerHistory.length === 0) return;
    const newHistory = answerHistory.slice(0, -1);
    setAnswerHistory(newHistory);
    setAnimate(true);
    setSlideDirection("right");

    setTimeout(() => {
      setAnimate(false);
    }, 300);
  }

  function handleSkip() {
    handleAnswer("Skipped");
  }

  async function generateRoadmap(finalHistory: AnswerHistory[]) {
    setLoading(true);
    try {
      const conversationHistory = finalHistory.map(h => ({
        question: h.question,
        answer: h.answer,
      }));

      const res = await fetch("/api/assessment/extract-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationHistory }),
      });
      if (!res.ok) throw new Error((await res.text()) || "API error");
      const data = await res.json();
      
      const draft = normalizeDraft(data.draft);
      if (!draft) throw new Error("Invalid draft");
      
      // Override extracted interests with the selected skills from the UI
      draft.profile.interests = [...selectedSkills];
      
      // Add any extra skills from the last free text answer
      const lastAnswer = finalHistory[finalHistory.length - 1]?.answer;
      if (lastAnswer && lastAnswer !== "Skipped" && !draft.profile.interests.includes(lastAnswer)) {
        draft.profile.interests.push(lastAnswer);
      }

      const messages: ChatMessage[] = conversationHistory.flatMap((h, i) => [
        { role: "assistant" as const, content: h.question },
        { role: "user" as const, content: h.answer },
      ]);
      
      setAssessmentSnapshot({ messages, draft, updatedAt: Date.now() });
      toast({ title: "Nice — let's confirm your roadmap" });
      setLocation("/assessment/confirm");
    } catch (error) {
      // Fallback to mock draft
      const mockInterests = [...selectedSkills];
      const lastAnswer = finalHistory[finalHistory.length - 1]?.answer;
      if (lastAnswer && lastAnswer !== "Skipped" && !mockInterests.includes(lastAnswer)) {
        mockInterests.push(lastAnswer);
      }

      const mockDraft: AssessmentDraft = {
        hasEnoughInfo: true,
        profile: {
          goal: "Personalized Learning",
          field: "Tech",
          skillLevel: "beginner",
          timePerDayMinutes: 60,
          timelineWeeks: 12,
          extraSkills: [],
          interests: mockInterests
        },
        draftSummary: "Assessment completed"
      };
      const conversationHistory = finalHistory.map(h => ({
        question: h.question,
        answer: h.answer,
      }));
      const messages: ChatMessage[] = conversationHistory.flatMap((h, i) => [
        { role: "assistant" as const, content: h.question },
        { role: "user" as const, content: h.answer },
      ]);
      setAssessmentSnapshot({ messages, draft: mockDraft, updatedAt: Date.now() });
      toast({ title: "Roadmap generated" });
      setLocation("/assessment/confirm");
    } finally {
      setLoading(false);
    }
  }

  const pageBg = "linear-gradient(135deg, #050511 0%, #0d0d2b 60%, #050511 100%)";
  const cardBg = "rgba(13,10,40,0.85)";

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

        {/* Previous Answers Summary Cards */}
        {answerHistory.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1rem" }}>
            {answerHistory.map((item, i) => (
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
                <p style={{ margin: 0, color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", fontWeight: 700 }}>{item.question}</p>
                <p style={{ margin: 0, color: "#ddd6fe", fontSize: "0.88rem" }}>{item.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills Preview Screen */}
        {isComplete && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Your Learning Path</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Based on your goals, you'll be learning these skills</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2rem", maxHeight: "60vh", overflowY: "auto" }}>
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  onClick={() => {
                    setSelectedSkills(prev =>
                      prev.includes(skill)
                        ? prev.filter(s => s !== skill)
                        : [...prev, skill]
                    );
                  }}
                  style={{
                    background: "rgba(76,53,200,0.2)",
                    border: "2px solid #9333ea",
                    borderRadius: "16px",
                    padding: "1.25rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    position: "relative",
                    opacity: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(76,53,200,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "24px", height: "24px", borderRadius: "50%", background: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>✓</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", paddingRight: "1.5rem" }}>
                    <h3 style={{ color: "white", fontSize: "1rem", fontWeight: 700, margin: 0 }}>{skill}</h3>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>{getSkillDescription(skill)}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => void generateRoadmap(answerHistory)}
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
        {!isComplete && currentQuestion && (
        <div
          style={{
            background: cardBg,
            border: "1px solid rgba(76,53,200,0.28)",
            borderRadius: "18px",
            padding: "1rem",
            boxShadow: "0 0 40px rgba(76,53,200,0.1)",
            opacity: animate ? 0.5 : 1,
            transform: animate ? (slideDirection === "left" ? "translateX(-20px)" : "translateX(20px)") : "translateX(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* Back Button */}
          {answerHistory.length > 0 && (
            <button
              type="button"
              disabled={loading || animate}
              onClick={handleBack}
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid rgba(76,53,200,0.45)",
                borderRadius: "8px",
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: loading || animate ? "wait" : "pointer",
                marginBottom: "1rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading && !animate) {
                  e.currentTarget.style.background = "rgba(76,53,200,0.2)";
                  e.currentTarget.style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              ← Back
            </button>
          )}

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
