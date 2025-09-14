# Weather Forecasting Using API 🌦️

A full-stack **Flask Weather App** that provides real-time weather information and forecasts for any city or your current location.  
It features a clean and responsive UI, interactive map, and secure backend API handling.  

---

## 🚀 Features

- 🌍 Search weather by **City Name** or **Current Location**
- 📍 **Geolocation support** (allow browser location access)
- ⏱️ **Current Weather + 5-Day Forecast**
- 🗺️ Interactive **Map Integration** with Leaflet & OpenStreetMap
- 🌡️ Weather details: Temperature, Humidity, Wind speed, and more
- 🎨 Responsive **UI Design** with Weather Icons

---

## 🛠️ Technologies Used

- **Backend:** Python, Flask, requests  
- **Frontend:** HTML5, CSS3 (custom, responsive), JavaScript (ES6)  
- **APIs:** OpenWeatherMap, Leaflet, OpenStreetMap  
- **Icons & Fonts:** Font Awesome, Google Fonts (Poppins)  

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vishesh-Dhiman/Weather-Forecasting-Using-API.git
   cd Weather-Forecasting-Using-API
   ```


2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Add your API key**

   * Open `app.py`
   * Replace with your **OpenWeatherMap API key**

   ```python
   API_KEYS = [
       "your_api_key_here"
       # Add more keys for bypassing rate limit
   ]
   ```

4. **Run the app**

   ```powershell
   python app.py
   ```

   App will be available at:
   👉 [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

---

## 📖 Usage

* 🔍 Enter a city name and click **Search**, OR
* 📌 Click the **Location button** to fetch weather using your device’s location
* 📊 View **Current Weather**, **5-Day Forecast**, and **Map Location**

---

## 🎨 Customization

* Add more API keys in `app.py` for higher rate limits
* Edit `style.css` for custom **themes**
* Extend backend for more data (Air Quality, Pollution, Sunrise/Sunset, etc.)

---

## ❗ Troubleshooting

* ⚠️ API errors? → Check your API key & rate limits
* 🌐 Map not loading? → Ensure internet connection is active
* 📍 Location not working? → Allow **location access** in your browser

---

## 📜 License

This project is for **educational and personal use**.
See [OpenWeatherMap](https://openweathermap.org/) and [Leaflet/OpenStreetMap](https://leafletjs.com/) for their respective terms of use.

---

## 📌 Synopsis

**Flask Weather App** demonstrates:

* **Frontend:** Clean UI, search/location, weather details, forecast, and map.
* **Backend:** Handles API requests securely, manages multiple API keys.
* **Learning Value:** Great project for understanding Flask, API integration, and frontend-backend connectivity.

---

💡 For questions or contributions → Feel free to open an **Issue** or **Pull Request**.

