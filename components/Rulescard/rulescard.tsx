"use client";
import React, { useState } from 'react';
import styles from "./rulescard.module.scss";

export default function Rulescard({ rulesShow, setRulesShow }: { rulesShow: boolean; setRulesShow: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [textRules, setTextRules] = useState("RULES");
    const [isFlipped, setIsFlipped] = useState(false); // State to track if the card is flipped

    const handleCardClick = (event: React.MouseEvent) => {
        // Prevent closing the card when clicking inside it
        event.stopPropagation();
        setIsFlipped(prev => !prev); // Toggle the flip state
    };

    return (
        <div className={styles.cardContainer} onClick={() => setRulesShow(false)}>
            <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleCardClick}>
                <div className={`${styles.cardSide} ${styles.cardFront}`}>
                    <div className={styles.head}>
                        <h1 className={styles.animatedText}>
                            <span className={styles.digitalText}>{textRules}</span>
                        </h1>
                    </div>
                </div>
                <div className={`${styles.cardSide} ${styles.cardBack}`}>
                    <h2>Back Side</h2>
                    <p>This is the back of the card.</p>
                </div>
            </div>
        </div>
    );
}
