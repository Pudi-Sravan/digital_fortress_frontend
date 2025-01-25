import React, { useEffect, useState } from "react";
import styles from "./Question.module.scss";
import { Tabs } from "../Tabs/tabs";
import MainQuestion from "../MainQuestion/MainQuestion";
import axios from "axios";

interface QuestionProps{
  isCorrect : boolean ;
  setIsCorrect : (val :boolean) => any ;
}

const Question : React.FC<QuestionProps> = ({isCorrect , setIsCorrect}) => {
  const [tabs, setTabs] = useState([]);
  const [question, setQuestion] = useState<any>(null);

  useEffect(() => {
    const fetchTabs = async () => {
      // const tabData: any = [
      //   {
      //     title: "Clue 1",
      //     value: "clue1",
      //     content: "This is the first clue that will guide you through the mystery.",
      //   },
      //   {
      //     title: "Clue 2",
      //     value: "clue2",
      //     content: "This clue provides additional insights and hints.",
      //   },
      //   {
      //     title: "Clue 3",
      //     value: "clue3",
      //     content: "The third clue will help you make connections between events.",
      //   },
      // ];
      try {
        const ques = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}quiz/getRound`);
        setQuestion(ques);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}quiz/getClues`);
        const tabData = response.data.clues.map((clue: any, index: number) => ({
          id : clue.id,
          question : clue.question,
          position : clue.position,
          isSolved : clue.solved ,
          title: `Clue ${index + 1}`,
          value: `clue${index + 1}`,
          content: clue.question,
        }));
        setTabs(tabData);
        setQuestion(response.data.question.question);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };

    fetchTabs();
  }, []);

  const handleCorrectAnswer = () => {
    setIsCorrect(true);
    setTimeout(() => {
      setIsCorrect(false);
    }, 1500);
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.outerquestion}>
          <div className={styles.question}>
            <MainQuestion ques={question} isCorrect={isCorrect} setIsCorrect={setIsCorrect} onCorrectAnswer={handleCorrectAnswer}/>
          </div>
        </div>
        <div className={styles.cluemap}>
          <Tabs tabs={tabs} />
          <div className={styles.map}>
            Here is the map !
          </div>
        </div>
      </div>
      <div className={styles.overlay + " " + (isCorrect ? styles.overlayActive : "")}></div>
    </>
  );
}

export default Question ;