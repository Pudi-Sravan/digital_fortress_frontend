"use client";
import React, { useEffect, useState } from "react";
import styles from "./Question.module.scss";
import { Tabs } from "../Tabs/tabs";
import MainQuestion from "../MainQuestion/MainQuestion";
import Map from "@/components/Map/map";
import Rulescard from "../Rulescard/rulescard";
import QuestionTab from "../QuestionTab/questiontab";
import { useDeviceType } from "@/hooks/useDeviceType";

interface QuestionProps {
  isCorrect: boolean;
  setIsCorrect: (val: boolean) => any;
}

const Question: React.FC<QuestionProps> = ({ isCorrect, setIsCorrect }) => {
  const [tabs, setTabs] = useState([]);
  const [rulesShow, setRulesShow] = useState(false);
  const deviceType = useDeviceType();

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
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 max-sm:ml-2 ml-12 mt-8 text-white cursor-pointer flex items-center justify-center p-2 rounded-full bg-[rgba(44,255,5,0.1)] border-2  transition-transform transform hover:scale-105 border-[rgba(44,255,5,0.7)] hover:bg-white hover:border-transparent hover:text-black shadow-lg"
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
        <button
          onClick={() => setRulesShow(true)}
          className="absolute top-4 right-4 mr-12 max-sm:mr-2  mt-8 text-white cursor-pointer flex items-center justify-center p-2 rounded-full bg-[rgba(44,255,5,0.1)] border-2  transition-transform transform hover:scale-105 border-[rgba(44,255,5,0.7)] hover:bg-white hover:border-transparent hover:text-black shadow-lg"
          style={{
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            padding: "10px 18px",
          }}
        >
          Rules
        </button>
      </div>
      {rulesShow && (
        <Rulescard rulesShow={rulesShow} setRulesShow={setRulesShow} />
      )}
      <div className={styles.main}>
        {deviceType === "mobile" ? (
          <>
            <div className={styles.questionTab}>
              <QuestionTab />
            </div>
            <div className={styles.tabs}>
              <Tabs tabs={tabs} />
            </div>
            <div className={styles.outerquestion}>
              <div className={styles.question}>
                <Map />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.cluemap} style={{ marginRight: "80px" }}>
              {/* <div className={styles.map} style={{ marginBottom: "40px" }}>
            <MainQuestion
              isCorrect={isCorrect}
              setIsCorrect={setIsCorrect}
              onCorrectAnswer={handleCorrectAnswer}
            />
          </div> */}
              <QuestionTab />
              <Tabs tabs={tabs} />
            </div>
            <div className={styles.outerquestion}>
              <div className={styles.question}>
                <Map />
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={`${styles.overlay} ${isCorrect ? styles.overlayActive : ""}`}
      ></div>
    </>
  );
};

export default Question;
