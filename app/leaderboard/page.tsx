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
import { Meteors } from "@/components/Meteor/meteor";
import Rulescard from "@/components/Rulescard/rulescard";
import axios from "axios";


export default function Leaderboard(){
    const [loading, setLoading] = useState(true);
    const [ rulesShow, setRulesShow ] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
      }, []);

    useEffect(() => {
      const fetchLeaderboard = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}quiz/leaderboard`);
          console.log("Leaderboard data:", response.data.standings);
          setLeaderboardData(response.data.standings);
        } catch (error) {
          console.error("Error fetching leaderboard data:", error);
        }
      };
      fetchLeaderboard();
    }, []);

    // const rankings = leaderboardData.splice(0,3);
    // const leaderboard = leaderboardData.splice(3, leaderboardData.length);

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
            {rulesShow && <Rulescard rulesShow={rulesShow} setRulesShow={setRulesShow}/>}
            {/* <Navbar 
              rulesShow={rulesShow} 
              setRulesShow={setRulesShow} 
              isProfileModalOpen={isProfileModalOpen} 
              setIsProfileModalOpen={setIsProfileModalOpen} 
            /> */}
            <div className={styles.main2}>
            <Navbar 
              rulesShow={rulesShow} 
              setRulesShow={setRulesShow} 
              isProfileModalOpen={isProfileModalOpen} 
              setIsProfileModalOpen={setIsProfileModalOpen} 
            />
              <div className={styles.ranks}>
              <Positions rankings={leaderboardData.slice(0,3)}/>
              { leaderboardData.length > 3 ? 
              <Tiles rankings={leaderboardData.slice(3,-1)}/>
              : null }
              
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