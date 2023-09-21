import styled from 'styled-components/native';

export const CountryPickerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  margin-top: 30px;
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
  font-size: 16px;
  margin-top: 2px;
  margin-left: 10px;
  color: #000000D0;
`;
export const CountryPickerDivider = styled.View`
  width: 90%;
  border-bottom-width: 1px;
  border-color: #00000040;
  margin-bottom: 10px;
`;
export const CountryPickerClose = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;
  margin: 0px 5px 25px 25px;
`;