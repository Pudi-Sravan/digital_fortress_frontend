"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./Question.module.scss";
import MainQuestion from "../MainQuestion/MainQuestion";
import { useRouter } from "next/navigation";
import Map from "@/components/Map/map";
import Rulescard from "../Rulescard/rulescard";
import { useDeviceType } from "@/hooks/useDeviceType";
import axios from "axios";

interface QuestionProps {
  isCorrect: number;
  setIsCorrect: (val: number) => any;
}

const Question: React.FC<QuestionProps> = ({ isCorrect, setIsCorrect }) => {
  const [tabs, setTabs] = useState([]);
  const [question, setQuestion] = useState<any>(null);
  const navigate = useRouter();

  useEffect(() => {
    const fetchTabs = async () => {
      // const tabData: any = [
      //   {
      //     title: "Clue 1",
      //     value: "clue1",
      //     content:
      //       "This is the first clue that will guide you through the mystery.",
      //   },
      //   {
      //     title: "Clue 2",
      //     value: "clue2",
      //     content: "This clue provides additional insights and hints.",
      //   },
      //   {
      //     title: "Clue 3",
      //     value: "clue3",
      //     content:
      //       "The third clue will help you make connections between events.",
      //   },
      // ];
        try {
          const ques = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}quiz/getRound`,
            {
              headers: {
                Authorization: `Token ${localStorage.token}`,
              },
            }
          );

          if (ques.data.status === 200) {
            setQuestion(ques.data.question);
          }

          const clue_response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}quiz/getClue`,
            {
              headers: {
                Authorization: `Token ${localStorage.token}`,
              },
            }
          );
          console.log(clue_response.data.status) ;
    
          if (clue_response.data.status == 200) {
            const tabData = clue_response.data.clues.map(
              (clue: any, index: number) => ({
                id: clue.id,
                question: clue.question,
                position: clue.position,
                isSolved: clue.solved,
                title: `Clue ${index + 1}`,
                value: `clue${index + 1}`,
                content: clue.question,
              })
            );
            setTabs(tabData);
            console.log(tabData);
          }
        } catch (error) {
          console.error("Error fetching question data:", error);
        }
      };
      // setTabs(tabData);

    fetchTabs();
  }, []); //[isCorrect]

  const [rulesShow, setRulesShow] = useState(false);
  const deviceType = useDeviceType();

  const handleCorrectAnswer = async () => {
    setIsCorrect(1);
    // setTimeout(() => {
    //   setIsCorrect(0);
    // }, 1500);

    try {
      const ques = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}quiz/getRound`,
        {
          headers: {
            Authorization: `Token ${localStorage.token}`,
          },
        }
      );

      if (ques.data.status === 200) {
        setQuestion(ques.data.question);
        setIsCorrect(0);
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
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
          onClick={() => navigate.push("/")}
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
            <MainQuestion
              ques={question}
              isCorrect={isCorrect}
              setIsCorrect={setIsCorrect}
              onCorrectAnswer={handleCorrectAnswer}
              clues={tabs}
            />

            {/* <div className={styles.tabs}>
              <Tabs tabs={tabs} />
            </div> */}
            <div className={styles.outerquestion}>
              <div className={styles.question}>
                <Map />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.cluemap} style={{ marginRight: "80px" }}>
              <MainQuestion
                ques={question}
                isCorrect={isCorrect}
                setIsCorrect={setIsCorrect}
                onCorrectAnswer={handleCorrectAnswer}
                clues={tabs}
              />
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
