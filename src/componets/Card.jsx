import React, { useState } from 'react';
import "./Card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'

const Card = () => {
  const apiKey = 'cd50a2d4be8846d291f172947230408';
  const [location, setLocation] = useState('');
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFetchWeather = () => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error.message);
        } else {
          setError('');
          setWeatherDataList(prevDataList => [...prevDataList, data]);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API', error);
        setError('Error al obtener los datos de la API');
      });
  };

  const handleDeleteCard = (index) => {
    setWeatherDataList(prevDataList => prevDataList.filter((_, i) => i !== index));
  };

  const handleClearData = () => {
    setWeatherDataList([]);
  };

  let formattedTime = '';
  if (weatherDataList.length > 0) {
    const localTime = new Date(weatherDataList[weatherDataList.length - 1].location.localtime);
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  return (
    <>
      <div className="search-climate-location">
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder="Ingrese la ubicación"
          id='search-bar'
        />
        <div className="buttons-SD">
          <button className='Button-submit-climate' onClick={handleFetchWeather}>Send</button>
          <button className='delete-all' onClick={handleClearData}>Clear</button>
        </div>
      </div>

      <div className='Card'>
        {error && <p>{error}</p>}

        {weatherDataList.length > 0 && !error && (
          <>
            {weatherDataList.map((data, index) => (
              <div className="results">
                <div className='result-climate' key={index}>
                  <h2>{data.location.name}, {data.location.country}</h2>
                  <p><span>Temperatura</span>: <br /> {data.current.temp_c}°C / {data.current.temp_f}°F</p>
                  <p><span>Condición</span>: <br />{data.current.condition.text}</p>
                  <p><span>Time: <br /></span>{formattedTime}</p>
                  <img
                    src={`https:${data.current.condition.icon}`}
                    alt="Icono del clima"
                  />
                  <button className='delete-one' onClick={() => handleDeleteCard(index)}><FontAwesomeIcon icon={faCircleMinus} style={{ color: "#ff0000", }} /></button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Card;
