import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { StarField } from "@/components/StarField";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

type Screen = "list" | "test" | "results";

// Sample Python questions for Phase 1
const pythonQuestions: Question[] = [
  { id: "1", question: "What is Python?", options: ["A programming language", "A type of snake", "A database", "An operating system"], correct: 0 },
  { id: "2", question: "How do you print in Python?", options: ["console.log()", "print()", "echo()", "System.out.println()"], correct: 1 },
  { id: "3", question: "Which symbol is used for comments in Python?", options: ["//", "/* */", "#", "--"], correct: 2 },
  { id: "4", question: "What is a variable?", options: ["A fixed value that never changes", "A container that stores data", "A type of function", "A loop"], correct: 1 },
  { id: "5", question: "Which of these is a valid variable name?", options: ["1name", "my-variable", "my_variable", "my variable"], correct: 2 },
  { id: "6", question: "What does len() do in Python?", options: ["Makes text longer", "Returns the length of a string or list", "Deletes a variable", "Creates a list"], correct: 1 },
  { id: "7", question: "Which data type stores True or False?", options: ["String", "Integer", "Boolean", "Float"], correct: 2 },
  { id: "8", question: "How do you create a list in Python?", options: ["{}", "()", "[]", "<>"], correct: 2 },
  { id: "9", question: "What is the output of 2 + 3 * 2?", options: ["10", "8", "7", "12"], correct: 1 },
  { id: "10", question: "Which keyword is used to define a function?", options: ["function", "define", "func", "def"], correct: 3 },
];

const availableTests = [
  { id: "python-phase1", skill: "Python", icon: "🐍", difficulty: "Beginner", questions: 10, duration: 15 },
  { id: "python-phase2", skill: "Python", icon: "🐍", difficulty: "Intermediate", questions: 10, duration: 20 },
  { id: "web-dev", skill: "Web Development", icon: "🌐", difficulty: "Beginner", questions: 10, duration: 15 },
  { id: "data-science", skill: "Data Science", icon: "📊", difficulty: "Intermediate", questions: 10, duration: 20 },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MockTest() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [screen, setScreen] = useState<Screen>("list");
  const [selectedTest, setSelectedTest] = useState<typeof availableTests[0] | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = useCallback((finalAnswers: Record<string, number>, qs: Question[]) => {
    setAnswers(finalAnswers);
    setScreen("results");
    setShowReview(false);

    // Check if passed (60% or above)
    const score = qs.filter(q => finalAnswers[q.id] === q.correct).length;
    const pct = qs.length ? Math.round((score / qs.length) * 100) : 0;
    if (pct >= 60) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, []);

  useEffect(() => {
    if (screen !== "test") return;
    const duration = selectedTest?.duration || 15;
    setTimeLeft(duration * 60);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({ title: "Time's up! Submitting your test." });
          handleSubmit(answers, questions);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [screen]);

  function startTest(testId: string) {
    const test = availableTests.find(t => t.id === testId);
    if (!test) return;

    setSelectedTest(test);
    const shuffledQuestions = shuffleArray(pythonQuestions);
    setQuestions(shuffledQuestions);
    setCurrentIdx(0);
    setAnswers({});
    setSelected(null);
    setScreen("test");
  }

  function handleNext() {
    if (selected === null) {
      toast({ title: "Please select an answer" });
      return;
    }
    const newAnswers = { ...answers, [questions[currentIdx].id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleSubmit(newAnswers, questions);
    }
  }

  function handleRetry() {
    if (!selectedTest) return;
    const shuffledQuestions = shuffleArray(pythonQuestions);
    setQuestions(shuffledQuestions);
    setCurrentIdx(0);
    setAnswers({});
    setSelected(null);
    setScreen("test");
  }

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const score = questions.filter(q => answers[q.id] === q.correct).length;
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const passed = pct >= 60;

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

  // TEST LIST SCREEN
  if (screen === "list") return (
    <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => setLocation("/dashboard")}
            style={{ ...btnBase, background: "transparent", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", marginBottom: "1rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Mock Tests</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>Test your knowledge and unlock new phases</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {availableTests.map(test => (
            <div
              key={test.id}
              style={{
                background: cardStyle.background,
                border: cardStyle.border,
                borderRadius: cardStyle.borderRadius,
                padding: "1.5rem",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(76,53,200,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => startTest(test.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "2.5rem" }}>{test.icon}</span>
                <div>
                  <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{test.skill}</h3>
                  <span style={{ 
                    padding: "0.2rem 0.6rem", 
                    borderRadius: "12px", 
                    background: test.difficulty === "Beginner" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)",
                    border: test.difficulty === "Beginner" ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(245,158,11,0.3)",
                    color: test.difficulty === "Beginner" ? "#34d399" : "#fbbf24",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}>
                    {test.difficulty}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", margin: "0 0 0.25rem" }}>Questions</p>
                  <p style={{ color: "white", fontWeight: 700, margin: 0 }}>{test.questions}</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", margin: "0 0 0.25rem" }}>Duration</p>
                  <p style={{ color: "white", fontWeight: 700, margin: 0 }}>{test.duration} min</p>
                </div>
              </div>
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "none",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #4c35c8, #9333ea)",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #9333ea, #4c35c8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #4c35c8, #9333ea)";
                }}
              >
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // TEST INTERFACE SCREEN
  if (screen === "test") {
    const q = questions[currentIdx];
    const isWarning = timeLeft <= 120;

    return (
      <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
        <StarField />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "680px", margin: "0 auto" }}>
          <style>{`@keyframes pulse-red { 0%,100%{color:#ef4444} 50%{color:#fca5a5} }`}</style>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <span style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa", padding: "0.2rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
                {selectedTest?.skill} · {selectedTest?.difficulty}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1rem",
                background: isWarning ? "rgba(239,68,68,0.15)" : "rgba(6,182,212,0.1)",
                border: `1px solid ${isWarning ? "rgba(239,68,68,0.4)" : "rgba(6,182,212,0.3)"}`,
                borderRadius: "20px",
                animation: isWarning ? "pulse-red 1s ease-in-out infinite" : "none",
              }}
            >
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: isWarning ? "#ef4444" : "#67e8f9", fontVariantNumeric: "tabular-nums", letterSpacing: "0.05em" }}>
                ⏱ {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              {q.question}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  style={{
                    ...btnBase,
                    padding: "0.875rem 1.25rem",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    background: selected === i ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${selected === i ? "rgba(124,58,237,0.7)" : "rgba(255,255,255,0.09)"}`,
                    color: selected === i ? "#c084fc" : "rgba(255,255,255,0.75)",
                    fontWeight: selected === i ? 600 : 400,
                  }}
                >
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${selected === i ? "#7c3aed" : "rgba(255,255,255,0.2)"}`,
                    background: selected === i ? "rgba(124,58,237,0.3)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {selected === i && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#a78bfa" }} />}
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", minWidth: "1rem" }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              style={{ ...btnBase, width: "100%", padding: "0.875rem", background: "linear-gradient(135deg, #7c3aed, #9333ea)", color: "white" }}
            >
              {currentIdx === questions.length - 1 ? "Submit Test" : "Next Question →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  return (
    <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
      {showConfetti && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: "none",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "4rem",
        }}>
          🎉
        </div>
      )}
      <StarField />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ ...cardStyle, textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "3.5rem", fontWeight: 900, color: passed ? "#10b981" : "#ef4444", marginBottom: "0.25rem" }}>
            {passed ? "✓ PASS" : "✗ FAIL"}
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
            {score} / {questions.length} Correct
          </div>
          <div style={{ display: "inline-block", padding: "0.3rem 1.25rem", background: `${passed ? "#10b981" : "#ef4444"}20`, border: `1px solid ${passed ? "rgba(16,185,129,0.6)" : "rgba(239,68,68,0.6)"}`, borderRadius: "20px", color: passed ? "#10b981" : "#ef4444", fontWeight: 700, fontSize: "1.1rem" }}>
            {pct}%
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.75rem", fontSize: "0.9rem" }}>
            {passed ? "Congratulations! Next phase unlocked 🎉" : "Don't give up! Try again"}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.25rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setShowReview(!showReview)}
              style={{ ...btnBase, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#c084fc" }}
            >
              {showReview ? "Hide" : "Review"} Answers
            </button>
            {passed ? (
              <button
                type="button"
                onClick={() => setLocation("/dashboard")}
                style={{ ...btnBase, background: "linear-gradient(135deg, #10b981, #059669)", color: "white" }}
              >
                Continue Learning
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRetry}
                style={{ ...btnBase, background: "linear-gradient(135deg, #7c3aed, #9333ea)", color: "white" }}
              >
                Retry Test
              </button>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Correct", value: score, color: "#10b981" },
            { label: "Wrong", value: questions.length - score, color: "#ef4444" },
            { label: "Accuracy", value: `${pct}%`, color: "#7c3aed" },
            { label: "Skill", value: selectedTest?.skill || "", color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{ ...cardStyle, padding: "1rem", textAlign: "center", borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {showReview && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ color: "white", fontWeight: 700, marginBottom: "0.25rem" }}>Answer Review</h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct;
              return (
                <div
                  key={q.id}
                  style={{
                    ...cardStyle,
                    padding: "1.25rem",
                    borderLeft: `4px solid ${isCorrect ? "#10b981" : "#ef4444"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Q{idx + 1}</span>
                    <span style={{ color: isCorrect ? "#10b981" : "#ef4444", fontWeight: 700, fontSize: "0.8rem" }}>
                      {isCorrect ? "✓ Correct" : "✗ Wrong"}
                    </span>
                  </div>
                  <p style={{ color: "white", fontWeight: 600, marginBottom: "0.75rem", lineHeight: 1.4 }}>{q.question}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.75rem" }}>
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "0.4rem 0.75rem",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          background: i === q.correct ? "rgba(16,185,129,0.1)" : i === userAns && !isCorrect ? "rgba(239,68,68,0.1)" : "transparent",
                          color: i === q.correct ? "#34d399" : i === userAns && !isCorrect ? "#fca5a5" : "rgba(255,255,255,0.5)",
                          fontWeight: i === q.correct ? 600 : 400,
                          border: `1px solid ${i === q.correct ? "rgba(16,185,129,0.25)" : "transparent"}`,
                        }}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                        {i === q.correct && " ✓"}
                        {i === userAns && !isCorrect && " (Your answer)"}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
  
