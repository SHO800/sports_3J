"use client"
import styles from "./page.module.css";
import {Clock} from "@/app/components/Clock";
import {ListWrapper} from "@/app/components/ListWrapper";
import {useEffect, useState} from "react";
import {Data} from "@/app/models/data";
import {ListElement} from "@/app/components/ListElement";


export default function Home() {
    const [data, setData] = useState<Data[]>([]);
    const [waiting, setWaiting] = useState<Data[]>([]);
    const [progress, setProgress] = useState<Data[]>([]);
    const [finished, setFinished] = useState<Data[]>([]);


    useEffect(() => {
        fetch("http://localhost:5000/")
            .then(res => res.json())
            .then(data => {
                setData(data)
                // statusがwaitingかつ今日の試合かつ開始前のものをwaitingに
                // statusがwaitingかprogressである、または進行中のものをprogressに
                // それ以外をfinishedに
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                // const waiting = data.filter((d: any) => {
                //     const start_date = new Date(d.start_time);
                //     return start_date >= today && start_date > now;
                // });
                // const progress = data.filter((d: any) => {
                //     const start_date = new Date(d.start_time);
                //     const end_date = new Date(d.end_time);
                //     return start_date < now && end_date > now;
                // });

                const waiting = data.filter((d: any) => {
                    const start_date = new Date(d.start_time);
                    return d.status === "waiting" && start_date >= today  && start_date > now;
                });
                const progress = data.filter((d: any) => {
                    const start_date = new Date(d.start_time);
                    const end_date = new Date(d.end_time);
                    return (d.status === "waiting" && start_date < now) || (d.status === "progress" && end_date > now);
                });
                const finished = data.filter((d: any) => {
                    const end_date = new Date(d.end_time);
                    return d.status === "finished" || end_date < now;
                });


                setWaiting(waiting);
                setProgress(progress);
                setFinished(finished);
            })
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
                    <ListElement data={data} key={index}></ListElement>
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
