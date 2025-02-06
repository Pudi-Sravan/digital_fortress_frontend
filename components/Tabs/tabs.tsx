"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

// Type for the tab
type Tab = {
  title: string;
  value: string;
  content: string; // Question text
  answer: string;  // Correct answer
};

// Tabs component props
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
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (propTabs.length > 0) {
      setActive(propTabs[0]);
      setTabs(propTabs);
    }
  }, [propTabs]);

  const moveSelectedTabToTop = (idx: number) => {
    setActive(tabs[idx]);
    setFeedback(""); // Clear feedback when switching tabs
    setUserInput(""); // Clear input when switching tabs
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (active && userInput.trim().toLowerCase() === active.answer.toLowerCase()) {
        setFeedback("Correct Answer!");
      } else {
        setFeedback("Incorrect Answer. Try Again!");
      }
    }
  };

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
      <div className={styles.fadeInContainer}>
        <motion.div
          key={active.value}
          layoutId={active.value}
          className={styles.outerFadeIn}
          style={{
            opacity: 1,
            transition: "opacity 0.3s ease-in-out",
            zIndex: 2,
          }}
        >
          <div className={styles.innerFadeIn}>
            {/* Display Question */}
            <TypewriterEffect text={active.content} speed={50} pause={1000} />

            {/* Input Box for Answer */}
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Enter your answer"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className={styles.inputBox}
              />
              {feedback && <p className={styles.feedback}>{feedback}</p>}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

// Typewriter Effect
const TypewriterEffect = ({
  text,
  speed = 50,
  pause = 1000,
}: {
  text: string;
  speed?: number;
  pause?: number;
}) => {
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
};
