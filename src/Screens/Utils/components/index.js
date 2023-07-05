import styled from 'styled-components/native';

// Working
export const WorkingContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const WorkingImage = styled.Image`
  width: 218px;
  height: 267px;
  opacity: 0.5;
`;
export const WorkingTitle = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.textDark};
  margin: 29px 0;
`;
export const WorkingText = styled.Text`
  width: 311px;
  font-family: 'Nunito';
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.textDark};
`;
export const WorkingButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 10px;
`;

// About
export const AboutContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
export const AboutHeader = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
`;
export const AboutHeaderText = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  margin: 0 50px;
`;
export const AboutContent = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
export const AboutPhoto = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  margin: 5px 10px;
  border: 5px solid ${({ theme }) => theme.primary};
  justify-content: center;
  align-items: center;
`;
export const AboutScrollView = styled.ScrollView`
  width: 100%;
  flex-direction: column;
  padding-top: 20px;
`;
export const AboutSection = styled.View`
  width: 40%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 0 40px;
`;
export const AboutView = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const AboutFooter = styled.View`
  position: absolute;
  width: 100%;
  height: 120px;
  padding-top: 10px;
  bottom: 0;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
`;