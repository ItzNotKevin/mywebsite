"use client";
import { useState } from "react";

const FINDER_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif';

type LinkType = "github" | "devpost" | "demo" | "youtube";

interface Project {
  id: number;
  name: string;
  type: string;
  tags: string[];
  color: string;
  image?: string;
  logo?: string;
  points: string[];
  links: { type: LinkType; label: string; url: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Tandem",
    type: "AI Study Companion",
    tags: ["Next.js", "React", "TailwindCSS", "TLDraw", "FastAPI", "Vertex AI Gemini", "ElevenLabs", "MediaPipe"],
    color: "#e8edf5",
    image: "/projects/tandem.png",
    logo: "/projects/tandem-logo.png",
    points: [
      "Real-time AI tutor that watches your whiteboard, speaks to you, and guides you through problems",
      "Interrupt the AI mid-sentence and it pivots to your new thought",
      "Tracks intermediate steps, not just final answers, catches mistakes as you work",
    ],
    links: [
      { type: "github", label: "GitHub", url: "https://github.com/ItzNotKevin/tandem" },
      { type: "devpost", label: "Devpost", url: "https://devpost.com/software/tandem-jbmp0n" },
    ],
  },
  {
    id: 2,
    name: "Resonance",
    type: "Music Recommendation App",
    tags: ["React Native", "Expo", "TypeScript", "FastAPI", "SQLite", "Spotify API", "Last.fm API"],
    color: "#ede8f5",
    image: "/projects/resonance.png",
    points: [
      "Tinder-style swipe interface for discovering new music based on songs you like",
      "Uses Cosine, Euclidean, and Jaccard similarity algorithms that adapt after every 10 swipes",
      "Pulls from Spotify + Last.fm data to blend audio features with community listening patterns",
    ],
    links: [
      { type: "github", label: "GitHub", url: "https://github.com/ItzNotKevin/resonance" },
    ],
  },
];

export default function FinderWindow() {
  const [selected, setSelected] = useState(0);
  const project = PROJECTS[selected];

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ fontFamily: FINDER_FONT, background: "#ffffff" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center flex-shrink-0 relative"
        style={{ background: "#ebebeb", borderBottom: "1px solid #d0d0d0", minHeight: 38 }}
      >
        <div className="flex gap-1.5 px-3">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>

        <div className="flex items-center gap-0.5 ml-3">
          <button className="p-1 rounded transition-colors" style={{ color: "#8e8e93" }}>
            <ChevronLeft />
          </button>
          <button className="p-1 rounded transition-colors" style={{ color: "#c7c7cc" }}>
            <ChevronRight />
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[13px] font-semibold" style={{ color: "#1d1d1f" }}>Projects</span>
        </div>

        <div className="ml-auto flex items-center gap-2 px-3">
          <GalleryViewIcon />
          <ShareIcon />
          <TagIcon />
          <SearchToolbarIcon />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Gallery view */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#ffffff" }}>
          {/* Large preview */}
          <div className="flex-1 flex items-center justify-center p-6" style={{ background: "#f0f0f0" }}>
            <div
              className="rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                maxWidth: "85%",
                maxHeight: "100%",
                background: project.color,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              }}
            >
              {project.image ? (
                <img src={project.image} alt={project.name} style={{ display: "block", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              ) : (
                <span className="text-[12px] font-medium p-8" style={{ color: "#8e8e93" }}>{project.name}</span>
              )}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div
            className="flex-shrink-0 flex items-center justify-center gap-4 px-4 overflow-x-auto"
            style={{ height: 110, background: "#f2f2f2", borderTop: "1px solid #d9d9d9" }}
          >
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelected(i)}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 transition-all"
                style={{ outline: "none" }}
              >
                <div
                  className="rounded-xl flex items-center justify-center transition-all"
                  style={{
                    width: 52,
                    height: 52,
                    background: "#e8e8e8",
                    border: selected === i ? "2px solid #2563eb" : "1.5px solid rgba(0,0,0,0.10)",
                    boxShadow: selected === i ? "0 0 0 3px rgba(37,99,235,0.18)" : "none",
                  }}
                >
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="w-8 h-8 object-contain" style={{ transform: "translateX(-2px)" }} />
                  ) : (
                    <span style={{ fontSize: 22 }}>
                      {p.id === 1 ? "📚" : p.id === 2 ? "🎵" : "📁"}
                    </span>
                  )}
                </div>
                <span
                  className="text-[10px] font-medium leading-none"
                  style={{ color: selected === i ? "#2563eb" : "#5a5a5e" }}
                >
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right info sidebar */}
        <div
          className="flex-shrink-0 flex flex-col overflow-y-auto"
          style={{ width: 180, background: "#f5f5f5", borderLeft: "1px solid #d9d9d9" }}
        >
          {/* Icon + name */}
          <div className="flex flex-col items-center pt-5 pb-3 px-3" style={{ borderBottom: "1px solid #e5e5e5" }}>
            <div
              className="rounded-xl mb-2 overflow-hidden flex items-center justify-center"
              style={{ width: 56, height: 56, background: project.color, border: "1px solid rgba(0,0,0,0.06)" }}
            >
              {project.logo ? (
                <img src={project.logo} alt={project.name} className="w-full h-full object-contain p-1" style={{ transform: "translateX(-2px)" }} />
              ) : project.image ? (
                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px]" style={{ color: "#8e8e93" }}>APP</span>
              )}
            </div>
            <p className="text-[12px] font-semibold text-center leading-tight" style={{ color: "#1d1d1f" }}>
              {project.name}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "#8e8e93" }}>{project.type}</p>
          </div>

          {/* Description bullet points */}
          <div className="px-3 py-3" style={{ borderBottom: "1px solid #e5e5e5" }}>
            <p className="text-[11px] font-semibold mb-2" style={{ color: "#1d1d1f" }}>About</p>
            <ul className="flex flex-col gap-2">
              {project.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="mt-[3px] flex-shrink-0 text-[10px]" style={{ color: "#8e8e93" }}>–</span>
                  <span className="text-[11px] leading-snug" style={{ color: "#3a3834" }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="px-3 py-3 flex flex-col gap-2" style={{ borderBottom: "1px solid #e5e5e5" }}>
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#1d1d1f" }}>Links</p>
            {project.links.map((link) => (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
                style={{ background: "#eaeaea", color: "#1d1d1f" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#dcdcdc")}
                onMouseLeave={e => (e.currentTarget.style.background = "#eaeaea")}
              >
                <span className="flex-shrink-0" style={{ color: "#5a5650" }}>
                  <LinkIcon type={link.type} />
                </span>
                <span className="text-[11px] font-medium">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Tags */}
          <div className="px-3 py-3">
            <p className="text-[11px] font-semibold mb-2" style={{ color: "#1d1d1f" }}>Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: "#e4e4e7", color: "#4a4640" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function LinkIcon({ type }: { type: LinkType }) {
  if (type === "github") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
  if (type === "devpost") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.342v7.927h1.204c2.409 0 3.967-1.498 3.967-3.939 0-2.486-1.59-3.988-3.967-3.988z" />
    </svg>
  );
  if (type === "youtube") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
  // demo / fallback
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function GalleryViewIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="12" rx="2" />
      <rect x="3" y="18" width="4" height="3" rx="0.5" />
      <rect x="10" y="18" width="4" height="3" rx="0.5" />
      <rect x="17" y="18" width="4" height="3" rx="0.5" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function SearchToolbarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
