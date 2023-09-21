import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flag from 'react-native-flags';
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from 'prop-types';

import {
  CountryPickerContainer,
  CountryPickerContent,
  CountryPickerClose,
  CountryPickerItem,
  CountryPickerButton,
  CountryPickerSection,
  CountryPickerName,
  CountryPickerDivider
} from './styles'

const CountryPicker = ({ onClose, onSelect, closeTxt }) => {
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
      <CountryPickerClose onPress={onClose}>
        <Ionicons name="close" size={24} color={'#00000060'}/>
        <CountryPickerName>{closeTxt}</CountryPickerName>
      </CountryPickerClose>
      <CountryPickerContent>
        {countries
          .slice()
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => (
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

CountryPicker.propTypes = {
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  closeTxt: PropTypes.string
};

export default CountryPicker;
