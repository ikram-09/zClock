import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "2316f7b913cf0e0505ba2a51f316052a";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"; 
const COUNTRY_URL = "https://restcountries.com/v3.1/alpha/";

const CityDetails = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [population, setPopulation] = useState(null);
  const [cityTime, setCityTime] = useState(""); 
  const [timezoneOffset, setTimezoneOffset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherAndCountry = async () => {
      if (!cityName) {
        setError("Invalid city name.");
        setLoading(false);
        return;
      }

      try {
        const weatherResponse = await axios.get(WEATHER_URL, {
          params: {
            q: cityName,
            appid: API_KEY,
            units: "metric",
          },
        });

        const weather = weatherResponse.data;
        setWeatherData(weather);

        const countryCode = weather.sys.country;
        const offset = weather.timezone;
        setTimezoneOffset(offset);

        try {
          const countryResponse = await axios.get(`${COUNTRY_URL}${countryCode}?fields=population`);
          if (countryResponse.data) {
            setPopulation(countryResponse.data.population);
          } else {
            setPopulation("Unknown");
          }
        } catch {
          setPopulation("Unknown");
        }
      } catch (err) {
        setError("Failed to fetch data. Please check the city name and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherAndCountry();
  }, [cityName, API_KEY]);

  useEffect(() => {
    if (timezoneOffset !== null) {
      const updateTime = () => {
        const utcTime = new Date();
        const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);

        setCityTime(localTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }));
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }
  }, [timezoneOffset]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="city-details">
      <h2>{cityName} Weather & Country Details</h2>
      {weatherData && (
        <div>
          <p>🌡 Temperature: {weatherData.main.temp}°C</p>
          <p>🌬 Feels Like: {weatherData.main.feels_like}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>💨 Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>☁ Weather: {weatherData.weather[0].description}</p>
          <p>🏳 Country: {weatherData.sys.country}</p>
          <p>👥 Population: {population ? population.toLocaleString() : "Loading..."}</p>
          <p>🕒 Local Time: {cityTime || "Loading..."}</p>
        </div>
      )}
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default CityDetails;
