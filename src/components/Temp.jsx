// api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=927d898f8894b1be35d93b8c0af62b1e

import React, { useEffect, useState } from 'react'
import './style.css';
import WeatherCard from './WeatherCard';



function Temp() {

    const [searchValue, setSearchvalue] = useState("Mumbai"); // Storing the search input value
    const [tempInfo,setTempInfo] = useState({});// string all api data here

    async function getWeatherInfo() {

        try {
  
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=927d898f8894b1be35d93b8c0af62b1e`;
           const res = await fetch(url);
           const data = await res.json();

        //    data we get from api by destructing object

            const {temp,humidity,pressure} = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;
           
            //  storing all the data to my personal object

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,

            };

            setTempInfo(myNewWeatherInfo)

            console.log(temp)
        
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        getWeatherInfo()
    }, [])


    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder="serach..."
                        autoFocus
                        className="serachTerm"
                        id="search"
                        value={searchValue}
                        onChange={(e) => setSearchvalue(e.target.value)}
                    />

                    <button onClick={getWeatherInfo} className="searchButton" type="button">Search</button>
                </div>
            </div>

            {/* temprature card here */}

        <WeatherCard tempInfo={tempInfo} />

        </>
    )
}

export default Temp
