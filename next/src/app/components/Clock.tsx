"use client"
import {useEffect, useState} from "react";

export const Clock = () => {
    const [now, setNow] = useState(new Date())


    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date())
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    return (
        <div>
            <h1>{now.getHours().toString().padStart(2, "0")}:{now.getMinutes().toString().padStart(2, "0")}:{now.getSeconds().toString().padStart(2, "0")}</h1>
        </div>
    )
}