import React, { useState, useEffect } from 'react';

function Test() {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // You can use a geolocation API (e.g., Google Maps Geocoding API or Mapbox Geocoding API)
      // to get the city name from the latitude and longitude.
      // For example:
      // https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY

      // Or you can use a service like IPInfo.io to get the city based on the user's IP address:
      fetch(`https://api.ipinfo.io/${position.coords.latitude},${position.coords.longitude}`)
        .then(response => response.json())
        .then(data => setCity(data.city))
        .catch(error => setError(error));
    };

    const error = () => {
      setError('Error retrieving location');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Your City: {city}</p>
      )}
    </div>
  );
}

export default Test;