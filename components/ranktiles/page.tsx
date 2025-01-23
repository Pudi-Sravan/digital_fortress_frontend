import React, { useRef } from 'react';
import styles from "./ranktiles.module.scss";
import leaderboard from "@/data.json";

interface Ranking {
  image: string;
  name: string;
  rank: number;
  score: number;
}

export default function Tiles({rankings}: {rankings: Ranking[]}) {
  const data = rankings;

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

  return (
    <div className={styles.outerDiv}>
      {data.map((item, index) => (
        <div className={styles.outerclippedrec}>
          <div
          key={index}
          className={styles.clippedRectangle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseOut}
        >
          <div className={styles.namerank}>
          <p>{item.rank}</p>
          <p style={{marginLeft:"12px",fontSize:"20px"}}>{item.name}</p>
          </div>
          
          <div className={styles.scorebox}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseOut}>
            <p>{item.score}</p>
          </div>
        </div>
        </div>
        
      ))}
    </div>
  );
}
