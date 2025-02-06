import React, { use, useEffect, useState } from 'react'
import style from './MainQuestion.module.css'
import axios from 'axios'
import Submit from '@/components/Submitbutton/submitbutton'

interface MainQuestionProps {
    ques: any ;
    isCorrect: boolean;
    setIsCorrect : (val:boolean) => void;
    onCorrectAnswer : () => void;
}

function MainQuestion({ isCorrect , setIsCorrect , onCorrectAnswer}: MainQuestionProps) {
    const [answer, setAnswer] = useState('')

    // useEffect(() => {
    //     const getQuestions = async () => {
    //         await axios.get(`${process.env.NEXT_PUBLIC_API_URL}quiz/getRound`)
    //             .then((res) => {
    //                 console.log(res);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     }
    //     console.log("Inside Use Effect");
    //     getQuestions();
    // }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };

    const checkAnswer = () => {
        if(answer.toLowerCase() === 'paris') {
            return true;
        }
        return false;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(checkAnswer()) {
            setAnswer('');
            onCorrectAnswer();
            setIsCorrect(true)
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={style.form}>
                <h1>What is the capital of France?</h1>
                <input
                    type="text"
                    value={answer}
                    onChange={handleInputChange}
                    placeholder="Enter your answer"
                    className={style.input}
                />
                <Submit /> 
            </form>
        </>
    );
}

export default MainQuestion;
