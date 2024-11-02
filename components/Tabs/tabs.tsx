"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
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
                className={cn(
                  "absolute inset-0",
                  activeTabClassName
                )}
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

export const FadeInDiv = ({ tabs, active, hovering }) => {
  return (
    <div className={styles.fadeInContainer}>
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          className={styles.outerFadeIn}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -45 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: active.value === tab.value ? [0, 10, 0] : 0,
          }}
        >
          {active.value === tab.value && (
            <div className={styles.innerFadeIn}>
              {tab.content}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
