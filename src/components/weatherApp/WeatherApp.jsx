import React, { useState } from "react";
import "./weatherApp.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    city: "London",
    temperature: 45,
    humidity: 50,
    windSpeed: 10,
    description: "clear",
    country: "",
  });
  const [wicon, setWicon] = useState(cloud_icon);
  let textInput = React.createRef();

  const API_KEY = "0a6f522a8233148d38dad85d21957664";

  const search = async () => {
    // let cityName = document.getElementsByClassName("cityInput");
    console.log(textInput.current.value);
    if (textInput.current.value === "") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${textInput.current.value}&units=Metric&appid=${API_KEY}`;
    let responce = await fetch(url);
    let data = await responce.json();
    // console.log(data);
    // console.log(data.main.temp);
    if (data.cod !== 200) {
      return;
    }

    setWeatherData({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      country: data.sys.country,
    });
    console.log(weatherData.country);
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    }
    if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n" ||
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n" ||
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(cloud_icon);
    }

    if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n" ||
      data.weather[0].icon === "11d" ||
      data.weather[0].icon === "11n"
    ) {
      setWicon(rain_icon);
    }

    if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(drizzle_icon);
    }

    if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon);
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          ref={textInput}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="searchIcon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="cloud-icon" />
      </div>
      <h4 className="wether-discription">{weatherData.description}</h4>
      <div className="weather-temp">{weatherData.temperature}°c</div>
      <div className="weather-location">
        {weatherData.city},{weatherData.country}
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity_icon" className="icon" />
          <div className="data">
            <div className="humidity-persent">{weatherData.humidity}%</div>
            <div className="text">humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="wind_icon" className="icon" />
          <div className="data">
            <div className="humidity-persent">
              {Math.floor(weatherData.windSpeed)}km/h
            </div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
