"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
  mode = "exit",
  cardBackground,
  cardClassName,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  mode?: "exit" | "enter";
  cardBackground?: string;
  cardClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: mode === "exit"
      ? ["start start", "end start"]
      : ["start end", "start start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [1, 0.75] : [1, 0.85];
  };

  // Exit: starts flat, tilts back and fades out
  const exitRotate = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const exitScale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const exitTranslate = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);

  // Enter: starts tilted forward, settles flat and fades in
  const dims = scaleDimensions();
  const enterRotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const enterScale = useTransform(scrollYProgress, [0, 1], [dims[1], dims[0]]);
  const enterTranslate = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const enterOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0.6, 1]);

  const rotate = mode === "exit" ? exitRotate : enterRotate;
  const scale = mode === "exit" ? exitScale : enterScale;
  const translate = mode === "exit" ? exitTranslate : enterTranslate;
  const opacity = mode === "exit" ? exitOpacity : enterOpacity;

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-start justify-center relative p-2 md:p-10 pt-28 md:pt-32"
      ref={containerRef}
    >
      <div
        className="py-4 md:py-10 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
          opacity={opacity}
          background={cardBackground}
          cardClassName={cardClassName}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  opacity,
  children,
  background,
  cardClassName,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  opacity: MotionValue<number>;
  children: React.ReactNode;
  background?: string;
  cardClassName?: string;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        opacity,
        background: background ?? "rgb(23,23,23)",
        boxShadow: FLOATING_SHADOW,
      }}
      className={`mx-auto w-full rounded-xl overflow-hidden ${cardClassName ?? "max-w-5xl"}`}
    >
      {children}
    </motion.div>
  );
};

const FLOATING_SHADOW = [
  "0 2px 4px rgba(0,0,0,0.10)",
  "0 6px 12px rgba(0,0,0,0.09)",
  "0 14px 28px rgba(0,0,0,0.08)",
  "0 28px 56px rgba(0,0,0,0.06)",
  "0 52px 96px rgba(0,0,0,0.04)",
].join(", ");
