import {useState} from "react"

function App() {
  let [city, setCity] = useState("")
  let [weather, setWeather] = useState(null)
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState("")

  async function getWeather() {
    setLoading(true)
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`)
    let data = await response.json()
    if (data.cod === "404") {
    setError("City not found")
    setWeather(null)
    } else {
    setError("")
    setWeather(data)
    }
    setLoading(false)
    }

    return (
    <div>
        <h1>Weather App</h1>
        <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
        {weather && (
            <div>
                <h2>{weather.name}</h2>
                <p>{weather.main.temp}°C</p>
                <p>{weather.weather[0].description}</p>
            </div>
        )}
        {error && <p style={{color: "red"}}>{error}</p>}
    </div>
)
}

export default App
