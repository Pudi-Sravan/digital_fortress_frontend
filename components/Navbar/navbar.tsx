import React, { useState, useRef, useEffect } from "react";
import Header from "../header";
import StickyCursor from "../stickyCursor/";
import styles from "./navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXing } from "@fortawesome/free-brands-svg-icons"; // Example icon
import Link from "next/link";

interface NavbarProps {
  rulesShow: boolean;
  setRulesShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ rulesShow, setRulesShow }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const stickyElement = useRef<HTMLDivElement | null>(null);

  function handleHeaderClick() {
    setIsSidebarOpen((prev) => !prev);
  }

  // Use useEffect to trigger pulse effect after ::before effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSidebarOpen) {
      // Add pulse effect after 0.4s
      timer = setTimeout(() => {
        setIsPulseActive(true);
      }, 400);
    } else {
      setIsPulseActive(false);
    }

    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  return (
    <div>
      <div className={`${styles.nav} ${isSidebarOpen ? styles.hidden : ""}`}>
        <Header ref={stickyElement} onClick={handleHeaderClick} />
        <StickyCursor stickyElement={stickyElement} />
        <ul className={styles.Options}>
          <li className={styles.contentitem}>
            <Link href="/" className={styles.linklinkhelike}>
              <span>HOME</span>
            </Link>
          </li>
          <li className={styles.contentitem} onClick={() => setRulesShow(!rulesShow)}>
            <span style={{cursor:'pointer'}}>RULES</span>
          </li>
          <li className={styles.contentitem}>
            <Link href="/leaderboard" className={styles.linklinkhelike}>
              <span>LEADERBOARD</span>
            </Link>
          </li>
          <li className={styles.contentitem}>
            <Link href="/quiz" className={styles.linklinkhelike}>
              <span>QUIZ</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <FontAwesomeIcon
            className={styles.close}
            icon={faXing}
            style={{ cursor: "pointer" }}
            onClick={handleHeaderClick}
          />
          <div className={styles.navOptions}>
            <Link
              href="/"
              className={`${styles.btn5} ${isPulseActive ? styles.pulseActive : ""}`}
            >
              <h1>HOME</h1>
            </Link>
            <Link
              href="#"
              className={`${styles.btn5} ${isPulseActive ? styles.pulseActive : ""}`}
              onClick={() => setRulesShow(true)} // Add onClick to open rules
            >
              <h1>RULES</h1>
            </Link>
            <Link
              href="/leaderboard"
              className={`${styles.btn5} ${isPulseActive ? styles.pulseActive : ""}`}
            >
              <h1>LEADERBOARD</h1>
            </Link>
            <Link
              href="/quiz"
              className={`${styles.btn5} ${isPulseActive ? styles.pulseActive : ""}`}
            >
              <h1>QUIZ</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
