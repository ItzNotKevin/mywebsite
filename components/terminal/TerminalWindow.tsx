"use client";
import { Terminal } from "@/components/ui/terminal";

export default function TerminalWindow({ onComplete }: { onComplete?: () => void }) {
  return (
    <Terminal
      commands={[
        "initializing portfolio...",
        "loading sections...",
        "echo 'welcome to kevinli.dev'",
        "scroll to explore ↓",
      ]}
      outputs={{
        0: ["✔ system ready"],
        1: ["✔ about  ✔ projects  ✔ contact"],
        2: ["welcome to kevinli.dev"],
        3: ["↓  scroll down to continue"],
      }}
      username="kevin@portfolio"
      typingSpeed={42}
      delayBetweenCommands={400}
      initialDelay={1400}
      enableSound={true}
      onComplete={onComplete}
      className="max-w-none px-0"
    />
  );
}
