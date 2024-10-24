import React, { useEffect, useState } from "react";
import styles from "./Question.module.scss";
import { Tabs } from "../Tabs/tabs";


export default function Question() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    // Simulating fetching data for tabs
    const fetchTabs = async () => {
      const tabData = [
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
        {
          title: "Map",
          value: "map",
          content: "Here is the map that shows the locations of interest.",
        },
      ];
      setTabs(tabData);
    };

    fetchTabs();
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.question}></div>
        <div className={styles.cluemap}>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </>
  );
}
