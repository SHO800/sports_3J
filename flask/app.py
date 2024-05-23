import json
from datetime import datetime

from flask import Flask, render_template, request, redirect, jsonify
from flask_cors import CORS


def load_data():
    with open("data.json", "r") as f:
        loaded_data = json.load(f)
    return loaded_data


def convert_time(time_string: str):
    return datetime.strptime(time_string, "%H:%M")


app = Flask(__name__)
CORS(app)


@app.route('/api/', methods=['GET'])
def all_data():
    data = load_data()

    return data


@app.route('/api/result-register/', methods=['POST'])
def result_resister():
    loaded_data = load_data()

    request.form.get('id')

    status = request.form.get('status')
    for d in loaded_data:
        if d["id"] == request.form.get('id'):
            print("change status")
            d["status"] = status

    with open("data.json", "w") as f:
        json.dump(loaded_data, f, indent=4)

    return jsonify({"status": "ok"})


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
