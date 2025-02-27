import React, { useRef } from "react";
import styles from "./ranktiles.module.scss";
import leaderboard from "@/data.json";
import Canvas from "../Positions/Canvas";
import { useDeviceType } from "@/hooks/useDeviceType";

interface Ranking {
  image: string;
  name: string;
  rank: number;
  score: number;
}

export default function Tiles({rankings}: {rankings: Ranking[]}) {
  const data = rankings;
  const deviceType = useDeviceType();

  const spanRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const relX = e.pageX - rect.left;
    const relY = e.pageY - rect.top;

    if (spanRef.current) {
      spanRef.current.style.top = `${relY}px`;
      spanRef.current.style.left = `${relX}px`;
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const relX = e.pageX - rect.left;
    const relY = e.pageY - rect.top;

    if (spanRef.current) {
      spanRef.current.style.top = `${relY}px`;
      spanRef.current.style.left = `${relX}px`;
    }
  };

  let color = "#C0C0C0";

  return (
    <div className={styles.outerDiv}>
      {deviceType === "monitor" &&
        data.map((item, index) => (
          <div key={index} className={styles.outerclippedrec}>
            <div
              className={styles.clippedRectangle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseOut}
            >
              <div className={styles.namerank}>
                <p>{data.indexOf(item) + 4}</p>
                <p style={{ marginLeft: "12px", fontSize: "20px" }}>
                  {item.username}
                </p>
              </div>

              <div
                className={styles.scorebox}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseOut}
              >
                <p>{item.score}</p>
              </div>
            </div>
          </div>
        ))}
      {deviceType === "mobile" && (
        <div className={styles.outerDiv}>
          {data
            .filter((_, index) => index >= 2) // Start rendering from index 2
            .map((item, index) => (
              <div key={index} className={styles.outerclippedrec}>
                {index === 0 && <Canvas color="silver" />}
                {index === 1 && <Canvas color="#CD7F32" />}
                <div
                  className={`${styles.clippedRectangle} ${
                    index === 0
                      ? styles.secondItem
                      : index === 1
                      ? styles.thirdItem
                      : ""
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseOut}
                >
                  <div className={styles.namerank}>
                    <p>{index + 4}</p>
                    <p style={{ marginLeft: "12px", fontSize: "20px" }}>
                      {item.username}
                    </p>
                  </div>
                  <div
                    className={styles.scorebox}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseOut}
                  >
                    <p>{item.score}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
