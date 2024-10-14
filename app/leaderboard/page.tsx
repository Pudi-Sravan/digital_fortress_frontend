"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import Loader from "@/components/3Dloader/Loader";
import Navbar from "@/components/Navbar/navbar";
import { FaGithub, FaInstagram, FaLinkedin, FaGoogle } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FloatingDock } from "@/components/floatingdock/floatingicons";
import Positions from "@/components/Positions/Positions";
import Tiles from "@/components/ranktiles/page";

export default function Leaderboard(){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
      }, []);

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
            <><div className={styles.main2}>
              <Navbar />
              <div className={styles.ranks}>
              <Positions />
                <Tiles />
              
              </div>
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