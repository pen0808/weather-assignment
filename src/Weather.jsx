import React, { useState, useEffect } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  

  const apikey = "dcf6e9b674658bbc68a4fe75fc91a0fc";

 //const city = "Lagos";

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    setError("");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apikey}`,
    )
      .then((response) => {
        if(!response.ok){
          throw new Error("City not found")
        }
        return response.json()})
      .then((data) => {setWeatherData(data)
                       setLoading(false)})
      .catch((err)=>{setError(err.message)
                     setLoading(false)});
  }, [searchQuery]);
  

  function handleClick(){
    setSearchQuery(city);
  }
  

  console.log(weatherData);

  return (
    <div>
      <h1>Weather report</h1>
      {loading && (<p>Loading...</p>)}

       <div>
        <input type="text" value={city} placeholder="Enter a city" onChange={(e)=>setCity(e.target.value)} />
        <button onClick={handleClick}>Get Report</button>
      </div>

      {weatherData && (
        <div>
          
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
        </div>
        
      )}

      {error && <p>{error}</p>}
      
    </div>
  );
}

export default Weather;
