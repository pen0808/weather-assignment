import React, { useState } from "react";

function Weather1() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // Start as false
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const apikey = "dcf6e9b674658bbc68a4fe75fc91a0fc";

  // Function to handle the actual API call
  const getWeather = () => {
    if (!city) return; // Don't fetch if input is empty

    setLoading(true);
    setError(""); // Reset error state before new fetch

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found or data failed to load.");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather report</h1>

      {/* Input should update the city state as you type */}
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter a city"
      />
      <button onClick={getWeather}>Get Report</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && !loading && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>City:</strong> {weatherData.name}</p>
          <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather1;