import styled from 'styled-components/native';

export const CountryPickerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  margin-top: 50px;
`;
export const CountryPickerContent = styled.View`
  width: 90%;
  align-items: center;
  justify-content: center;
`;
export const CountryPickerItem = styled.View`
  width: 100%;
  align-items: center;
`;
export const CountryPickerButton = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-start;
`;
export const CountryPickerSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
export const CountryPickerName = styled.Text`
  font-family: 'Nunito-Medium';
  font-size: 18px;
  margin-left: 10px;
`;
export const CountryPickerDivider = styled.TouchableOpacity`
  width: 90%
  border-bottom-width: 1px;
  border-color: #00000040;
  margin-bottom: 10px;
`;