import React, { useEffect, useState } from 'react'
import style from './MainQuestion.module.css'
import axios from 'axios'

function MainQuestion({ onCorrectAnswer = () => { } }) {
    const [answer, setAnswer] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)

    useEffect(() => {

        const getQuestions = async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}quiz/getRound`)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        console.log("Inside Use Effect");
        getQuestions();
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTimeout(() => {
            setIsCorrect(true)
            onCorrectAnswer()
        }, 1000);
    }

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
                <button type="submit" className={style.btn}>Submit</button>
            </form>
        </>
    )
}

export default MainQuestion