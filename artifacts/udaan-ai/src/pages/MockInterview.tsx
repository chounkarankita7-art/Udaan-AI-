import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { StarField } from "@/components/StarField";

type Screen = "setup" | "interview" | "feedback";

type Role = "Software Developer" | "Data Analyst" | "UI/UX Designer" | "Digital Marketer" | "Freelancer" | "General";
type Difficulty = "Entry Level" | "Mid Level" | "Senior Level";

interface InterviewAnswer {
  question: string;
  answer: string;
}

const INTERVIEW_QUESTIONS: Record<Role, string[]> = {
  "Software Developer": [
    "Tell me about yourself and your coding journey",
    "What is the difference between frontend and backend?",
    "Explain Object Oriented Programming in simple words",
    "How do you handle bugs in your code?",
    "Where do you see yourself in 2 years?",
  ],
  "Data Analyst": [
    "Tell me about yourself",
    "What tools do you use for data analysis?",
    "Explain the difference between mean, median and mode",
    "How would you handle missing data in a dataset?",
    "Describe a project where you used data to solve a problem",
  ],
  "UI/UX Designer": [
    "Walk me through your design process",
    "What is the difference between UI and UX?",
    "How do you handle client feedback on your designs?",
    "What tools do you use for designing?",
    "Show me how you would improve a bad user interface",
  ],
  "Digital Marketer": [
    "Tell me about yourself",
    "What marketing channels do you have experience with?",
    "How do you measure the success of a marketing campaign?",
    "Describe a successful marketing campaign you've worked on",
    "How do you stay updated with the latest marketing trends?",
  ],
  "Freelancer": [
    "Tell me about yourself",
    "What services do you offer as a freelancer?",
    "How do you find and manage clients?",
    "How do you handle difficult clients?",
    "What tools do you use for your freelance work?",
  ],
  "General": [
    "Tell me about yourself",
    "What are your strengths and weaknesses?",
    "Why do you want to work in this field?",
    "How do you handle pressure and deadlines?",
    "Where do you see yourself in 5 years?",
  ],
};

const ROLES: Role[] = ["Software Developer", "Data Analyst", "UI/UX Designer", "Digital Marketer", "Freelancer", "General"];
const DIFFICULTIES: Difficulty[] = ["Entry Level", "Mid Level", "Senior Level"];

export default function MockInterview() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [screen, setScreen] = useState<Screen>("setup");
  const [selectedRole, setSelectedRole] = useState<Role>("General");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("Entry Level");
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function startInterview() {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setCurrentAnswer("");
    setScreen("interview");
  }

  function submitAnswer() {
    if (!currentAnswer.trim()) {
      toast({ title: "Please enter your answer" });
      return;
    }

    const newAnswers = [
      ...answers,
      {
        question: INTERVIEW_QUESTIONS[selectedRole][currentQuestionIndex],
        answer: currentAnswer,
      },
    ];
    setAnswers(newAnswers);
    setCurrentAnswer("");

    if (currentQuestionIndex < INTERVIEW_QUESTIONS[selectedRole].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, generate feedback
      generateFeedback(newAnswers);
    }
  }

  async function generateFeedback(interviewAnswers: InterviewAnswer[]) {
    setLoading(true);
    try {
      const response = await fetch("/api/mock-interview/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: selectedRole,
          difficulty: selectedDifficulty,
          answers: interviewAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate feedback");
      }

      const data = await response.json();
      setFeedback(data.feedback);
      setScreen("feedback");
    } catch (error) {
      // Fallback feedback
      const fallbackFeedback = generateFallbackFeedback(interviewAnswers);
      setFeedback(fallbackFeedback);
      setScreen("feedback");
      toast({ title: "Using offline feedback mode" });
    } finally {
      setLoading(false);
    }
  }

  function generateFallbackFeedback(answers: InterviewAnswer[]): string {
    const avgLength = answers.reduce((sum, a) => sum + a.answer.length, 0) / answers.length;
    const score = Math.min(10, Math.max(1, Math.round(avgLength / 30)));

    let strengths = "";
    let improvements = "";

    if (avgLength > 150) {
      strengths += "- You provide detailed and comprehensive answers\n";
    } else {
      improvements += "- Try to provide more detailed answers\n";
    }

    if (avgLength > 100) {
      strengths += "- Good communication skills\n";
    } else {
      improvements += "- Work on elaborating your points\n";
    }

    return `**Overall Score: ${score}/10**

**Strengths:**
${strengths || "- Clear communication\n- Good structure in answers\n"}

**Areas for Improvement:**
${improvements || "- Add more specific examples\n- Practice more technical depth\n"}

**Tips for your next interview:**
- Research the company and role beforehand
- Use the STAR method (Situation, Task, Action, Result)
- Practice common interview questions
- Be confident and authentic`;
  }

  const btnBase: React.CSSProperties = {
    padding: "0.75rem 1.5rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    transition: "all 0.2s",
    border: "none",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(13,10,40,0.85)",
    border: "1px solid rgba(124,58,237,0.25)",
    borderRadius: "20px",
    padding: "2rem",
  };

  // SETUP SCREEN
  if (screen === "setup") return (
    <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "640px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => setLocation("/dashboard")}
            style={{ ...btnBase, background: "transparent", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", marginBottom: "1rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Mock Interview</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>Practice your interview skills with AI feedback</p>
        </div>

        <div style={cardStyle}>
          <div style={{ marginBottom: "1.75rem" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Select Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "rgba(76,53,200,0.1)",
                border: "1px solid rgba(76,53,200,0.35)",
                borderRadius: "12px",
                color: "white",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {ROLES.map(role => (
                <option key={role} value={role} style={{ background: "#0d0b1e" }}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Select Difficulty
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {DIFFICULTIES.map(difficulty => {
                const col = difficulty === "Entry Level" ? "#10b981" : difficulty === "Mid Level" ? "#f59e0b" : "#ef4444";
                return (
                  <button
                    key={difficulty}
                    type="button"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    style={{
                      ...btnBase,
                      flex: 1,
                      padding: "0.6rem",
                      background: selectedDifficulty === difficulty ? `${col}20` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${selectedDifficulty === difficulty ? col : "rgba(255,255,255,0.1)"}`,
                      color: selectedDifficulty === difficulty ? col : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {difficulty}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "12px", padding: "1rem", marginBottom: "1.5rem" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.25rem" }}>
              Interview Details
            </p>
            <p style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", margin: "0" }}>
              {selectedRole} · {selectedDifficulty} · 5 Questions
            </p>
          </div>

          <button
            type="button"
            onClick={startInterview}
            style={{ ...btnBase, width: "100%", padding: "1rem", background: "linear-gradient(135deg, #4c35c8, #9333ea)", color: "white", fontSize: "1rem" }}
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );

  // INTERVIEW SCREEN
  if (screen === "interview") {
    const questions = INTERVIEW_QUESTIONS[selectedRole];
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
        <StarField />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <span style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa", padding: "0.2rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
                {selectedRole}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {questions.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: i < currentQuestionIndex ? "#10b981" : i === currentQuestionIndex ? "#a78bfa" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, #4c35c8, #9333ea)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                👤
              </div>
              <div>
                <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Interviewer</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", margin: 0 }}>{selectedRole}</p>
              </div>
            </div>

            <div style={{ background: "rgba(76,53,200,0.1)", border: "1px solid rgba(76,53,200,0.3)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ color: "white", fontWeight: 600, fontSize: "1rem", lineHeight: 1.6, margin: 0 }}>
                {currentQuestion}
              </p>
            </div>

            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              style={{
                width: "100%",
                minHeight: "150px",
                padding: "1rem",
                background: "rgba(76,53,200,0.1)",
                border: "1px solid rgba(76,53,200,0.35)",
                borderRadius: "12px",
                color: "white",
                fontSize: "0.95rem",
                outline: "none",
                fontFamily: "'Space Grotesk', sans-serif",
                resize: "vertical",
                marginBottom: "1rem",
              }}
            />

            <button
              type="button"
              onClick={submitAnswer}
              disabled={loading || !currentAnswer.trim()}
              style={{
                ...btnBase,
                width: "100%",
                padding: "0.875rem",
                background: loading || !currentAnswer.trim() ? "rgba(76,53,200,0.35)" : "linear-gradient(135deg, #4c35c8, #9333ea)",
                color: "white",
                cursor: loading || !currentAnswer.trim() ? "wait" : "pointer",
              }}
            >
              {loading ? "Submitting..." : currentQuestionIndex === questions.length - 1 ? "Submit Interview" : "Next Question →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FEEDBACK SCREEN
  return (
    <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Interview Feedback</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>AI-powered analysis of your performance</p>
        </div>

        <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🤖</div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>Analyzing your answers...</p>
            </div>
          ) : (
            <div style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {feedback}
            </div>
          )}
        </div>

        {!loading && (
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => setScreen("setup")}
              style={{ ...btnBase, background: "linear-gradient(135deg, #4c35c8, #9333ea)", color: "white" }}
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => setLocation("/dashboard")}
              style={{ ...btnBase, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#c084fc" }}
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
  
