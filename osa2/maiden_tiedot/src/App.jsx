import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all/';

    axios.get(baseUrl)
      .then(response => {
        setAllCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterCountries(event.target.value);
  };

  const filterCountries = (input) => {
    if (input) {
      const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(input.toLowerCase())
      );
      setVisibleCountries(filteredCountries);
    } else {
      setVisibleCountries([]);
    }
  };
  

  const handleShowCountry = (countryName) => {
    setFilter(countryName);
    filterCountries(countryName);
  };

  const renderCountryDetails = (country) => {
    const languages = Object.values(country.languages).join(', ');

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital[0]}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> {languages}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ width: '150px' }} />
      </div>
    );
  };

  return (
    <div>
      <p>Type to search for a country:</p>
      <input 
        value={filter}
        onChange={handleFilterChange}
        placeholder='Enter country name'
      />
      {visibleCountries.length === 1
        ? renderCountryDetails(visibleCountries[0])
        : (
          <ul>
            {visibleCountries.map((country, index) => (
              <li key={country.name.common + index}>
                {country.name.common}
                <button onClick={() => handleShowCountry(country.name.common)}>Show</button>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default App;
