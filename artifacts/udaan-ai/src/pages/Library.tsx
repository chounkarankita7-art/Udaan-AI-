import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { StarField } from "@/components/StarField";
import logoPath from "/logo.png";

type ResourceType = "video" | "article" | "tool" | "cheat-sheet";

interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  skill: string;
  description: string;
  url: string;
  bookmarked: boolean;
}

const sampleResources: Resource[] = [
  // Python resources
  { id: "1", title: "Python for Beginners", type: "video", skill: "Python", description: "Complete Python beginner course covering basics to advanced concepts", url: "#", bookmarked: false },
  { id: "2", title: "Python Cheat Sheet", type: "cheat-sheet", skill: "Python", description: "Quick reference guide for Python syntax and common operations", url: "#", bookmarked: false },
  { id: "3", title: "Python Official Docs", type: "article", skill: "Python", description: "Official Python documentation and tutorials", url: "#", bookmarked: false },
  
  // Web Dev resources
  { id: "4", title: "HTML & CSS Crash Course", type: "video", skill: "Web Development", description: "Learn HTML and CSS from scratch in this comprehensive course", url: "#", bookmarked: false },
  { id: "5", title: "JavaScript 30", type: "video", skill: "Web Development", description: "30 day JavaScript coding challenge with 30 projects", url: "#", bookmarked: false },
  { id: "6", title: "CSS Tricks", type: "article", skill: "Web Development", description: "Daily articles about CSS tips, tricks, and techniques", url: "#", bookmarked: false },
  
  // AI & ML resources
  { id: "7", title: "Machine Learning Crash Course", type: "video", skill: "AI & ML", description: "Google's free machine learning course with hands-on exercises", url: "#", bookmarked: false },
  { id: "8", title: "Kaggle Free Courses", type: "tool", skill: "AI & ML", description: "Free courses on data science, machine learning, and AI", url: "#", bookmarked: false },
  
  // Soft Skills resources
  { id: "9", title: "Public Speaking Tips", type: "article", skill: "Soft Skills", description: "Essential tips and techniques for effective public speaking", url: "#", bookmarked: false },
  { id: "10", title: "Communication Skills Guide", type: "article", skill: "Soft Skills", description: "Comprehensive guide to improving communication skills", url: "#", bookmarked: false },
];

const skills = ["All", "Python", "Web Development", "AI & ML", "Soft Skills", "JavaScript", "Data Science", "Design"];
const filterTypes = ["All", "Videos", "Articles", "Tools", "Cheat Sheets"];

function getTypeIcon(type: ResourceType): string {
  switch (type) {
    case "video": return "📹";
    case "article": return "📖";
    case "tool": return "🛠️";
    case "cheat-sheet": return "📋";
    default: return "📄";
  }
}

function getTypeBadge(type: ResourceType): string {
  switch (type) {
    case "video": return "Video";
    case "article": return "Article";
    case "tool": return "Tool";
    case "cheat-sheet": return "Cheat Sheet";
    default: return "Resource";
  }
}

export default function Library() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [resources, setResources] = useState<Resource[]>(sampleResources);
  const [showBookmarks, setShowBookmarks] = useState(false);

  function toggleBookmark(resourceId: string) {
    setResources(prev => prev.map(r => r.id === resourceId ? { ...r, bookmarked: !r.bookmarked } : r));
    toast({ title: "Bookmark updated" });
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.skill.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || 
                        (selectedType === "Videos" && resource.type === "video") ||
                        (selectedType === "Articles" && resource.type === "article") ||
                        (selectedType === "Tools" && resource.type === "tool") ||
                        (selectedType === "Cheat Sheets" && resource.type === "cheat-sheet");
    const matchesSkill = selectedSkill === "All" || resource.skill === selectedSkill;
    const matchesBookmark = !showBookmarks || resource.bookmarked;
    
    return matchesSearch && matchesType && matchesSkill && matchesBookmark;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0d0b1e", position: "relative", padding: "1.25rem" }}>
      <StarField />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Learning Library</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>Explore curated resources to accelerate your learning</p>
        </div>

        {/* Search and Filters */}
        <div style={{ 
          background: "rgba(13,10,40,0.85)", 
          border: "1px solid rgba(76,53,200,0.28)", 
          borderRadius: "18px", 
          padding: "1.5rem", 
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by title or skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              background: "rgba(76,53,200,0.1)",
              border: "1px solid rgba(76,53,200,0.35)",
              borderRadius: "12px",
              color: "white",
              fontSize: "0.95rem",
              outline: "none",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          />

          {/* Type Filters */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {filterTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                style={{
                  padding: "0.5rem 1rem",
                  border: selectedType === type ? "1px solid #9333ea" : "1px solid rgba(76,53,200,0.35)",
                  borderRadius: "20px",
                  background: selectedType === type ? "linear-gradient(135deg, rgba(76,53,200,0.7), rgba(147,51,234,0.55))" : "transparent",
                  color: selectedType === type ? "white" : "rgba(255,255,255,0.6)",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease",
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Skill Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Filter by skill:</span>
            <select
              value={selectedSkill}
              onChange={e => setSelectedSkill(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(76,53,200,0.1)",
                border: "1px solid rgba(76,53,200,0.35)",
                borderRadius: "12px",
                color: "white",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {skills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>

            {/* Bookmarks Toggle */}
            <button
              type="button"
              onClick={() => setShowBookmarks(!showBookmarks)}
              style={{
                padding: "0.5rem 1rem",
                border: showBookmarks ? "1px solid #f59e0b" : "1px solid rgba(76,53,200,0.35)",
                borderRadius: "12px",
                background: showBookmarks ? "rgba(245,158,11,0.2)" : "transparent",
                color: showBookmarks ? "#f59e0b" : "rgba(255,255,255,0.6)",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.85rem",
                transition: "all 0.2s ease",
              }}
            >
              {showBookmarks ? "⭐ My Bookmarks" : "⭐ Show Bookmarks"}
            </button>
          </div>
        </div>

        {/* Resource Count */}
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
        </p>

        {/* Resource Cards Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1.5rem" 
        }}>
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              style={{
                background: "rgba(13,10,40,0.85)",
                border: "1px solid rgba(76,53,200,0.28)",
                borderRadius: "18px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
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
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "12px", 
                  background: "linear-gradient(135deg, rgba(76,53,200,0.3), rgba(147,51,234,0.2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}>
                  {getTypeIcon(resource.type)}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(resource.id);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    opacity: resource.bookmarked ? 1 : 0.5,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {resource.bookmarked ? "⭐" : "☆"}
                </button>
              </div>

              {/* Type Badge */}
              <div>
                <span style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px",
                  background: "rgba(76,53,200,0.2)",
                  border: "1px solid rgba(76,53,200,0.3)",
                  color: "#c4b5fd",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}>
                  {getTypeBadge(resource.type)}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                {resource.title}
              </h3>

              {/* Skill Tag */}
              <span style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "12px",
                background: "rgba(147,51,234,0.15)",
                border: "1px solid rgba(147,51,234,0.25)",
                color: "#a78bfa",
                fontSize: "0.75rem",
                fontWeight: 600,
                alignSelf: "flex-start",
              }}>
                {resource.skill}
              </span>

              {/* Description */}
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", margin: 0, lineHeight: 1.5, flex: 1 }}>
                {resource.description}
              </p>

              {/* Open Button */}
              <button
                type="button"
                style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid rgba(76,53,200,0.45)",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(76,53,200,0.7), rgba(147,51,234,0.55))",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(147,51,234,0.8), rgba(76,53,200,0.7))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(76,53,200,0.7), rgba(147,51,234,0.55))";
                }}
              >
                Open Resource
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div style={{ 
            textAlign: "center", 
            padding: "4rem 2rem",
            color: "rgba(255,255,255,0.4)",
            fontSize: "1rem"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p>No resources found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
