"use client";

const NOTES_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif';

export default function NotesWindow() {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ fontFamily: NOTES_FONT, background: "#faf8f2" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-4 py-2.5 flex-shrink-0"
        style={{ background: "#eae7e0", borderBottom: "1px solid #d8d4cc" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-medium" style={{ color: "#4a4640" }}>Notes</span>
        </div>
        <div className="flex items-center gap-3">
          <EditIcon />
          <span className="text-xs font-medium" style={{ color: "#7a756e" }}>Aa</span>
        </div>
      </div>

      {/* Toolbar strip */}
      <div
        className="flex items-center px-5 py-1.5 gap-4 flex-shrink-0"
        style={{ background: "#f0ece3", borderBottom: "1px solid #dedad2" }}
      >
        <ToolbarIcon label="checklist" />
        <ToolbarIcon label="table" />
        <ToolbarIcon label="media" />
        <div className="flex-1" />
        <ToolbarIcon label="share" />
        <SearchIcon />
      </div>

      {/* Note content */}
      <div className="flex-1 px-8 pt-6 pb-8 overflow-y-auto" style={{ background: "#faf8f2" }}>
        <p className="text-center text-xs mb-6" style={{ color: "#a09b92" }}>
          April 22, 2026 at 12:00 AM
        </p>
        <p className="text-2xl font-bold mb-4 tracking-tight" style={{ color: "#1e1c19" }}>
          About Me
        </p>

        <p className="text-sm leading-relaxed mb-5" style={{ color: "#3a3834" }}>
          Hey! I'm Kevin — a software engineer who cares deeply about the details. I build things that are fast, feel great to use, and hold up under pressure.
        </p>

        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#a09b92" }}>
          Currently into
        </p>
        <ul className="mb-5 space-y-1.5">
          {[
            "Building polished UIs with React & Next.js",
            "Systems programming and low-level stuff",
            "Scroll-driven animations & micro-interactions",
            "Making dev tools that spark joy",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#3a3834" }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: "#a09b92" }}>–</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#a09b92" }}>
          Stack
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {["TypeScript", "React", "Next.js", "Rust", "Go", "Postgres"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md"
              style={{ background: "#eae7e0", color: "#4a4640" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#a09b92" }}>
          Outside of work
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#3a3834" }}>
          You'll find me down a design rabbit hole, tinkering with a side project, or trying to figure out how something works just for the sake of knowing.
        </p>
      </div>
    </div>
  );
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7a756e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a756e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ToolbarIcon({ label }: { label: string }) {
  const icons: Record<string, React.ReactNode> = {
    checklist: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a756e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    table: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a756e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    ),
    media: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a756e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    share: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a756e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
  };
  return <>{icons[label]}</>;
}
