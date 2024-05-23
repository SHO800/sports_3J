"use client";
import {Data} from "@/app/models/data";
import {useRef, useState} from "react";

export const ResultButton = ({data, reload}: {data: Data, reload?: () => void}) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)

    if (isShow) return (
        <div style={{height: isShow? "3rem": "2rem"}}>
            <form action={`/api/result-register/`} ref={formRef} method="post">
                <input hidden name="id" value={data.id} />
                <input type="radio" name="status" value="win" />win
                <input type="radio" name="status" value="lose" />lose
                <input type="radio" name="status" value="draw" />draw
                <button id="submit-button" type="button" onClick={
                    () => {
                        if (formRef.current === null) return
                        const formData = new FormData(formRef.current)
                        const action = formRef.current.getAttribute("action") ?? ""
                        const options = {
                            method: 'POST',
                            body: formData,
                        }
                        fetch(action, options).then((e) => {
                            if(e.status === 200) {
                                alert("保存しました。")
                                window.location.reload()
                                return
                            }
                            alert("保存できませんでした。")
                            console.log(e)
                        })
                    }
                }>送信</button>

            </form>
            <button onClick={() => setIsShow(false)}>閉じる</button>
        </div>
    )
    return (
        <button onClick={() => setIsShow(true)}>結果を入力</button>
    )
}