from flask import Flask, render_template, request, jsonify

import requests
import random

app = Flask(__name__)

# List your API keys here
API_KEYS = [
    "f9638f565fd5985e2b3b0e642d7d573e",
    # Add more API keys as needed
]
BASE_URL = "https://api.openweathermap.org/data/2.5"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    api_key = random.choice(API_KEYS)
    if city:
        current_url = f"{BASE_URL}/weather?q={city}&units=metric&appid={api_key}"
        forecast_url = f"{BASE_URL}/forecast?q={city}&units=metric&appid={api_key}"
    elif lat and lon:
        current_url = f"{BASE_URL}/weather?lat={lat}&lon={lon}&units=metric&appid={api_key}"
        forecast_url = f"{BASE_URL}/forecast?lat={lat}&lon={lon}&units=metric&appid={api_key}"
    else:
        return jsonify({"error": "Missing parameters"}), 400
    current_data = requests.get(current_url).json()
    forecast_data = requests.get(forecast_url).json()
    # If limit reached, try another key
    if (current_data.get("cod") == 401 or current_data.get("cod") == 429) and len(API_KEYS) > 1:
        tried = {api_key}
        for _ in range(len(API_KEYS) - 1):
            new_key = random.choice([k for k in API_KEYS if k not in tried])
            tried.add(new_key)
            if city:
                current_url = f"{BASE_URL}/weather?q={city}&units=metric&appid={new_key}"
                forecast_url = f"{BASE_URL}/forecast?q={city}&units=metric&appid={new_key}"
            else:
                current_url = f"{BASE_URL}/weather?lat={lat}&lon={lon}&units=metric&appid={new_key}"
                forecast_url = f"{BASE_URL}/forecast?lat={lat}&lon={lon}&units=metric&appid={new_key}"
            current_data = requests.get(current_url).json()
            forecast_data = requests.get(forecast_url).json()
            if current_data.get("cod") not in [401, 429]:
                break
    return jsonify({"current": current_data, "forecast": forecast_data})

if __name__ == "__main__":
    app.run(debug=True)
