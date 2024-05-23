"use client"

import {useEffect, useState} from "react";

export const RemainStartTime = ({start_time, incoming}: { start_time: string, incoming: boolean }) => {
    // 同じ日付に開始するものとする
    const now = new Date();
    const startTime = new Date(start_time)
    const diff = startTime.getTime() - now.getTime();
    let diffHour = Math.floor(diff / (1000 * 60 * 60));
    let diffMinute = Math.floor(diff / (1000 * 60)) % 60 + 1;

    const [{hour, minute}, setRemainTime] = useState({hour: diffHour, minute: diffMinute});

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = startTime.getTime() - now.getTime();
            diffHour = Math.floor(diff / (1000 * 60 * 60));
            diffMinute = Math.floor(diff / (1000 * 60)) % 60 + 1;

            setRemainTime({hour: diffHour, minute: diffMinute});
        }, 1000)
        return () => clearInterval(timer);
    }, [])

    // もしhourが0の場合はminuteのみ表示
    if (hour === 0) {
        return (
            <p style={incoming ? {color: "red"} : {}}>{minute.toString().padStart(2, "0")}<span style={{fontSize: "0.8em"}}>分</span><span
                style={{fontSize: "0.9em"}}>後</span></p>
        )
    }

    return (
        <p style={incoming ? {color: "red"} : {}}>{hour}<span style={{fontSize: "0.8em"}}>時間</span>{minute.toString().padStart(2, "0")}<span style={{fontSize: "0.8em"}}>分</span><span
            style={{fontSize: "0.9em"}}>後</span></p>
    )
}