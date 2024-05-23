"use client"
import styles from "./page.module.css";
import {Clock} from "@/app/components/Clock";
import {ListWrapper} from "@/app/components/ListWrapper";
import {useEffect, useState} from "react";
import {Data} from "@/app/models/data";
import {ListElement} from "@/app/components/ListElement";
import {TimeTable} from "@/app/components/TimeTable";


export default function Home() {
    const [data, setData] = useState<Data[]>([]);
    const [waiting, setWaiting] = useState<Data[]>([]);
    const [progress, setProgress] = useState<Data[]>([]);
    const [finished, setFinished] = useState<Data[]>([]);

    const reload = () => {
        fetch("/api/")
            .then(res => res.json())
            .then(data => {
                setData(data)

                // statusがwaitingかつ今日の試合かつ開始前のものをwaitingに
                // statusがwaitingかprogressである、または進行中のものをprogressに
                // それ以外をfinishedに
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                const waiting = data.filter((d: any) => {
                    const start_date = new Date(d.start_time);
                    return d.status === "waiting" && start_date >= today && start_date > now;
                });
                const progress = data.filter((d: any) => {
                    const start_date = new Date(d.start_time);
                    const end_date = new Date(d.end_time);
                    return !(d.status === "win" || d.status === "lose" || d.status === "draw") && (start_date < now);
                });
                const finished = data.filter((d: any) => {
                    const end_date = new Date(d.end_time);
                    return (d.status === "win" || d.status === "lose" || d.status === "draw") ;
                });

                // waitingは開始時間が早い順
                waiting.sort((a: any, b: any) => {
                    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
                })

                // progressは開始時間が早い順
                progress.sort((a: any, b: any) => {
                    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
                })

                // finishedは終了時間が早い順
                finished.sort((a: any, b: any) => {
                    return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
                })


                setWaiting(waiting);
                setProgress(progress);
                setFinished(finished);
            })
    }

    useEffect(() => {
        // 10秒おきにreloadするようにする
        reload();
        const interval = setInterval(reload, 10000);
        return () => clearInterval(interval);

    }, [])

    return (
        <main className={styles.main}>
            <Clock/>

            <ListWrapper title="今日の試合">
                {waiting.map((data, index) =>
                    <ListElement data={data} key={index} waiting></ListElement>
                )}
            </ListWrapper>

            <ListWrapper title="進行中の試合">
                {progress.map((data, index) =>
                    <ListElement data={data} key={index} progress reload={reload}></ListElement>
                )}
            </ListWrapper>

            <ListWrapper title="終了した試合">
                {finished.map((data, index) =>
                    <ListElement data={data} key={index} finished></ListElement>
                )}
            </ListWrapper>
        </main>
    );
}
