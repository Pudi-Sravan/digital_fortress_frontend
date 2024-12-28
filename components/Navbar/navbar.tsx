import React, { useState, useRef, useEffect } from "react";
import Header from "../header";
import StickyCursor from "../stickyCursor/";
import ProfileModal from "@/components/ProfileModal/profilemodal"; // Import the ProfileModal component
import styles from "./navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXing } from "@fortawesome/free-brands-svg-icons"; // Example icon
import Link from "next/link";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useSession } from "next-auth/react";

interface NavbarProps {
  rulesShow: boolean;
  setRulesShow: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ rulesShow, setRulesShow , isProfileModalOpen, setIsProfileModalOpen}: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const stickyElement = useRef<HTMLDivElement | null>(null);
  const deviceType = useDeviceType();
  const { data: session } = useSession();
  
  // Toggle sidebar
  function handleHeaderClick() {
    setIsSidebarOpen((prev) => !prev);
  }

  // Toggle modal visibility
  // function handleProfileClick() {
  //   setIsProfileModalOpen(!isProfileModalOpen);
  // }

  // Use useEffect to trigger pulse effect after ::before effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSidebarOpen) {
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
        {deviceType !== "monitor" && (
          <Header ref={stickyElement} onClick={handleHeaderClick} />
        )}
        {/* Profile Picture with Click Event */}
        <div className={styles.picdiv} onClick={() => setIsProfileModalOpen(!isProfileModalOpen)} style={{cursor: "pointer"}}>
          {session && session.user?.image && (
            <img
              src={session?.user?.image}
              alt="ProfilePic"
              width={50}
              height={50}
              className={styles.profile}
   
            />
          )}
        </div>
        {deviceType === "monitor" && (
          <ul className={styles.Options}>
            <li className={styles.contentitem}>
              <Link href="/" className={styles.linklinkhelike}>
                <span>HOME</span>
              </Link>
            </li>
            <li
              className={styles.contentitem}
              onClick={() => setRulesShow(!rulesShow)}
            >
              <span style={{ cursor: "pointer" }}>RULES</span>
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
        )}
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
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              <h1>HOME</h1>
            </Link>
            <Link
              href="#"
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
              onClick={() => {
                setRulesShow(true);
                handleHeaderClick();
              }}
              
            >
              <h1>RULES</h1>
            </Link>
            <Link
              href="/leaderboard"
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              <h1>LEADERBOARD</h1>
            </Link>
            <Link
              href="/quiz"
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              <h1>QUIZ</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
