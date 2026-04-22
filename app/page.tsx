"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

const FLOATING_SHADOW = [
  "0 2px 4px rgba(0,0,0,0.18)",
  "0 6px 12px rgba(0,0,0,0.16)",
  "0 14px 28px rgba(0,0,0,0.14)",
  "0 28px 56px rgba(0,0,0,0.10)",
  "0 52px 96px rgba(0,0,0,0.07)",
  "0 90px 160px rgba(0,0,0,0.05)",
].join(", ");

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
  delay: 0.3,
};

export default function Home() {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#f5f4f0] flex items-center justify-center p-6 overflow-hidden">

      {/* Background fades in */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DottedGlowBackground
          gap={22}
          radius={1.5}
          color="rgba(0,0,0,0.18)"
          glowColor="rgba(120,120,120,0.4)"
          opacity={0.7}
          speedMin={0.2}
          speedMax={0.7}
          speedScale={0.8}
        />
      </motion.div>

      {/* Perspective wrapper for 3D tilt */}
      <div className="relative z-10 w-full max-w-4xl">

        {/* Ground shadow — blurred ellipse that grows as terminal rises */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-28px",
            left: "50%",
            translateX: "-50%",
            width: "82%",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.32)",
            filter: "blur(32px)",
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scaleX: 0.3, scaleY: 0.3 }}
          animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
          transition={{ ...springTransition, delay: 0.35 }}
        />

        {/* Terminal springs in with elevation and tilt */}
        <motion.div
          style={{ boxShadow: FLOATING_SHADOW, borderRadius: "0.5rem", background: "rgb(23,23,23)" }}
          initial={{ scale: 0, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={springTransition}
        >
          <TerminalWindow onComplete={() => setTypingDone(true)} />
        </motion.div>
      </div>

    </main>
  );
}
