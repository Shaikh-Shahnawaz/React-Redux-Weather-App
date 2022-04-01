import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function WeatherCard() {


const tempInfo = useSelector(state=>state.weather.tempInfoR)
// console.log('===>>> temp jsx',tempInfo1)
  // for weather mood
  const [weatherState, setWeatherState] = useState("");

  // destructuring the data we get as a props

  let {
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
  } = tempInfo;

  useEffect(() => {
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-fog");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        case "Mist":
          setWeatherState("wi-snow");
          break;
        case "Smoke":
          setWeatherState("wi-smoke");
          break;

        default:
          setWeatherState("wi-day-sunny");
          break;
      }
    }
  }, [weathermood]);

  // converting the seconds into time
  const sec = sunset;
  const date = new Date(sec * 1000);
  const timeStr = `${date.getHours()}:${date.getMinutes()}`;

  // converting temperature

  const [tempConverted, setTempConverted] = useState();
  const [isCelcius, setIsCelsius] = useState(true);

  const changeTemperature = (value) => {
    if (value == "fah") {
      let myTemp = (tempInfo.temp * 9) / 5 + 32;
      setTempConverted(myTemp);
      setIsCelsius(false);
    } else {
      setTempConverted(tempInfo.temp);
      setIsCelsius(true);
    }
  };


  return (
    <div className="d-flex justify-content-around mt-5">
      {/* Left Card */}
      <div className="border border-primary p-4">
        <h4>
          Todays Forecast for {name},{country}
        </h4>
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <p>
              {" "}
              <b>Current Temperature:</b> {temp}&deg;
            </p>
            <p>
              {" "}
              <b>Weather Condition:</b> {weathermood}
            </p>
            <p>
              <b>Highest Temperature:</b> {tempMax}&deg;
            </p>
            <p>
              <b>Lowest Temperature:</b> {tempMin}&deg;
            </p>
          </div>
          <div style={{ fontSize: "80px", marginLeft: "100px" }}>
            <i className={`wi ${weatherState}`}></i>
          </div>
        </div>
      </div>

      {/* Right Card */}

      <div className="border border-primary p-4">
        <div>
          <div className="d-flex justify-content-center">
            <p>
              <b>Clouds: </b>
              {clouds}
            </p>
            <p style={{ marginLeft: "18px", marginRight: "18px" }}>
              <b>Sunset: </b>
              {timeStr}
            </p>
            <p>
              {" "}
              <b>Temperature: </b> {temp}&deg;
            </p>
          </div>
        </div>

        <div>
          <h4>Temperature Convertor</h4>

          <button
            onClick={() => changeTemperature("cel")}
            className="btn btn-outline-warning "
          >
            Celsius
          </button>
          <button
            onClick={() => changeTemperature("fah")}
            style={{ marginLeft: "20px" }}
            className="btn btn-warning "
          >
            Fahrenheit
          </button>

          <b>
            {" "}
            <p>
              {" "}
              Temperature :{" "}
              {isCelcius ? (
                <p>{tempConverted ? tempConverted: temp}&deg; deg</p>
              ) : (
                <p>{tempConverted} F</p>
              )}{" "}
            </p>
          </b>
        </div>
      </div>

     
    </div>
  );
}

export default WeatherCard;
