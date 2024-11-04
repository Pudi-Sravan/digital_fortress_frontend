"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Import GSAP
import styles from './rulesquiz.module.scss';

export default function Quizrules() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const effectButtonRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const $button = buttonRef.current;
    const $circlesTopLeft = $button!.parentNode!.querySelectorAll(`.${styles.circle}.${styles['top-left']}`);
    const $circlesBottomRight = $button!.parentNode!.querySelectorAll(`.${styles.circle}.${styles['bottom-right']}`);

    const tlTopLeft = gsap.timeline();
    const tlBottomRight = gsap.timeline();
    const btTl = gsap.timeline({ paused: true });

    // Top-left circle animations
    tlTopLeft.to($circlesTopLeft, { duration: 1.2, x: -25, y: -25, scaleY: 2, ease: "power1.inOut" });
    tlTopLeft.to($circlesTopLeft[0], { duration: 0.1, scale: 0.2, x: '+=6', y: '-=2' });
    tlTopLeft.to($circlesTopLeft[1], { duration: 0.1, scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
    tlTopLeft.to($circlesTopLeft[2], { duration: 0.1, scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
    tlTopLeft.to($circlesTopLeft[0], { duration: 1, scale: 0, x: '-=5', y: '-=15', opacity: 0 });
    tlTopLeft.to($circlesTopLeft[1], { duration: 1, scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
    tlTopLeft.to($circlesTopLeft[2], { duration: 1, scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

    const tlBt1 = gsap.timeline();
    tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
    tlBt1.add(tlTopLeft);

    // Bottom-right circle animations
    tlBottomRight.set($circlesBottomRight, { x: 0, y: 0 });
    tlBottomRight.to($circlesBottomRight, { duration: 1.1, x: 30, y: 30, ease: "power1.inOut" });
    tlBottomRight.to($circlesBottomRight[0], { duration: 0.1, scale: 0.2, x: '-=6', y: '+=3' });
    tlBottomRight.to($circlesBottomRight[1], { duration: 0.1, scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
    tlBottomRight.to($circlesBottomRight[2], { duration: 0.1, scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
    tlBottomRight.to($circlesBottomRight[0], { duration: 1, scale: 0, x: '+=5', y: '+=15', opacity: 0 });
    tlBottomRight.to($circlesBottomRight[1], { duration: 1, scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
    tlBottomRight.to($circlesBottomRight[2], { duration: 1, scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');

    const tlBt2 = gsap.timeline();
    tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
    tlBt2.add(tlBottomRight);

    btTl.add(tlBt1);
    btTl.to(effectButtonRef.current, { duration: 0.8, scaleY: 1.1 }, 0.1);
    btTl.add(tlBt2, 0.2);
    btTl.to(effectButtonRef.current, { duration: 1.8, scale: 1, ease: "elastic.out(1.2, 0.4)" }, 1.2);

    btTl.timeScale(2.6);

    // Event listener for mouseover
    const handleMouseOver = () => {
      btTl.restart();
    };

    $button.addEventListener('mouseover', handleMouseOver);

    // Cleanup event listener
    return () => {
      $button.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (<div className={styles.main}>

    <span className={styles['button--bubble__container']}>
      <a ref={buttonRef} href="#campaign" className={`${styles.button} ${styles['button--bubble']}`}>
        Hover me
      </a>
      <span className={styles['button--bubble__effect-container']}>
        <span className={`${styles.circle} ${styles['top-left']}`}></span>
        <span className={`${styles.circle} ${styles['top-left']}`}></span>
        <span className={`${styles.circle} ${styles['top-left']}`}></span>

        <span ref={effectButtonRef} className={styles['effect-button']}></span>

        <span className={`${styles.circle} ${styles['bottom-right']}`}></span>
        <span className={`${styles.circle} ${styles['bottom-right']}`}></span>
        <span className={`${styles.circle} ${styles['bottom-right']}`}></span>
      </span>
    </span>
  </div>
  );
}
