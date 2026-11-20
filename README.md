# 🌦️ DailySky — Real-Time Weather & Air Quality Dashboard

DailySky is a responsive, weather-adaptive web application built with **React**, **Vite**, and **TanStack Query**, backed by serverless API proxy endpoints. It delivers live atmospheric telemetry, 24-hour temperature trend visualizations, 5-day forecasts, and Air Quality Index (AQI) breakdowns with dynamic glassmorphic theming.

---

## ✨ Features

* **Live Weather & Atmospheric Metrics:** Displays real-time temperature, feels-like temperature, high/low bounds, humidity, wind speed & compass direction, atmospheric pressure, visibility, and local sunrise/sunset times.
* **24-Hour Temperature Trend:** Interactive area chart powered by **Recharts**, paired with 3-hour interval breakdown cards and precipitation probability.
* **5-Day Forecast with Temperature Range Bars:** Visualizes daily minimum-to-maximum temperature spreads relative to the weekly range alongside precipitation chances.
* **Air Quality Index (AQI) Monitor:** Displays overall air quality status (Levels 1–5), health guidance, and granular pollutant readings ($\text{PM}_{2.5}$, $\text{PM}_{10}$, $\text{O}_3$, and $\text{NO}_2$).
* **Smart City Search & Live GPS Detection:** Debounced autocomplete city search with recent location history, plus one-click browser geolocation with reverse geocoding.
* **Weather-Adaptive Dynamic Themes & Interactive UI:** Automatically shifts background gradients based on live weather conditions (clear, cloudy, rain, snow, mist, night), supports Dark/Light mode toggling, and features cursor-tracking radial backlight hover effects.
* **Unit Conversion & Offline Resilience:** Instant toggling between Metric (`°C`, `km/h`, `km`) and Imperial (`°F`, `mph`, `mi`) units, persisted via `localStorage`, with automatic network status detection and cached fallback data.
* **Secure Serverless Backend (`api/`):** Routes production OpenWeatherMap requests through serverless functions (`/api/weather`, `/api/forecast`, `/api/geocode`) with edge caching headers so API keys remain hidden server-side.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, CSS Custom Properties (Design Tokens)
* **State & Data Caching:** TanStack React Query (`@tanstack/react-query`), React Context API
* **Data Visualization & Icons:** Recharts, Lucide React
* **Backend / Serverless Proxy:** Node.js Serverless Functions (`api/weather.js`, `api/forecast.js`, `api/geocode.js`)
* **External Data Provider:** OpenWeatherMap API (Current Weather 2.5, 5-Day Forecast 2.5, Air Pollution API, Geocoding API)

---

## 📂 Project Structure

```text
DailySky/
├── api/                          # Serverless backend endpoints (production proxy)
│   ├── weather.js                # Fetches current weather + air quality
│   ├── forecast.js               # Fetches 5-day / 3-hour forecast
│   └── geocode.js                # Direct & reverse city geocoding
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── client.js             # Fetch wrapper with structured error handling
│   │   └── weatherApi.js         # Switches between direct dev calls & /api/* proxy
│   ├── components/
│   │   ├── layout/               # Header, SearchBar, UnitToggle, ThemeToggle, OfflineBanner
│   │   ├── ui/                   # Card (with cursor backlight), Skeleton, ErrorState, EmptyState
│   │   └── weather/              # CurrentWeather, WeatherDetails, HourlyForecast, DailyForecast, AirQuality
│   ├── context/
│   │   └── SettingsContext.jsx   # Global unit, theme, selected city & recent history state
│   ├── hooks/                    # Custom hooks (useWeather, useForecast, useAirQuality, useGeolocation, etc.)
│   ├── styles/
│   │   ├── tokens.css            # Light/dark & weather-adaptive CSS variables
│   │   └── global.css            # Base layout & responsive grid rules
│   ├── utils/                    # Unit conversions, time/date formatting, theme mapping, error messages
│   ├── App.jsx
│   └── main.jsx
├── .env.example                  # Environment variable template
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
