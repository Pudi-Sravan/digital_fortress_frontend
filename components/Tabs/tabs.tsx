"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

// Type for the tab
type Tab = {
  title: string;
  value: string;
  content?: string[];
};

// Type for the Tabs component props
export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}) => {
  const [active, setActive] = useState<Tab | null>(propTabs[0] || null);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  useEffect(() => {
    if (propTabs.length > 0) {
      setActive(propTabs[0]);
      setTabs(propTabs);
    }
  }, [propTabs]);

  const moveSelectedTabToTop = (idx: number) => {
    setActive(tabs[idx]);
  };

  const [hovering, setHovering] = useState(false);

  if (!active) return null;

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn("absolute inset-0", activeTabClassName)}
                style={{
                  backgroundColor: "black",
                  border: "2px solid #39ff14",
                  borderRadius: "8px",
                  zIndex: -1,
                }}
              />
            )}
            <span className="relative block" style={{ color: "lightgreen" }}>
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv tabs={tabs} active={active} hovering={hovering} />
    </>
  );
};

// Type for FadeInDiv props
export const FadeInDiv = ({ tabs, active, hovering }) => {
  return (
    <div className={styles.fadeInContainer}>
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          className={styles.outerFadeIn}
          style={{
            opacity: active.value === tab.value ? 1 : 0.5,
            transition: "opacity 0.3s ease-in-out",
            zIndex: active.value === tab.value ? 2 : 1,
            top: hovering ? idx * -15 : 5,
          }}
          animate={{
            y: active.value === tab.value ? [0, 40, 0] : 0,
          }}
        >
          {active.value === tab.value && (
            <div className={styles.innerFadeIn}>
              {/* Inline Typewriter effect */}
              <TypewriterEffect
                text={
                  typeof tab.content === "string"
                    ? tab.content
                    : tab.content.join(" ")
                }
                speed={50}
                pause={1000}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Typewriter effect function
const TypewriterEffect = ({ text, speed = 50, pause = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (charIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
      }
    }
  }, [charIndex, text, speed, isTyping]);

  return (
    <div className={styles.typewriter}>
      <h3>
        {displayedText}
        {isTyping && <span className={styles.cursor} />}
      </h3>
    </div>
  );
}