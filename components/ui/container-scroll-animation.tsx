"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue, useMotionTemplate } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
  mode = "exit",
  cardBackground,
  cardClassName,
  cardMinHeight,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  mode?: "exit" | "enter";
  cardBackground?: string;
  cardClassName?: string;
  cardMinHeight?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: mode === "exit"
      ? ["start start", "end start"]
      : ["start end", "end end"],
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

  // Shadow: float → grounded as card lands
  const shadowBlur = useTransform(scrollYProgress, [0, 1], [96, 8]);
  const shadowSpread = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0.06, 0.14]);
  const enterShadow = useMotionTemplate`0 2px ${shadowBlur}px ${shadowSpread}px rgba(0,0,0,${shadowOpacity})`;

  const rotate = mode === "exit" ? exitRotate : enterRotate;
  const scale = mode === "exit" ? exitScale : enterScale;
  const translate = mode === "exit" ? exitTranslate : enterTranslate;
  const opacity = mode === "exit" ? exitOpacity : enterOpacity;
  const shadow = mode === "exit" ? FLOATING_SHADOW : enterShadow;

  return (
    <div
      className={`flex justify-center relative ${
        mode === "enter"
          ? "h-[50rem] md:h-[60rem] items-end p-2 md:p-10 pb-12 md:pb-16"
          : "h-[60rem] md:h-[80rem] items-start p-2 md:p-10 pt-28 md:pt-32"
      }`}
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
          shadow={shadow}
          background={cardBackground}
          cardClassName={cardClassName}
          cardMinHeight={cardMinHeight}
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
  shadow,
  children,
  background,
  cardClassName,
  cardMinHeight,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  opacity: MotionValue<number>;
  shadow?: MotionValue<string> | string;
  children: React.ReactNode;
  background?: string;
  cardClassName?: string;
  cardMinHeight?: string;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        opacity,
        background: background ?? "rgb(23,23,23)",
        boxShadow: shadow ?? FLOATING_SHADOW,
        minHeight: cardMinHeight,
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
