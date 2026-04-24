import {
  useGetRoadmap,
  getGetRoadmapQueryKey,
} from "@workspace/api-client-react";
import { getStoredStudent } from "@/lib/auth";
import { useLocation } from "wouter";
import { getConfirmedRoadmapProfile } from "@/lib/assessment-draft";
import { Storage } from "@/lib/storage";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

const mockProgressData = [
  { week: "W1", progress: 5 },
  { week: "W2", progress: 15 },
  { week: "W3", progress: 28 },
  { week: "W4", progress: 38 },
  { week: "W5", progress: 50 },
  { week: "W6", progress: 63 },
  { week: "W7", progress: 72 },
  { week: "W8", progress: 85 },
];

function formatDuration(timePerDayMinutes: number): string {
  if (timePerDayMinutes <= 30) return "20-24 weeks";
  if (timePerDayMinutes <= 60) return "12-16 weeks";
  if (timePerDayMinutes <= 120) return "8-10 weeks";
  return "4-6 weeks";
}

function estimatePhases(timePerDayMinutes: number): number {
  if (timePerDayMinutes <= 30) return 8;
  if (timePerDayMinutes <= 60) return 6;
  if (timePerDayMinutes <= 120) return 5;
  return 4;
}

export default function Roadmap() {
  const [, setLocation] = useLocation();
  const student = getStoredStudent();
  const confirmedProfile = getConfirmedRoadmapProfile();

  const { data: roadmap, isLoading, error } = useGetRoadmap(student?.id || "", {
    query: {
      enabled: !!student?.id,
      queryKey: getGetRoadmapQueryKey(student?.id || ""),
    },
  });

  // Save to localStorage when successfully loaded from database
  useEffect(() => {
    if (roadmap && confirmedProfile) {
      const roadmapData = {
        goal: confirmedProfile.goal || "Get a Job",
        field: confirmedProfile.field || "General Tech",
        skillLevel: confirmedProfile.skillLevel || "beginner",
        timePerDayMinutes: confirmedProfile.timePerDayMinutes || 60,
        interests: confirmedProfile.interests || [],
        extraSkills: confirmedProfile.extraSkills || [],
        timelineWeeks: confirmedProfile.timelineWeeks || 24,
        phases: confirmedProfile.phases || 6,
        track: confirmedProfile.field || confirmedProfile.interests?.[0] || "General Tech",
        generatedAt: Date.now(),
      };
      Storage.saveRoadmap(roadmapData);
    }
  }, [roadmap, confirmedProfile]);

  // Try to get roadmap from localStorage if database fails
  const localRoadmap = error || !roadmap ? (() => {
    const stored = Storage.getRoadmap();
    if (stored) {
      // Convert localStorage format to roadmap format
      return {
        description: `Turn your now into your next — your personalized path to ${stored.goal}`,
        phases: Array.from({ length: stored.phases }, (_, i) => ({
          phase: i + 1,
          title: `Phase ${i + 1}`,
          description: stored.interests?.join(', ') || 'Building foundations',
          status: i === 0 ? 'active' : i === 1 ? 'locked' : 'locked',
          completionPercentage: i === 0 ? 0 : 0,
          courses: stored.interests?.map((skill: string, idx: number) => ({
            id: `${skill.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
            title: skill,
          })) || [],
        })),
      };
    }
    return null;
  })() : null;

  const finalRoadmap = roadmap || localRoadmap;

  // Get all skills from assessment (interests + extraSkills)
  const assessmentSkills = confirmedProfile 
    ? Array.from(new Set([...(confirmedProfile.interests || []), ...(confirmedProfile.extraSkills || [])]))
    : [];

  const skillIconMap: Record<string, string> = {
    "Web Development": "🌐",
    "App Development": "📱",
    "Data Science": "📊",
    "AI/ML": "🤖",
    "Cybersecurity": "🛡️",
    "Design": "🎨",
    "Soft Skills": "💬",
    "Python": "🐍",
    "JavaScript": "⚡",
    "React": "⚛️",
    "Excel": "📗",
    "SQL": "🗃️",
    "Cloud": "☁️",
    "DevOps": "🔧",
  };

  if (!student) {
    setLocation("/signup");
    return null;
  }

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center", height: "70vh" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "3px solid rgba(124,58,237,0.3)",
              borderTop: "3px solid #7c3aed",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    if (!finalRoadmap) {
      return (
        <div style={{ padding: "2rem" }}>
          <div
            style={{
              background: "rgba(13,10,40,0.8)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "16px",
              padding: "3rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
              No roadmap found. Please complete your assessment first.
            </p>
            <button
              onClick={() => setLocation("/assessment")}
              style={{
                padding: "0.75rem 2rem",
                background: "linear-gradient(135deg, #7c3aed, #9333ea)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Start Assessment
            </button>
          </div>
        </div>
      );
    }
    // If we have finalRoadmap from localStorage, continue
  }

  if (!finalRoadmap) {
    return (
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            background: "rgba(13,10,40,0.8)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "16px",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
            No roadmap found. Please complete your assessment first.
          </p>
          <button
            onClick={() => setLocation("/assessment")}
            style={{
              padding: "0.75rem 2rem",
              background: "linear-gradient(135deg, #7c3aed, #9333ea)",
              border: "none",
              borderRadius: "10px",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    active: "#7c3aed",
    completed: "#10b981",
    locked: "rgba(255,255,255,0.2)",
  };

  const statusBgColors: Record<string, string> = {
    active: "rgba(124,58,237,0.15)",
    completed: "rgba(16,185,129,0.1)",
    locked: "rgba(255,255,255,0.04)",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(13,10,40,0.8)",
    border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: "16px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1000px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
        Your Learning Roadmap
      </h1>
      <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
        {finalRoadmap.description || `Turn your now into your next — your personalized path to mastery`}
      </p>

      <div style={{ ...cardStyle, marginBottom: "2rem" }}>
        <h3 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "1rem" }}>
          Progress Overview
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={mockProgressData}>
            <defs>
              <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.1)" />
            <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(13,10,40,0.95)",
                border: "1px solid rgba(124,58,237,0.3)",
                borderRadius: "10px",
                color: "white",
              }}
            />
            <Area type="monotone" dataKey="progress" stroke="#7c3aed" strokeWidth={2} fill="url(#progressGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {assessmentSkills.length > 0 && (
        <div style={{ ...cardStyle, marginBottom: "2rem" }}>
          <h3 style={{ color: "white", fontWeight: 600, marginBottom: "0.5rem", fontSize: "1rem" }}>
            Your Learning Skills Flow
          </h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            Skills selected during your assessment, ordered for optimal learning progression
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {assessmentSkills.map((skill, index) => (
              <div key={skill} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed, #9333ea)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                      boxShadow: "0 0 15px rgba(124,58,237,0.4)",
                    }}
                  >
                    {skillIconMap[skill] || "✨"}
                  </div>
                  {index < assessmentSkills.length - 1 && (
                    <div
                      style={{
                        width: "2px",
                        minHeight: "40px",
                        background: "linear-gradient(to bottom, #7c3aed, rgba(124,58,237,0.2))",
                        marginTop: "0.5rem",
                      }}
                    />
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: "12px",
                    padding: "1rem",
                    marginBottom: index < assessmentSkills.length - 1 ? "1rem" : 0,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                    <h4 style={{ color: "white", fontWeight: 700, fontSize: "1rem", margin: 0 }}>
                      {skill}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "#a78bfa",
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.3)",
                        borderRadius: "20px",
                        padding: "0.2rem 0.6rem",
                      }}
                    >
                      Step {index + 1}
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", margin: 0 }}>
                    {index === 0 && "Foundation skill - Start here"}
                    {index === assessmentSkills.length - 1 && index > 0 && "Advanced skill - Build upon previous skills"}
                    {index > 0 && index < assessmentSkills.length - 1 && "Intermediate skill - Progress from foundations"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ position: "relative" }}>
        {(finalRoadmap.phases as any[] || []).map((phase: any, idx: number) => (
          <div
            key={phase.phase}
            style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: statusColors[phase.status],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  flexShrink: 0,
                  boxShadow: phase.status === "active" ? `0 0 20px rgba(124,58,237,0.5)` : "none",
                  border: `2px solid ${statusColors[phase.status]}`,
                }}
              >
                {phase.status === "completed" ? "✓" : phase.phase}
              </div>
              {idx < (finalRoadmap.phases as any[]).length - 1 && (
                <div
                  style={{
                    width: "2px",
                    flex: 1,
                    minHeight: "60px",
                    background: `linear-gradient(to bottom, ${statusColors[phase.status]}, rgba(124,58,237,0.1))`,
                    marginTop: "0.5rem",
                  }}
                />
              )}
            </div>

            <div
              style={{
                flex: 1,
                background: statusBgColors[phase.status],
                border: `1px solid ${statusColors[phase.status]}30`,
                borderRadius: "16px",
                padding: "1.5rem",
                opacity: phase.status === "locked" ? 0.5 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: statusColors[phase.status],
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Phase {phase.phase}
                  </span>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: "1.1rem", margin: "0.25rem 0" }}>
                    {phase.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{phase.description}</p>
                </div>
                <span
                  style={{
                    padding: "0.25rem 0.875rem",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    background: `${statusColors[phase.status]}20`,
                    border: `1px solid ${statusColors[phase.status]}40`,
                    color: statusColors[phase.status],
                    textTransform: "capitalize",
                  }}
                >
                  {phase.status}
                </span>
              </div>

              {phase.status !== "locked" && (
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Progress</span>
                    <span style={{ color: statusColors[phase.status], fontSize: "0.75rem", fontWeight: 600 }}>
                      {phase.completionPercentage || 0}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${phase.completionPercentage || 0}%`,
                        background: `linear-gradient(90deg, ${statusColors[phase.status]}, ${statusColors[phase.status]}88)`,
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                </div>
              )}

              {(phase.courses || []).length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {(phase.courses as any[]).map((course: any) => (
                    <button
                      key={course.id}
                      data-testid={`button-course-${course.id}`}
                      onClick={() => phase.status !== "locked" && setLocation(`/courses/${course.id}`)}
                      style={{
                        padding: "0.4rem 0.875rem",
                        background: phase.status === "locked" ? "rgba(255,255,255,0.05)" : "rgba(124,58,237,0.15)",
                        border: `1px solid ${phase.status === "locked" ? "rgba(255,255,255,0.1)" : "rgba(124,58,237,0.3)"}`,
                        borderRadius: "8px",
                        color: phase.status === "locked" ? "rgba(255,255,255,0.35)" : "#c084fc",
                        fontSize: "0.8rem",
                        cursor: phase.status === "locked" ? "not-allowed" : "pointer",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {course.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <JobGuidance skills={assessmentSkills} />
    </div>
  );
}

function JobCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(13,10,40,0.85)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: "16px", padding: "1.25rem" }}>
      <h3 style={{ color: "white", fontWeight: 700, fontSize: "1.05rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

function JobRow({ title, salary, companies }: { title: string; salary: string; companies: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
      <div>
        <p style={{ margin: 0, color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{title}</p>
        {companies.length > 0 && (
          <p style={{ margin: "0.2rem 0 0", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Companies: {companies.join(", ")}</p>
        )}
      </div>
      <span style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700, fontSize: "0.78rem", padding: "0.3rem 0.6rem", borderRadius: "8px", border: "1px solid rgba(16,185,129,0.3)", whiteSpace: "nowrap" }}>
        {salary}
      </span>
    </div>
  );
}

function Tip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: "10px", padding: "0.7rem 0.85rem", marginTop: "0.8rem", marginBottom: "0.6rem" }}>
      <p style={{ margin: "0 0 0.3rem", color: "#c4b5fd", fontWeight: 700, fontSize: "0.8rem" }}>💡 {title}</p>
      <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>{children}</p>
    </div>
  );
}

function AfterYears({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(124,58,237,0.06)", borderLeft: "3px solid #7c3aed", borderRadius: "0 8px 8px 0", padding: "0.6rem 0.85rem", marginTop: "0.4rem" }}>
      <p style={{ margin: "0 0 0.3rem", color: "#a78bfa", fontWeight: 700, fontSize: "0.8rem" }}>{title}</p>
      <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>{children}</p>
    </div>
  );
}

function JobGuidance({ skills }: { skills: string[] }) {
  const skillSlugs = skills.map(s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  const hasSkill = (id: string) => skillSlugs.includes(id) || skills.some(s => s.toLowerCase().includes(id));

  const hasPython = hasSkill("python");
  const hasData = hasSkill("data-science") || hasSkill("data-analysis") || hasSkill("machine-learning");
  const hasWeb = hasSkill("web") || hasSkill("html") || hasSkill("javascript") || hasSkill("react");
  const hasUIUX = hasSkill("design") || hasSkill("ui") || hasSkill("ux") || hasSkill("figma") || hasSkill("canva") || hasSkill("graphic-design");
  const hasMarketing = hasSkill("digital-marketing") || hasSkill("social-media") || hasSkill("seo") || hasSkill("content-creation");
  const hasCyber = hasSkill("cybersecurity") || hasSkill("ethical-hacking") || hasSkill("penetration-testing");
  const hasSoft = hasSkill("communication") || hasSkill("soft-skills") || hasSkill("public-speaking") || hasSkill("leadership");
  const hasAccounting = hasSkill("accounting") || hasSkill("tally") || hasSkill("finance");
  const hasContent = hasSkill("content-creation") || hasSkill("social-media") || hasSkill("youtube");

  return (
    <div style={{ marginTop: "2.5rem" }}>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "white", marginBottom: "1.25rem" }}>
        Your Career Roadmap 🎯
      </h2>
      <div style={{ display: "grid", gap: "1rem" }}>
        {hasPython && hasData && (
          <JobCard title="Data Science & AI" icon="🤖">
            <JobRow title="Data Analyst" salary="₹3-5 LPA" companies={["TCS", "Infosys", "Wipro", "Juspay", "Razorpay", "MuSigma", "Fractal Analytics"]} />
            <JobRow title="Junior Data Scientist" salary="₹4-7 LPA" companies={["Flipkart", "Paytm", "Swiggy", "Zomato", "startups"]} />
            <JobRow title="Business Analyst" salary="₹3-5 LPA" companies={["Any mid-large company"]} />
            <Tip title="If no job immediately">Freelance data analysis on Upwork/Fiverr · Build Kaggle portfolio · Contribute to open source projects</Tip>
            <AfterYears title="After 2-3 years">Senior Data Scientist → ₹12-20 LPA · ML Engineer → ₹15-25 LPA</AfterYears>
          </JobCard>
        )}

        {hasWeb && (
          <JobCard title="Web Development" icon="🌐">
            <JobRow title="Junior Web Developer" salary="₹2.5-5 LPA" companies={["TCS", "Wipro", "local IT agencies", "web development firms", "startups"]} />
            <JobRow title="Frontend Developer" salary="₹3-6 LPA" companies={["Product startups", "agencies"]} />
            <JobRow title="Full Stack Developer (after 1 year)" salary="₹5-8 LPA" companies={[]} />
            <Tip title="If no job immediately">Freelance websites on Fiverr, Upwork · Build client websites locally · Create WordPress sites for businesses</Tip>
            <AfterYears title="After 2-3 years">Senior Developer → ₹10-18 LPA · Tech Lead → ₹15-25 LPA</AfterYears>
          </JobCard>
        )}

        {hasUIUX && (
          <JobCard title="UI/UX Design" icon="🎨">
            <JobRow title="Junior UI Designer" salary="₹2.5-4.5 LPA" companies={["Design agencies", "startups", "product companies", "app companies"]} />
            <JobRow title="Product Designer" salary="₹3-6 LPA" companies={["Tech startups", "SaaS companies"]} />
            <Tip title="If no job immediately">Freelance logo design on Fiverr · Create social media designs for businesses · Design mobile apps for local businesses</Tip>
            <AfterYears title="After 2-3 years">Senior UX Designer → ₹10-18 LPA · Product Design Lead → ₹15-22 LPA</AfterYears>
          </JobCard>
        )}

        {hasMarketing && (
          <JobCard title="Digital Marketing" icon="📈">
            <JobRow title="Digital Marketing Executive" salary="₹2-4 LPA" companies={["Marketing agencies", "e-commerce companies", "startups", "brands"]} />
            <JobRow title="Social Media Manager" salary="₹2.5-4.5 LPA" companies={["Any business with online presence"]} />
            <JobRow title="SEO Executive" salary="₹2-3.5 LPA" companies={[]} />
            <Tip title="If no job immediately">Freelance social media management · Run ads for local businesses · Content writing and SEO freelancing</Tip>
            <AfterYears title="After 2-3 years">Digital Marketing Manager → ₹6-12 LPA · Growth Marketing Lead → ₹10-18 LPA</AfterYears>
          </JobCard>
        )}

        {hasCyber && (
          <JobCard title="Cybersecurity" icon="🛡️">
            <JobRow title="Security Analyst" salary="₹3-6 LPA" companies={["IT firms", "banks", "government", "cybersecurity companies"]} />
            <JobRow title="Junior Penetration Tester" salary="₹3-5 LPA" companies={[]} />
            <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", padding: "0.6rem 0.8rem", marginBottom: "0.6rem", marginTop: "0.4rem" }}>
              <p style={{ margin: 0, color: "#fbbf24", fontSize: "0.8rem", fontWeight: 600 }}>⚠️ Honest note: Entry level cybersecurity jobs are fewer than development jobs. Building a strong portfolio and certifications (CEH, CompTIA Security+) is essential.</p>
            </div>
            <Tip title="If no job immediately">Bug bounty programs (HackerOne, Bugcrowd) · Build security tools on GitHub · Freelance security audits for small businesses</Tip>
            <AfterYears title="After 2-3 years">Senior Security Engineer → ₹12-20 LPA · Security Consultant → ₹15-25 LPA</AfterYears>
          </JobCard>
        )}

        {hasSoft && !hasPython && !hasWeb && !hasUIUX && !hasMarketing && !hasCyber && !hasAccounting && (
          <JobCard title="Soft Skills" icon="💬">
            <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", padding: "0.6rem 0.8rem", marginBottom: "0.6rem" }}>
              <p style={{ margin: 0, color: "#fbbf24", fontSize: "0.8rem", fontWeight: 600 }}>ℹ️ Direct jobs from soft skills alone are rare. Soft skills SUPPORT your other technical skills.</p>
            </div>
            <JobRow title="Public Speaking → Corporate Trainer" salary="₹3-8 LPA" companies={[]} />
            <JobRow title="Communication → HR roles" salary="₹2.5-5 LPA" companies={[]} />
            <JobRow title="Leadership → Management roles" salary="Varies" companies={["After experience"]} />
          </JobCard>
        )}

        {hasAccounting && (
          <JobCard title="Accounting & Finance" icon="💰">
            <JobRow title="Accountant" salary="₹2-4 LPA" companies={["Any company", "CA firms", "banks", "financial institutions"]} />
            <JobRow title="Finance Analyst" salary="₹3-5 LPA" companies={[]} />
            <JobRow title="Tax Assistant" salary="₹2-3.5 LPA" companies={[]} />
            <Tip title="If no job immediately">Freelance accounting for small businesses · File ITR returns for individuals/businesses · Tally work for local shops and businesses</Tip>
            <AfterYears title="After 2-3 years (with CA)">CA → ₹7-15 LPA · Finance Manager → ₹8-15 LPA</AfterYears>
          </JobCard>
        )}

        {hasContent && (
          <JobCard title="Content Creation" icon="🎬">
            <JobRow title="Content Creator" salary="₹2-4 LPA" companies={["Digital agencies", "brands", "media companies", "startups"]} />
            <JobRow title="Social Media Executive" salary="₹2-3.5 LPA" companies={[]} />
            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "0.6rem 0.8rem", marginBottom: "0.6rem", marginTop: "0.4rem" }}>
              <p style={{ margin: 0, color: "#34d399", fontSize: "0.8rem", fontWeight: 600 }}>💡 Building your own income (better option): YouTube monetization (6-12 months to start earning) · Instagram brand deals (after 10k followers) · Blog monetization through ads/affiliates</p>
            </div>
            <AfterYears title="Realistic timeline for own income">Month 1-6: Build audience, no income · Month 6-12: Small income ₹5-20k/month · Year 2+: ₹30k-2L+/month (depends on niche)</AfterYears>
          </JobCard>
        )}

        {!(hasPython || hasWeb || hasUIUX || hasMarketing || hasCyber || hasAccounting || hasContent) && (
          <div style={{ background: "rgba(13,10,40,0.8)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "16px", padding: "1.5rem" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "0.9rem" }}>
              Complete your assessment to see personalized career guidance for your selected skills.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
