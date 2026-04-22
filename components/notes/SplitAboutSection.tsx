"use client";
import { motion } from "framer-motion";
import NotesWindow from "./NotesWindow";
import FinderWindow from "@/components/finder/FinderWindow";

const WINDOW_SHADOW = [
  "0 2px 4px rgba(0,0,0,0.10)",
  "0 8px 16px rgba(0,0,0,0.08)",
  "0 20px 40px rgba(0,0,0,0.06)",
].join(", ");

const slideUp = {
  initial: { rotateX: 20, y: 120, scale: 0.88, opacity: 0 },
  whileInView: { rotateX: 0, y: 0, scale: 1, opacity: 1 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  viewport: { once: true, amount: 0.2 },
};

export default function SplitAboutSection() {
  return (
    <section className="min-h-screen flex items-center px-8 md:px-12 py-24 gap-6">

      {/* Left: Notes window */}
      <div className="flex-1 min-w-0" style={{ perspective: "1200px" }}>
        <motion.div
          className="w-full rounded-2xl overflow-hidden"
          style={{ height: "75vh", boxShadow: WINDOW_SHADOW }}
          {...slideUp}
        >
          <NotesWindow />
        </motion.div>
      </div>

      {/* Right: Finder window */}
      <div className="flex-1 min-w-0" style={{ perspective: "1200px" }}>
        <motion.div
          className="w-full rounded-2xl overflow-hidden"
          style={{ height: "75vh", boxShadow: WINDOW_SHADOW }}
          {...slideUp}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          <FinderWindow />
        </motion.div>
      </div>

    </section>
  );
}
