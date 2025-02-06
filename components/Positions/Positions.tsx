"use client";
import styles from './Positions.module.scss';
import Card from "./Card";
import leaderboard from "@/data.json";
import { useDeviceType } from '@/hooks/useDeviceType';

interface Ranking {
    image: string;
    name: string;
    rank: number;
    score: number;
}

export default function Positions({rankings}: {rankings: Ranking[]}) {
    return (
        <div className={styles.container}>
            {rankings.map((ranking, index) => (
                <Card
                    key={index}
                    pos={ranking.rank === 1 ? 'first' : ranking.rank === 2 ? 'second' : 'third'}
                    username={ranking.name}
                    avatar={ranking.image}
                    score={ranking.score.toString()}
                />
            ))}
        </div>
    );
}