import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
function WeatherCard() {
  const tempInfo = useSelector((state) => state.weather.tempInfoR);
  const forecastData = useSelector((state) => state.weather.forecastData);
  const forecastDetails = useSelector((state) => state.weather.forecastDetails);
  // console.log("===>>> temp jsx", forecastData);


  // for weather mood
  const [weatherState, setWeatherState] = useState("");

  // destructuring the data we get as a props

  let { name: region, country: forecastCountry } = forecastDetails;

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

  const [showMore, setShowMore] = useState(false);

  return (
    <>
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

          {showMore ? (
            <div style={{ textAlign: "start" }} className="">
              <p>
                <b>Humidity: </b>
                {humidity}%
              </p>
              <p>
                <b>Pressure: </b>
                {pressure}
              </p>
              <p>
                <b>Sunset:</b> {timeStr}
              </p>
              <p>
                {" "}
                <b>Wind speed: </b>
                {speed} km/hr
              </p>
            </div>
          ) : (
            ""
          )}
          <button
            onClick={() => setShowMore(!showMore)}
            className="btn btn-sm btn-dark"
          >
            {!showMore ? "Show More" : "Show Less"}
          </button>
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
                  <p>{tempConverted ? tempConverted : temp}&deg; C</p>
                ) : (
                  <p>{(tempConverted).toFixed(2)} F</p>
                )}{" "}
              </p>
            </b>
          </div>
        </div>
      </div>

      {/* ForeCast showing */}

      <div className="container my-5 border border-primary p-4">
        <h4>
          Weekly Forecast for {region}, {forecastCountry}
        </h4>
        <div className="row ms-2">
          {forecastData.slice(0, 16).map((ele) => {
            let { dt_txt, wind, main } = ele;
            let { description } = ele.weather[0];
            return (
              <div class="card ms-3 mt-3" style={{ width: "18rem" }}>
                {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                <div class="card-body">
                  <h5 class="card-title">{moment(dt_txt).format("LLL")}</h5>
                  <p>
                    <b>Temperature</b>
                    {(((main.temp - 32) * 5) / 9).toFixed(2)}&deg;
                  </p>
                  <p>
                    <b>Humidity</b>
                    {main.humidity}
                  </p>
                  <p>
                    <b>Pressure</b>
                    {main.pressure}
                  </p>
                  <p>
                    <b>Sea level</b>
                    {main.sea_level}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
