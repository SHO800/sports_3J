import json
from datetime import datetime
from flask import Flask, render_template, request, redirect


def load_data():
    with open("data.json", "r") as f:
        loaded_data = json.load(f)
    return loaded_data


def convert_time(time_string: str):
    return datetime.strptime(time_string, "%H:%M")


app = Flask(__name__)


@app.route('/')
def top():
    data = load_data()

    # dataのうちstatusがwaitingなもののみ抽出
    waiting = []
    progress = []
    for d in data:
        if d["status"] == "waiting":
            # もし今日の試合でなければ表示しない
            if datetime.now().date() != datetime.strptime(d["date"], "%Y-%m-%d").date():
                continue

            # convert_time(d["start_time"])の戻り値を年月日も含むdatetime型に変換
            start_time = datetime.now().replace(
                hour=convert_time(d["start_time"]).hour, minute=convert_time(d["start_time"]).minute)
            end_time = datetime.now().replace(
                hour=convert_time(d["end_time"]).hour, minute=convert_time(d["end_time"]).minute)

            # もし現在進行中の試合ならprogressにしておく
            if start_time <= datetime.now() <= end_time:
                d["status"] = "progress"
                progress.append(d)
                continue

            d["remaining_time"] = start_time - datetime.now()
            waiting.append(d)

    # dataのうちstatusがwinかloseなもののみ抽出
    result = []
    for d in data:
        if d["status"] == "win" or d["status"] == "lose":
            result.append(d)

    return render_template("index.html", waiting=waiting, progress=progress, result=result)


@app.route('/admin')
def admin():
    return render_template("admin.html")


@app.route("/add-data", methods=['POST'])
def add_data():
    sports = request.form.get('sports')
    opponent = request.form.get('opponent')
    date = request.form.get('date')
    start_time = request.form.get('start_time')
    end_time = request.form.get('end_time')
    memo = request.form.get('memo')
    status = "waiting"

    loaded_data = load_data()
    loaded_data.append({
        "sports": sports,
        "opponent": opponent,
        "date": date,
        "start_time": start_time,
        "end_time": end_time,
        "status": status,
        "memo": memo,
    })

    with open("data.json", "w") as f:
        json.dump(loaded_data, f, indent=4)

    return redirect("/admin")


if __name__ == '__main__':
    app.run()
