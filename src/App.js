import React from "react";
import axios from "axios";
import Geocode from "react-geocode";
import { Header } from "./components/Header";
import { Forecast } from "./components/Forecast";

function App() {
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [currentCoords, setCurrentCoords] = React.useState();
  const [currentCity, setCurrentCity] = React.useState();
  const [currentTemp, setCurrentTemp] = React.useState();
  const [currentWeather, setCurrentWeather] = React.useState();
  const [dailyForecast, setDailyForecast] = React.useState();
  const [hourlyForecast, setHourlyForecast] = React.useState();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY);

    Geocode.setLanguage("es");
  }, []);

  const getAddressFromCoords = async () => {
    try {
      const response = await Geocode.fromLatLng(
        currentCoords.lat,
        currentCoords.lon
      );
      console.log(response);
      setCurrentCity(response.results[0].formatted_address);
    } catch (e) {
      console.log(e);
    }
  };
  const getCurrentWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCoords.lat}&lon=${currentCoords.lon}&exclude=minutely&units=metric&appid=${weatherApiKey}`;
      const response = await axios.get(url);

      console.log(response);
      setCurrentTemp(Math.trunc(response.data.current.temp));
      setCurrentWeather({
        main: response.data.current.weather[0].main,
        description: response.data.current.weather[0].description,
      });
      setDailyForecast(response.data.daily);
      setHourlyForecast(response.data.hourly);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (currentCoords !== undefined) {
      getAddressFromCoords();
      getCurrentWeather();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCoords]);

  return (
    <div className="App">
      <Header
        currentCity={currentCity}
        currentWeather={currentWeather}
        currentTemp={currentTemp}
      />
      <Forecast dailyForecast={dailyForecast} hourlyForecast={hourlyForecast} />
    </div>
  );
}

export default App;
