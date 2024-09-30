import React, { useState, useRef, useEffect, useContext } from "react";
import Header from "../header";
import StickyCursor from "../stickyCursor/";
import styles from "./navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXing } from "@fortawesome/free-brands-svg-icons"; // Example icon
import Link from "next/link";
import { MyContext } from "@/context/contextapi";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const stickyElement = useRef(null);
  const { rulesopen, setRulesopen } = useContext(MyContext);
  function handleHeaderClick() {
    setIsSidebarOpen(!isSidebarOpen);
  }
 function togglerules(){
  setRulesopen(!rulesopen)
 }
  // Use useEffect to trigger pulse effect after ::before effect
  useEffect(() => {
    if (isSidebarOpen) {
      // Add pulse effect after 0.4s, the duration of ::before transition
      const timer = setTimeout(() => {
        setIsPulseActive(true);
      }, 400); // Match this with the transition duration of ::before effect

      return () => clearTimeout(timer);
    } else {
      // Reset pulse effect when sidebar closes
      setIsPulseActive(false);
    }
  }, [isSidebarOpen]);

  return (
    <div>
      <div className={`${styles.nav} ${isSidebarOpen ? styles.hidden : ""}`}>
        <Header ref={stickyElement} onClick={handleHeaderClick} />
        <StickyCursor stickyElement={stickyElement} />
        <div className={styles.Options}>
          <li className={styles.contentitem}>
            <a href="#" className={styles.linklinkhelike}>
              <span>HOME</span>
            </a>
          </li>
          <li className={styles.contentitem}>
            <a className={styles.linklinkhelike} onClick={togglerules}>
              <span>RULES</span>
            </a>
          </li>
          <li className={styles.contentitem}>
            <Link href="/leaderboard" className={styles.linklinkhelike}>
              <span>LEADERBOARD</span>
            </Link>
          </li>

          {/* <h1>HOME</h1>
          <h1>RULES</h1>
          <h1>LEADERBOARD</h1> */}
        </div>
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
              href="#"
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              <span>HOME</span>
            </Link>
            <h1
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              RULES
            </h1>
            <Link
              href="leaderboard"
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              <span>LEADERBOARD</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
