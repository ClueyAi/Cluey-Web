import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flag from 'react-native-flags';

import {
  CountryPickerContainer,
  CountryPickerContent,
  CountryPickerItem,
  CountryPickerButton,
  CountryPickerSection,
  CountryPickerName,
  CountryPickerDivider
} from './styles'

const CountryPicker = ({ onClose, onSelect }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3/all');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountrySelect = (country) => {
    onSelect(country);
  };

  return (
    <CountryPickerContainer>
      <CountryPickerContent>
        {countries.map((country) => (
          <CountryPickerItem key={country.cca2}>
            <CountryPickerButton onPress={() => handleCountrySelect(country)}>
              <CountryPickerSection>
                <Flag code={country.cca2} size={24} />
                <CountryPickerName>{country.name.common}</CountryPickerName>
              </CountryPickerSection>
            </CountryPickerButton>
            <CountryPickerDivider />
          </CountryPickerItem>
        ))}
      </CountryPickerContent>
    </CountryPickerContainer>
  );
};

export default CountryPicker;
