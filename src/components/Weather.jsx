import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weatherData, setWeather] = useState({});
    const [city, setCity] = useState('');

    const search = async (cityName) => {
        let api_key = "9974a6c66d81b35f6d3823191303490d";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setWeather(data);
                setCity("");
            }).catch((er) => {
                console.log(er);
            });
    }

    const searchCity = () => {
        search(city);
    }

    const toCelsius = (temp) => {
        let newTemp = parseInt(temp);
        newTemp = newTemp - 273.15;
        if (!isNaN(newTemp)) {
            return newTemp.toFixed(1);
        }
    }
    const getWeatherIconUrl = (iconCode) => {
        return `http://openweathermap.org/img/w/${iconCode}.png`;
    }
    useEffect(() => {
        search("delhi");
    }, []);

    return (
        <>
            <div className="bg-gradient-to-r from-green-300 to-violet-400 p-4 rounded-lg shadow-lg text-white w-1/3 mt-4 mb-28">
                <div className="top-bar flex items-center justify-between mb-4">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black w-32 md:w-auto"
                        placeholder="Search city weather"
                    />
                    <div className="search-icon p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600" onClick={searchCity}>
                        <i className="fas fa-search text-white"></i>
                    </div>
                </div>
                <div className="weather-img my-4">
                    <img src={getWeatherIconUrl(weatherData?.weather?.[0]?.icon)} alt="weather bg" className='w-24 h-24 color-black-400' />
                </div>
                <div className="weather-temp text-4xl font-bold my-4">{toCelsius(weatherData?.main?.temp)}°C</div>
                <div className="weather-location text-xl my-4">{weatherData?.name}</div>
                <div className="data-container flex flex-wrap justify-between">
                    <div className="element flex items-center my-2">
                        <i className="fas fa-tint mr-2"></i>
                        <div className="data">
                            <div className="humidity-percent">{weatherData?.main?.humidity}%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element flex items-center my-2">
                        <i className="fas fa-wind mr-2"></i>
                        <div className="data">
                            <div className="wind-rate">{weatherData?.wind?.speed} Km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
                <div className="data-container flex flex-wrap justify-between my-4">
                    <div className="element flex items-center">
                        <i className="fas fa-thermometer-full mr-2"></i>
                        <div className="data">
                            <div className="text">Temperature</div>
                            <div className="max-temp">Max: {toCelsius(weatherData?.main?.temp_max)}°C</div>
                            <div className="min-temp">Min: {toCelsius(weatherData?.main?.temp_min)}°C</div>
                        </div>
                    </div>
                    <div className="element flex items-center">
                        <i className="fas fa-sun mr-2"></i>
                        <div className="data">
                            <div className="text">Sunrise/Sunset</div>
                            <div className="sunrise">{new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString()}</div>
                            <div className="sunset">{new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString()}</div>
                        </div>
                    </div>
                </div>
                <div className="data-container flex flex-wrap justify-between my-4">
                    <div className="element flex items-center">
                        <i className="fas fa-eye mr-2"></i>
                        <div className="data">
                            <div className="text">Visibility</div>
                            <div className="visibility">{weatherData?.visibility} meters</div>
                        </div>
                    </div>
                    <div className="element flex items-center">
                        <i className="fas fa-tachometer-alt mr-2"></i>
                        <div className="data">
                            <div className="text">Pressure</div>
                            <div className="pressure">{weatherData?.main?.pressure} hPa</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Weather;
