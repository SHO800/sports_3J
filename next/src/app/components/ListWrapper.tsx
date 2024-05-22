"use client"
import {ReactNode} from "react";
import styles from "./ListWrapper.module.css";

export const ListWrapper = ({children, title}: {children: ReactNode, title: string}) => {
    return (
        <div className={styles.listWrapper}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}