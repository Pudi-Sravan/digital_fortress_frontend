"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./page.module.scss";
import Loader from "@/components/3Dloader/Loader";
import Navbar from "@/components/Navbar/navbar";
import { FaGithub, FaInstagram, FaLinkedin, FaGoogle } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FloatingDock } from "@/components/floatingdock/floatingicons";
import { Meteors } from "@/components/Meteor/meteor";
import { useSession, signIn, signOut } from "next-auth/react";
import { MyContext } from "@/context/contextapi";
import Rulescard from "@/components/Rulescard/rulescard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [textDigital, setTextDigital] = useState("DIGITAL");
  const [textFortress, setTextFortress] = useState("FORTRESS");
  const [showMeteors, setShowMeteors] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { rulesopen, setRulesopen } = useContext(MyContext);

  const { data: session } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      setIsSignedIn(!!session);
    };

    checkSession();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [session]);

  useEffect(() => {
    if (!loading) {
      animateText();
    }
  }, [loading]);

  const animateText = () => {
    const chars = "疊法ఉॐ॰আ৩옥JরQUᄌX엽";
    let frame = 0;

    const randomizeText = (txt) => {
      return txt
        .split("")
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join("");
    };

    const intervalId = setInterval(() => {
      if (frame < 14) {
        setTextDigital(randomizeText(textDigital));
        setTextFortress(randomizeText(textFortress));
        frame++;
      } else {
        clearInterval(intervalId);
        setTextDigital("DIGITAL");
        setTextFortress("FORTRESS");
        setShowMeteors(true);
      }
    }, 140);
  };

  const handleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut();
  };

  const socialMediaItems = [
    {
      title: "Facebook",
      icon: <FaSquareFacebook style={{ color: "black" }} />,
      href: "https://www.facebook.com/yourprofile",
    },
    {
      title: "GitHub",
      icon: <FaGithub style={{ color: "black" }} />,
      href: "https://github.com/yourprofile",
    },
    {
      title: "Instagram",
      icon: <FaInstagram style={{ color: "black" }} />,
      href: "https://www.instagram.com/yourprofile",
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedin style={{ color: "black" }} />,
      href: "https://www.linkedin.com/in/yourprofile",
    },
  ];

  return (
    <main className={styles.main}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {showMeteors && <Meteors className={styles.meteor} />}
          <div className={styles.top}>
            <Navbar />
            <div className={styles.head}>
              <h1 className={styles.animatedText}>
                <span className={styles.digitalText}>{textDigital}</span>
                <span className={styles.space}> </span>
                <span className={styles.fortressText}>{textFortress}</span>
              </h1>
            </div>
          </div>

          {rulesopen ? (
            <Rulescard />
          ) : (
            !isSignedIn ? (
              <div className={styles.backbutton}>
                <FaGoogle size={30} />
                <div className={styles.buttonContainer1}>
                  <button
                    id='work'
                    type="button"
                    name="Hover"
                    className={styles.iconButton}
                    onClick={handleSignIn}
                  >
                    <FaGoogle size={27} />
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.backbutton}>
                Sign Out
                <div className={styles.buttonContainer1}>
                  <button
                    id='work'
                    type="button"
                    name="Hover"
                    className={styles.iconButton}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )
          )}
          <div className={styles.Footer}>
            <h1>CREATED BY GNU/LINUX USERS' GROUP</h1>
            <FloatingDock items={socialMediaItems} />
          </div>
        </>
      )}
    </main>
  );
}
