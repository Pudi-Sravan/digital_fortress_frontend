import React, { useState } from 'react';
import style from './Question.module.css';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface QuestionProps {
    question: string;
    centre: any;
    status: number;
    detail: number;
}

const Question: React.FC<{ ques: QuestionProps}> = ({ ques }) => {
    const [answer, setAnswer] = useState('');
    const session = useSession();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (session) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}quiz/checkRound`, {
                user:{
                    username: session.data?.user?.email,
                },
                answer: answer,
            })
            .then(response => {
            console.log('Success:', response.data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        } else {
            console.log('User is not authenticated');
        }
        console.log('Submitted answer:', answer);
    };

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <h1>{ques.question}</h1>
            <input
                type="text"
                value={answer}
                onChange={handleInputChange}
                placeholder="Enter your answer"
                className={style.input}
            />
            <button type="submit" className={style.submitButton}>Submit</button>
        </form>
    );
};

export default Question;