"use client" ;
import styles from './Positions.module.scss';
import Card from "./Card" ;
import leaderboard from "@/data.json";
import { useDeviceType } from '@/hooks/useDeviceType';

export default function Positions() {
    const deviceType = useDeviceType();
    const data = leaderboard.slice(0, 3);
    return (
        <div className={styles.container}>
            {deviceType === "monitor" && (
                <Card pos='second' username="Jane Doe" avatar="https://www.w3schools.com/howto/img_avatar.png" score="900" />
            )}
            <Card pos='first' username="John Doe" avatar="https://www.w3schools.com/howto/img_avatar.png" score="1000" />
            {deviceType === "monitor" && (
                <Card pos='third' username="Jack Doe" avatar="https://www.w3schools.com/howto/img_avatar.png" score="800" />
            )}
        </div>
    );
}