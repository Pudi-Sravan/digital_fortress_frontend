import React, { useState } from 'react'
import style from './MainQuestion.module.css'
import axios from 'axios'
import Submit from '@/components/Submitbutton/submitbutton'
import { useDeviceType } from "@/hooks/useDeviceType";
import { Tabs } from "../Tabs/tabs";

interface MainQuestionProps {
    ques: {
        question: string;
        roundNo: number;
        audio : string;
        image : string;
    } ;
    clues : {
        id: number;
        question: string;
        position: number[];
        isSolved: boolean;
        title: string;
        value: string;
        content: string; // Question text
        answer: string;  // Correct answer
    }[];
    isCorrect: number;
    setIsCorrect : (val: number) => void;
    onCorrectAnswer : () => void;
}

function MainQuestion({ ques, clues, isCorrect , setIsCorrect , onCorrectAnswer}: MainQuestionProps) {
    const [answer, setAnswer] = useState('')
    const deviceType = useDeviceType();
    const [isClueModalActive, setIsClueModalActive] = useState(false);

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

    const checkAnswer = async (): Promise<boolean> =>  {
        try {
            const checkResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}quiz/checkRound`,
            {
                answer: answer,
            },
            {
                headers: {
                Authorization: `Token ${localStorage.token}`,
                },
            }
            )
            
            return checkResponse.data.status === 200;
        } 
        catch (error) {
            console.error('Error checking answer:', error);
            return false;
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isAnswerCorrect = await checkAnswer();
        if(isAnswerCorrect){
            console.log("Answer is correct");
            setAnswer('');
            onCorrectAnswer();
            setIsCorrect(1)
        }else{
            console.log("Answer is incorrect");
            setIsCorrect(-1)
        };
    };

    return (
        <>
        {isClueModalActive && <Tabs tabs={clues}/>} 
        <div className={style.card}>
            <form onSubmit={handleSubmit}>
                <div className={style.topSection}>
                    <p className={style.question}>{ques?.question}</p>
                </div>
                <div className={style.bottomSection}>
                    <div className={style.inputSection}>
                        <input
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        placeholder="Enter your answer"
                        className={style.input}
                        />
                        {isCorrect === -1 && <p className={style.feedback}>Incorrect Answer</p>}
                    </div>
                    {deviceType === "monitor" && (<div className={style.row}> 
                        <Submit/> 
                        <button onClick={()=>setIsClueModalActive(true)} className={style.clueButton}>
                            CLUES
                        </button>
                        </div>)}
                </div>
            </form>
        </div>
        </>
    );
}

export default MainQuestion;
