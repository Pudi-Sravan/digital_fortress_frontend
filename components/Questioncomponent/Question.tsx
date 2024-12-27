"use client";
import React, { useEffect, useState } from "react";
import styles from "./Question.module.scss";
import { Tabs } from "../Tabs/tabs";
import MainQuestion from "../MainQuestion/MainQuestion";
import Map from "@/components/Map/map";

interface QuestionProps {
  isCorrect: boolean;
  setIsCorrect: (val: boolean) => any;
}

const Question: React.FC<QuestionProps> = ({ isCorrect, setIsCorrect }) => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchTabs = async () => {
      const tabData: any = [
        {
          title: "Clue 1",
          value: "clue1",
          content:
            "This is the first clue that will guide you through the mystery.",
        },
        {
          title: "Clue 2",
          value: "clue2",
          content: "This clue provides additional insights and hints.",
        },
        {
          title: "Clue 3",
          value: "clue3",
          content:
            "The third clue will help you make connections between events.",
        },
      ];
      setTabs(tabData);
    };

    fetchTabs();
  }, []);

  const handleCorrectAnswer = () => {
    setIsCorrect(true);
    setTimeout(() => {
      setIsCorrect(false);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 ml-12 mt-8 text-white cursor-pointer flex items-center justify-center p-2 rounded-full bg-[rgba(44,255,5,0.1)] border-2  transition-transform transform hover:scale-105 border-[rgba(44,255,5,0.7)] hover:bg-white hover:border-transparent hover:text-black shadow-lg"
        style={{
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <span
          className="text-lg font-bold"
          style={{
            display: "inline-block",
            transform: "rotate(180deg)",
            marginRight: "5px",
          }}
        >
          ←
        </span>
        Back
      </button>
      <div className={styles.main}>
        <div className={styles.outerquestion}>
          <div className={styles.question}>
            <MainQuestion
              isCorrect={isCorrect}
              setIsCorrect={setIsCorrect}
              onCorrectAnswer={handleCorrectAnswer}
            />
          </div>
        </div>
        <div className={styles.cluemap}>
          <Tabs tabs={tabs} />
          <div className={styles.map}>
            <Map />
          </div>
        </div>
      </div>
      <div
        className={`${styles.overlay} ${isCorrect ? styles.overlayActive : ""}`}
      ></div>
    </>
  );
};

export default Question;
