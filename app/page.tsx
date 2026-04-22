"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import NotesWindow from "@/components/notes/NotesWindow";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
  delay: 0.3,
};

export default function Home() {
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = typingDone ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [typingDone]);

  return (
    <main className="relative bg-[#f5f4f0] overflow-x-hidden">

      {/* Background fades in */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
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

      {/* Hero with ContainerScroll */}
      <ContainerScroll titleComponent={null}>
        {/* Terminal springs in */}
        <motion.div
          className="w-full h-full"
          initial={{ scale: 0, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={springTransition}
        >
          <TerminalWindow onComplete={() => setTypingDone(true)} />
        </motion.div>
      </ContainerScroll>

      {/* About — Notes window scrolls in */}
      <ContainerScroll
        titleComponent={null}
        mode="enter"
        cardBackground="#faf8f2"
        cardClassName="max-w-xl"
      >
        <NotesWindow />
      </ContainerScroll>

    </main>
  );
}
