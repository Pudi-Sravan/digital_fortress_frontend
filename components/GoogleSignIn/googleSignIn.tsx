import React, { useEffect } from 'react'
import styles from "../../app/(home)/page.module.scss";
import { FaGoogle } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import axios from 'axios';

const backendSignIn = async () => {
    // console.log(session);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const updatedSession = await getSession();
    if (updatedSession?.accessToken) {
        console.log("backendSignIn");
        await axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}quiz/auth/register`,
                {
                    accesstoken: updatedSession.accessToken,
                    type: "1",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(res => {
                console.log(res);
                if (res.data.status == 402) {
                    axios
                        .post(
                            `${process.env.NEXT_PUBLIC_API_URL}quiz/auth/login`,
                            {
                                accesstoken: updatedSession.accessToken,
                                type: "1",
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        )
                        .then(res => {
                            console.log(res);
                            // localStorage.token = res.data.token
                            localStorage.setItem('token', res.data.token);
                            // router.push("/")
                        })
                        .catch(res => console.log(res))
                } else {
                    console.log("User registered successfully")
                    // localStorage.token = res.data.token
                    localStorage.setItem('token', res.data.token);
                    // router.push("/")
                }
            })
    }
}

const handleSignIn = async () => {
    await signIn('google', { redirect: false });
    await backendSignIn();
};

export default handleSignIn;