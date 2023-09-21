import React, { useState, useContext } from 'react';
import { View, Text, Picker } from 'react-native';
import { LocaleContext, pt, es, fr, us, } from '../../../components/locale';

const PickerList = () => {
  const {locale, changeLocale} = useContext(LocaleContext);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { label: pt.language.name, value: pt.language.iso },
    { label: us.language.name, value: us.language.iso },
    { label: es.language.name, value: es.language.iso },
    { label: fr.language.name, value: fr.language.iso },
  ];

  const handleOptionChange = (itemValue) => {
    setSelectedOption(itemValue);
    changeLocale(itemValue)
  };

  return (
    <View>
      <Picker style={{paddingHorizontal: 10, outlineWidth: 0, outlineStyle: 'none', borderWidth: 0, borderColor: 'transparent' }} selectedValue={selectedOption} onValueChange={handleOptionChange}>
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

export default PickerList;
