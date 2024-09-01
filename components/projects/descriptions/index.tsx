"use client"
import React from 'react'
import styles from './style.module.scss';

export default function index({data , selectedProject} : any) {

    const crop = (string: string, maxLength: number) => {
        return string.substring(0, maxLength);
    }
    
    return (
        <div className={styles.descriptions}>
            {
                data.map( (project: { title: any; description: any; } , i: number) => {
                    const { title, description } = project;
                    return (
                    <div 
                        key={i} 
                        className={styles.description}
                        style={{clipPath: selectedProject == i ? "inset(0 0 0)" : "inset(50% 0 50%"}}
                    >
                        <p>{crop(title, 9)}</p>
                        <p>{description}</p>
                    </div>
                    )
                })
            }
        </div>
    )
}