import React from "react";
import styles from "./questiontab.module.scss";
import Submit from "../Submitbutton/submitbutton"; 
import { useDeviceType } from "@/hooks/useDeviceType";

const QuestionTab = () => {
  const deviceType = useDeviceType();
  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <p className={styles.question}>What is the capital of India?</p>
        {/* <div className={styles.border}></div> */}
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.inputSection}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter text"
          />
        </div>
        {deviceType === "monitor" && (<div className={styles.row}>
          <Submit /> 
        </div>)}
      </div>
    </div>
  );
};

export default QuestionTab;
