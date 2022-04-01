import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApiData, getForecastData } from "../reducers/reducer";
import "./style.css";
import WeatherCard from "./WeatherCard";
import moment from "moment";

function Temp() {
  console.log("date==>>>", moment(1648825200).format());
  const dispatch = useDispatch();
  const [searchValue, setSearchvalue] = useState("Mumbai"); // Storing the search input value
  // const [tempInfo, setTempInfo] = useState({}); // string all api data here

  async function getWeatherInfo() {
    // getWeatherForecastInfo()
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
      dispatch(getApiData(nodeRes.data.data));
      // setTempInfo(nodeRes.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function getWeatherForecastInfo() {
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=927d898f8894b1be35d93b8c0af62b1e`;
      axios
        .get(url)
        .then((res) => {
          const { lat, lon } = res.data[0];
          return { lat, lon };
        })
        .then(({ lat, lon }) => {
          const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=927d898f8894b1be35d93b8c0af62b1e`;
          // const forecastUrl = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`;
          return axios.get(forecastUrl);
        })
        .then((res) => {
          const { list, city } = res.data;
          // dispatching action
          dispatch(getForecastData({list, city}));
          // console.log("Inside then block==>>", list, city);
        });
    } catch (error) {}
  }

  const handleOnClick = () => {
    getWeatherInfo();
    getWeatherForecastInfo();
  };

  useEffect(() => {
    getWeatherInfo();
    getWeatherForecastInfo();
  }, [])
  

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
            onClick={handleOnClick}
            className="ms-4 btn btn-dark"
            type="button"
          >
            Search
          </button>
        </div>
      </div>

      {/* temprature card here */}

      <WeatherCard />
    </>
  );
}

export default Temp;
