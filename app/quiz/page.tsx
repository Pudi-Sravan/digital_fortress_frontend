"use client";
import styles from "./page.module.scss";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Question from "@/components/Questioncomponent/Question";
import Quizrules from "@/components/Rulesquiz/rulesquiz";

import CarAnimation from "./canvas";

export default function Quiz() {
  const [isCorrect, setIsCorrect] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<CarAnimation | null>(null);
  

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      const animation = new CarAnimation(containerRef.current);
      animation.start();
      animationRef.current = animation;

      return () => {
        animation.cleanUp();
      };
    }
  }, []);

  useEffect(() => {
    if (isCorrect && animationRef.current) {
      animationRef.current.accelerate(2.0, 0.5);
    }
  }, [isCorrect]);

  return (
    <>
      <div className={styles.main}>
        {/* <Quizrules/> */}
        <div ref={containerRef} />
        <Question isCorrect={isCorrect} setIsCorrect={setIsCorrect} />
        <div
          className={`${styles.overlay} ${
            isCorrect ? styles.overlayActive : ""
          }`}
        ></div>
      </div>
    </>
  );
}
