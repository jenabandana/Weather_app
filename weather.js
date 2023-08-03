import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Weatherapp = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const apiKey = '09daa4915c46103238f161217327dc89';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );

      setWeatherData(response.data);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error fetching weather data.');
      }
      setWeatherData(null);
    }
  };

  return (
    <div className="container mt-4">
      
      <div className='row'>
          <div className='col-3'></div>
          <div className='col-6'>

          <Form onSubmit={handleSearch}>
      <h2 className='text-center'>Weather App</h2>
        <Form.Group controlId="cityName">
          <Form.Label>Enter City Name</Form.Label>
          <Form.Control
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            required
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button type="submit" variant="primary" className='btn'>Search</Button>
      </Form>
      {weatherData && (
        <div className='text-center'>
          <h3>Weather Details</h3>
          <p>
            City: {weatherData.name}
            <br />
            Latitude: {weatherData.coord.lat}
            <br />
            Longitude: {weatherData.coord.lon}
            <br />
            Timezone: {weatherData.timezone}
            <br />
          </p>
        </div>
      )}
          </div>
          <div className='col-3'></div>
      </div>
    </div>
  );
};

export default Weatherapp
