"use client";
import {ReactNode} from "react";
import {Data} from "@/app/models/data";
import styles from "./ListElement.module.css";
import {RemainStartTime} from "@/app/components/RemainStartTime";

export const ListElement = ({data, waiting, finished}: {data: Data, waiting?: boolean, finished?: boolean}) => {
    const start_date = new Date(data.start_time)
    const start_hour = start_date.getHours().toString().padStart(2, "0")
    const start_minute = start_date.getMinutes().toString().padStart(2, "0")
    const start_str = `${start_hour}:${start_minute}`

    const end_date = new Date(data.end_time)
    const end_hour = end_date.getHours().toString().padStart(2, "0")
    const end_minute = end_date.getMinutes().toString().padStart(2, "0")
    const end_str = `${end_hour}:${end_minute}`

    // 15分後かどうか
    const now = new Date();
    const diff = start_date.getTime() - now.getTime();

    const is15min = diff < 15 * 60 * 1000;

    return (
        <div className={styles.rowWrapper}>
            <div>
                <p>{data.sports} (vs {data.opponent})</p>
            </div>
            <div>
                <p>{start_str}~{end_str}</p>
                {waiting && <RemainStartTime start_time={data.start_time} incoming={is15min}/>}
                {finished && <p>{data.status}</p>}
            </div>
        </div>
    )

}