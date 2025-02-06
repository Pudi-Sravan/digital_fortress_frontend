"use client";
import { useRef , useEffect, LegacyRef} from "react";
import styles from './Canvas.module.scss';

const renderMatrix = (ref : any , color : any ) => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana =
        "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;
    const fontSize = window.innerWidth <= 480 ? 14 : 32;
    const columns = canvas.width / fontSize;

    const rainDrops : number[]  = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const render = () => {
        context.fillStyle = "rgba(0, 0, 0, 0.05)"; // black w a tiny bit of alpha
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = color ? color : "#0F0";
        context.font = fontSize + "px monospace";

        for (let i = 0; i < rainDrops.length; i++) {
            // randomize the string of characters to render
            const text = alphabet.charAt(
                Math.floor(Math.random() * alphabet.length)
            );
            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (
                rainDrops[i] * fontSize > canvas.height &&
                Math.random() > 0.975
            ) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    return render;
};

const MatrixRainingLetters = (props : any ) => {
    const ref : any = useRef();
    const keyName = "mrl-" + props.key;
    const thisClassName = "mrl-container " + props.custom_class;
    useEffect(() => {
        const render = renderMatrix(ref, props.color);
        const intervalId = setInterval(render, 30);
        return () => clearInterval(intervalId);
    }, [props.color]);

    return (
        <>
            <canvas key={keyName} className={thisClassName} ref={ref} 
            style={{height:"100%", width:"100%" , position:"absolute" , borderRadius:"10px"}}/>
        </>
    );
};

export default MatrixRainingLetters;
