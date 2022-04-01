// api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=927d898f8894b1be35d93b8c0af62b1e

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApiData } from "../reducers/reducer";
import "./style.css";
import WeatherCard from "./WeatherCard";

function Temp() {

    const dispatch = useDispatch()
  const [searchValue, setSearchvalue] = useState("Mumbai"); // Storing the search input value
 // const [tempInfo, setTempInfo] = useState({}); // string all api data here

  async function getWeatherInfo() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=927d898f8894b1be35d93b8c0af62b1e`;
      const res = await axios.get(url);

      //    data we get from api by destructing object

      const {
        temp,
        humidity,
        pressure,
        temp_max: tempMax,
        temp_min: tempMin,
      } = res.data.main;
      const { main: weathermood } = res.data.weather[0];
      const { name } = res.data;
      const { speed } = res.data.wind;
      const { country, sunset } = res.data.sys;
      const { all: clouds } = res.data.clouds;

      //  storing all the data to my personal object

      const myNewWeatherInfo = {
        temp,
        tempMax,
        tempMin,
        clouds,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      const nodeUrl = "http://localhost:8040/api/weather/city";
      const nodeRes = await axios.post(nodeUrl, myNewWeatherInfo);

     

      // dispatching action
      dispatch(getApiData(nodeRes.data.data))
      // setTempInfo(nodeRes.data.data);
      getWeatherForecastInfo()
    } catch (error) {
      console.log(error);
    }
  }

  async function getWeatherForecastInfo(){
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=927d898f8894b1be35d93b8c0af62b1e`
      const res = await axios.get(url);

      const lat = res.data[0].lat
      const lon = res.data[0].lon

      if(lat && lon){
        const forecastUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=927d898f8894b1be35d93b8c0af62b1e`
        var forecastRes = await axios.get(forecastUrl)
        
      }
      
      console.log('fore cast response ==>>',forecastRes)
    console.log('latitude longitude==>>',lat,lon)
    
    } 
    
    catch (error) {
      
    }
  }

  useEffect(() => {
    getWeatherInfo();
    // getWeatherForecastInfo()
  }, []);

  return (
    <>
      <h1 className="bg-dark text-warning">The Weather App</h1>
      <div className="wrap">
        <div className="search d-flex col-md-6 offset-3">
          <input
            type="search"
            class="form-control"
            placeholder="serach..."
            autoFocus
            // className="serachTerm"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchvalue(e.target.value)}
          />

          <button
            onClick={getWeatherInfo}
            className="ms-4 btn btn-dark"
            type="button"
          >
            Search
          </button>
        </div>
      </div>

      {/* temprature card here */}

      <WeatherCard  />
    </>
  );
}

export default Temp;
