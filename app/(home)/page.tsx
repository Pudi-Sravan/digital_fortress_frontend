"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import Loader from "@/components/3Dloader/Loader";
import Navbar from "@/components/Navbar/navbar";
import { FaGithub, FaInstagram, FaLinkedin, FaGoogle } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FloatingDock } from "@/components/floatingdock/floatingicons";
import { Meteors } from "@/components/Meteor/meteor";
import { useSession, getSession } from "next-auth/react";
import handleSignIn from "@/components/GoogleSignIn/googleSignIn";
import handleLogOut from "@/components/Logout/Logout";
import Rulescard from "@/components/Rulescard/rulescard";
import Question from "@/components/Questioncomponent/Question";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [textDigital, setTextDigital] = useState("DIGITAL");
  const [textFortress, setTextFortress] = useState("FORTRESS");
  const [showMeteors, setShowMeteors] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [ rulesShow, setRulesShow ] = useState(false);


  const { data: session, status } = useSession();

  useEffect(() => {
    const signedIn = async () => {
      console.log(session);
      if (session) {
        // await backendSignIn();
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    };

    signedIn();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      animateText();
    }
  }, [loading]);

  const animateText = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;

    const randomizeText = (txt: string) => {
      return txt
        .split("")
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join("");
    };

    const intervalId = setInterval(() => {
      if (frame < 30) {
        // Number of frames for the animation
        setTextDigital(randomizeText(textDigital));
        setTextFortress(randomizeText(textFortress));
        frame++;
      } else {
        clearInterval(intervalId);
        setTextDigital("DIGITAL");
        setTextFortress("FORTRESS");
      }
      setTimeout(() => {
        setShowMeteors(true);
      }, 1140);
    }, 40);
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
          {rulesShow && <Rulescard rulesShow={rulesShow} setRulesShow={setRulesShow}/>}
        <Question />
        
          <div className={styles.main2}>
            <Navbar rulesShow={rulesShow} setRulesShow={setRulesShow}/>
            <div className={styles.head}>
              <h1 className={styles.animatedText}>
                <span className={styles.digitalText}>{textDigital}</span>
                <span className={styles.space}> </span>
                <span className={styles.fortressText}>{textFortress}</span>
              </h1>
            </div>
            {!isSignedIn ? (
              <div className={styles.backbutton}>
                <FaGoogle size={30} />
                <div className={styles.buttonContainer1}>
                  <button
                    id="work"
                    type="button"
                    name="Hover"
                    className={styles.iconButton}
                    onClick={async (
                      event:
                        | React.MouseEvent<HTMLButtonElement>
                        | React.TouchEvent<HTMLButtonElement>
                    ) => {
                      event.preventDefault();
                      await handleSignIn();
                    }}
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
                    id="work"
                    type="button"
                    name="Hover"
                    className={styles.iconButton}
                    onClick={async (
                      event:
                        | React.MouseEvent<HTMLButtonElement>
                        | React.TouchEvent<HTMLButtonElement>
                    ) => {
                      event.preventDefault();
                      await handleLogOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            <div className={styles.Footer}>
              <h1>CREATED BY GNU/LINUX USERS' GROUP</h1>
              <FloatingDock items={socialMediaItems} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
