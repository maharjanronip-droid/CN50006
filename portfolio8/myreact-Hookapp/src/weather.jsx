import { useEffect, useState } from "react";
const weatherDetails = {

  Sunny: { symbol: "☀️", description: "Bright and cheerful" },

  Rainy: { symbol: "🌧️", description: "Calm and cosy" },

  Cloudy: { symbol: "☁️", description: "Quiet and thoughtful" },

};

function WeatherMoodWidget({ weather }) {
  const [weatherInfo, setWeatherInfo] = useState(
    weatherDetails[weather] || weatherDetails.Sunny
  );
  const [count, setCount] = useState(0);
  useEffect(() => {
 setWeatherInfo(weatherDetails[weather] || weatherDetails.Sunny);
  }, [weather]);

  const handleClick = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <section className="weather-widget">
      <h2>{weather} Weather</h2>
      <span role="img" aria-label={`${weather} weather`}>
        {weatherInfo.symbol}
      </span>
      <p>{weatherInfo.description}</p>
      <button type="button" onClick={handleClick}>
        My mood clicks: {count}
      </button>
    </section>
  );
}
export default WeatherMoodWidget;