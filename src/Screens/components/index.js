import styled from 'styled-components/native';
import styledHTML, { keyframes } from 'styled-components';

import AlertBox from './AlertBox';
import PatchNotes from './PatchNotes';
import Preferences from './Preferences';
import Language from './Language';
import ThemeSwitch from './ThemeSwitch';
import NotifySwitch from './NotifySwitch';
import CustomTextInput from './CustomTextInput';
import PickerList from './PickerList';
import CountDown from './CountDown';

export { AlertBox, PatchNotes, Preferences, Language, ThemeSwitch, NotifySwitch, CustomTextInput, PickerList, CountDown };

const generateBGColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};
const generateTextColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

// Global
export const Button = styled.TouchableOpacity`
  text-align: center;
  justify-content: center;
  align-items: center;
`;
export const LinkButton = styled.TouchableOpacity``;

// Loading
export const LoadingContainer = styled.View`
  flex: 1;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
`;
const blinkAnimation = keyframes`
  0% { opacity: 1; }
  25% { opacity: 0.5; }
  50% { opacity: 0; }
  75% { opacity: 0.5; }
  100% { opacity: 1; }

`;
export const LoadingText = styledHTML.span`
  animation: ${blinkAnimation} 1s infinite;
  font-family: 'Nunito-Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

// Home
export const HomeContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
`;

// Language
export const LanguageContainer = styled.View`
  position: absolute;
  top: 15%;
  right: 0%;
  padding: 10px;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  z-index: 1;
`;
export const LanguageButton = styled.TouchableOpacity`
  width: 95px;
  height: 95px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.border};
`;

// Alert
export const AlertContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.textDark};
`;
export const AlertContent = styled.View`
  padding: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  z-index: 1;
`;
export const AlertSection = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;
export const AlertMessage = styled.Text`
  font-family: 'Nunito';
  font-size: 18px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
export const AlertUser = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
export const AlertAction = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
export const AlertButton= styled.TouchableOpacity`
  padding: 5px 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
`;
export const AlertButtonText = styled.Text`
  font-family: 'Nunito-SemiBold';
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

// Preferences
export const PreferencesContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.textDark};
`;
export const PreferencesContent = styled.View`
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  z-index: 1;
`;
export const PreferencesHeader = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
export const PreferencesTitle = styled.Text`
  font-family: 'Nunito-ExtraBold';
  font-size: 26px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
export const PreferencesDescription = styled.Text`
  font-family: 'Nunito';
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;
export const PreferencesAction = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
export const PreferencesButton= styled.TouchableOpacity`
  padding: 10px 30px;
  margin-bottom: 20px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.secondary};
`;
export const PreferencesButtonText = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.background};
`;
export const PreferencesLinkText = styled.Text`
  font-family: 'Nunito-Medium';
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;
// Focus
export const FocusContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
export const FocusAction = styled.View`
  justify-content: center;
  align-items: center;
`;
export const FocusButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  margin: 10px;
  border-radius: 30px;
  border-width: 2px;
`;
export const FocusButtonText = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.background};
`;
export const FocusOtherSection = styled.View`
  width: 300px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
export const FocusOtherDescription = styled.Text`
  font-family: 'Nunito';
  font-size: 16px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
export const FocusOtherInput = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  border-radius: 30px;
`;
export const FocusOtherTextBox = styled.TextInput`
  font-family: 'Nunito-Medium';
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  height: 40px;
  padding: 0 20px;
  border-radius: 30px;
  outline-width: 0;
  outline-style: none;
`;
// Interests
export const InterestsContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
export const InterestsAction = styled.View`
  justify-content: center;
  align-items: center;
`;
export const InterestsButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 30px;
  border-width: 2px;
`;
export const InterestsButtonText = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.background};
`;

// PathNotes
export const PatchContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.textDark};
`;
export const PatchContent = styled.View`
  width: 70%;
  height: 90%;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
`;
export const PatchLoading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const PatchHeader = styled.View`
  width: 100%;
  height: 80px;
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;
export const PatchHeaderSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const PatchTitle = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 24px;
  margin-left: 30px;
  color: ${({ theme }) => theme.text};
`;
export const PatchBody = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 30px;
`;
export const PatchNoteVersionSection = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const PatchDiv = styled.Text`
  font-family: 'Nunito-Medium';
  font-size: 24px;
  margin: 0 5px;
  color: ${({ theme }) => theme.textDark};
`;
export const PatchNoteVersion = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 20px;
  color: ${({ theme }) => theme.textDark};
`;
export const PatchSection = styled.ScrollView`
  width: 100%;
  flex-direction: column;
  margin-left: 20px;
`;
export const PatchNoteTitles = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
`;
export const PatchList = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 5px;
`;
export const PatchListItem = styled.Text`
  font-family: 'Nunito-Medium';
  font-size: 18px;
  margin-left: 5px;
  color: ${({ theme }) => theme.text};
`;
export const PatchFooter = styled.View`
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const PatchReadMoreButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  margin: 0 40px;
  border-radius: 5px;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
`;
export const PatchConfirmButton = styled.TouchableOpacity`
  align-items: center;
  padding: 10px 20px;
  margin: 0 40px;
  border-radius: 5px;
  justify-content: center;
  background-color: ${({ theme }) => theme.secondary};
`;
export const PatchButtonText = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

// Chat
export const ChatContainer = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  border-left-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;
// Header Chat
export const HeaderChatContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 66px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;
// Presets
export const PresetsContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
export const SuggestionsButton = styled.TouchableOpacity`
  align-self: center;
  align-content: center;
  justify-content: center;
  height: 40px;
  width: 92%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  padding: 0 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 30px;
`;
export const SuggestionsText = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 16px;
  padding-top: 5px;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
// Plans
export const PlansContainer = styled.ScrollView`
  flex: 1;
  width: '100%';
  flex-direction: column;
`;
export const PlansSection = styled.View`
  width: 100%;
  max-width: 1200px;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
`;
export const PlansFree = styled.View`
  width: 300px;
  height: 350px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: #55e5cc;
`;
export const PlansPersonal = styled.View`
  width: 300px;
  height: 350px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: #ffc3ab;
`;
export const PlansPro = styled.View`
  width: 300px;
  height: 350px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: #ffdf00;
`;
export const PlansHeader = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
export const PlansTitle = styled.Text`
  font-family: 'Nunito-ExtraBold';
  font-size: 26px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
export const PlansDescription = styled.Text`
  text-align: center;
  font-family: 'Nunito-Medium';
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;
export const PlansPriceSetion = styled.View`
  flex-direction: row;
  justify-content: center;
`;
export const PlansPriceSpan = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const PlansPriceValue = styled.Text`
  text-align: center;
  font-family: 'Nunito-ExtraBold';
  font-size: 52px;
  color: ${({ theme }) => theme.text};
`;
export const PlansPriceDetail = styled.Text`
  text-align: center;
  font-family: 'Nunito-Medium';
  font-size: 26px;
  margin: 5px;
  color: ${({ theme }) => theme.text};
`;
export const PlansButton = styled.TouchableOpacity`
  align-self: center;
  align-content: center;
  justify-content: center;
  height: 40px;
  width: 200px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.text};
  background-color: ${({ isHovered, theme }) => (isHovered ? theme.background : theme.text)};
  border-radius: 30px;
`;
export const PlansButtonText = styled.Text`
  text-align: center;
  font-family: 'Nunito-Medium';
  font-size: 16px;
  color: ${({ isHovered, theme }) => (isHovered ? theme.text : theme.background)};
`;
export const PlansInfo = styled.Text`
  text-align: center;
  font-family: 'Nunito-Medium';
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 30px;
`;
export const PlansInfoContent = styled.View`
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;
export const PlansInfoImage = styled.Image`
  width: 900px;
  height: 550px;
`;

// Messages
export const MessagesContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
`;
export const MessagesContent = styled.View`
  flex-direction: column;
  margin: 10px 10%;
`;
export const MessagesRequest = styled.View`
  max-width: 55%;
  align-self: flex-end;
  padding: 20px;
  border-radius: 10px;
  //background-color: ${generateBGColor()};
  //opacity: 0.5;
  background-color: ${({ theme }) => theme.secondarySoft};
`;
export const MessagesResponse = styled.View`
  max-width: 55%;
  align-self: flex-start;
  padding: 20px;
  border-radius: 10px;
  //background-color: ${generateBGColor()};
  //opacity: 0.5;
  background-color: ${({ theme }) => theme.primarySoft};
`;
export const MessagesUserData = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 3px 0;
`;
export const MessagesRequestName = styled.Text`
  font-family: 'Nunito-ExtraBold';
  font-size: 16px;
  color: ${generateTextColor()};
`;
export const MessagesResponseName = styled.Text`
  font-family: 'Nunito-ExtraBold';
  font-size: 16px;
  color: ${generateTextColor()};
`;
export const MessagesDate = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: right;
  font-size: 13px;
  margin-left: 10px;
  color: ${({ theme }) => theme.textDark};
`;
export const MessagesText = styled.Text`
  font-family: 'Nunito-Medium';
  text-align: left;
  font-size: 16px;
  margin-left: 3px;
  color: ${({ theme }) => theme.text};
`;
// Footer
export const FooterContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const FooterContent = styled.View`
  height: 84px;
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;
// Footer Info
export const InfoContainer = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const InfoPicture = styled.View`
  justify-content: center;
  align-items: center;
`;
export const InfoState = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  align-self: flex-start;
  border-width: 1px;
  margin-top: 8px;
`;
export const InfoName = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 16px;
  margin-left: 10px;
  color: ${({ theme }) => theme.text};
`;
// Footer Input
export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #E5E5E5;
  border-radius: 30px;
  margin: 0 5%;
`;
export const InputTextBox = styled.TextInput`
  font-family: 'Nunito';
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  height: 55px;
  padding: 0 20px;
  border-radius: 30px;
  outline-width: 0;
  outline-style: none;
`;
export const InputButton = styled.TouchableOpacity`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
// Footer Actions
export const ActionsContainer = styled.View`
  flex-direction: row;
`;
export const ActionsButton = styled.TouchableOpacity`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;
// Tools
export const ToolsContainer = styled.View`
  flex: 1;
  width: 100%;
  position: absolute;
  right: 0;
  bottom: 50px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
`;
export const ToolsContent = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 5px;
`;
export const ToolsButton = styled.TouchableOpacity`
  margin: 5px;
`;
export const ToolsButtonText = styled.Text`
  font-family: 'Nunito';
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;
// Search
export const ActionSearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #E5E5E5;
  border-radius: 30px;
`;
export const ActionSearchSearchBox = styled.TextInput`
  font-family: 'Nunito';
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  height: 55px;
  padding: 0 20px;
  border-radius: 30px;
  outline-width: 0;
  outline-style: none;
`;
export const ActionsSearchButton = styled.TouchableOpacity`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

// Menu
export const MenuContainer = styled.View`
  flex-direction: column;
  align-items: center;
  min-width: 26.41%;
`;
// Hamburguer
export const HamburguerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const HamburguerContent = styled.View`
  flex-direction: column;
  align-items: center;
  width: 480px;
  border-left-width: 1px;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
`;
// Nav
export const NavContainer = styled.View`
  width: 70px;
  flex-direction: column;
  align-items: center;
`;
export const NavButton = styled.TouchableOpacity`
  width: 70px;
  height: 66px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;
export const NavItensButton = styled.TouchableOpacity`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
// Header Menu
export const HeaderMenuContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 66px;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;
export const HeaderInforSection = styled.TouchableOpacity`
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 10px;
`;
export const HeaderInfor= styled.View`
  text-align: left;
  justify-content: center;
  align-items: flex-start;
  margin: 0 13px;
  color: ${({ theme }) => theme.text};
`;
export const HeaderDisplayName = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;
export const HeaderUserName = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
  color: ${({ theme }) => theme.text};
`;
export const HeaderButtonSection = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 10px;
`;
export const HeaderButton = styled.TouchableOpacity`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0 13px;
`;
// Chats
export const ChatsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const ChatsButton = styled.TouchableOpacity`
  align-self: center;
  align-content: center;
  justify-content: center;
  height: 60px;
  width: 95%;
  border-width: 1px;
  border-width: 1px;
  border-color: ${({ isHovered, theme }) => (isHovered ? theme.border : theme.background)};
  padding: 0 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
`;
// Item
export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ItemContent = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-self: center;
`;
export const ItemSection = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-left: 5px;
`;
export const ItemTextSection = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  margin-left: 10px;
`;
export const ItemEditTextInput = styled.TextInput`
  width: 100%;
  font-family: 'Nunito-SemiBold';
  font-size: 18px;
  outline-width: 0;
  outline-style: none;
  color: ${({ theme }) => theme.text};
`;
export const ItemText = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;
export const ItemAction = styled.View`
  flex-direction: row;
  align-self: center;
  justify-content: center;
  margin-right: 5px;
`;
export const ItemButton = styled.TouchableOpacity``;
// Contacts
export const ContactContainer = styled.View`
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export const ContactButtonAdd = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 24px 0;
`;
// Add
export const AddContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
export const AddText = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;
// People
export const PeopleContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const PeopleContent = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const PeopleInput = styled.View`
  width: 95%;
  height: 48px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 30px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  margin-top: 5px;
  border-radius: 20px;
`;
export const PeopleTextInput = styled.TextInput`
  font-family: 'Nunito';
  width: 100%;
  padding: 10px;
  margin-left: 10px;
  color: ${({ theme }) => theme.text};
  outline-width: 0;
  outline-style: none;
`;
export const PeopleResult = styled.View`
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0 10px;
  margin-bottom: 24px;
`;
export const PeopleSection = styled.View`
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0 10px;
`;
export const PeopleAction = styled.View`
  width: 50%;
  flex-direction: row;
  justify-content: space-between;
`;
export const PeopleButton = styled.TouchableOpacity`
  padding: 5px  6px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;
// Person
export const PersonContainer = styled.View`
  flex-direction: column;
`;
export const PersonContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
export const PersonSection = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const PersonPicture = styled.View`
  justify-content: center;
  align-items: center;
`;
export const PersonInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  margin-left: 10px;
`;
export const PersonDisplayName = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;
export const PersonUserName = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.textDark};
`;

// Serach
export const SearchContainer = styled.View`
  flex-direction: column;
`;
export const SearchContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
export const SearchSection = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const SearchPicture = styled.View`
  justify-content: center;
  align-items: center;
`;
export const SearchInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  margin-left: 10px;
`;
export const SearchDisplayName = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;
export const SearchUserName = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.textDark};
`;

// Direct
export const DirectButton = styled.TouchableOpacity`
  align-self: center;
  width: 95%;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ isHovered, theme }) => (isHovered ? theme.border : theme.background)};
  padding: 0 10px;
`;
// Direct Item
export const DirectItemContainer = styled.View`
  flex-direction: column;
`;
export const DirectItemContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
export const DirectItemSection = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const DirectItemPicture = styled.View`
  justify-content: center;
  align-items: center;
`;
export const DirectItemState = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  align-self: flex-start;
  border-width: 1px;
`;
export const DirectItemInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  margin-left: 10px;
`;
export const DirectItemStateSection = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
export const DirectItemNotify = styled.View`
  align-items: flex-end;
  padding: 10px;
`;

// User
export const UserContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;
export const UserContent = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
export const UserCountry = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const UserScrollView = styled.ScrollView`
  width: 100%;
  flex-direction: column;
`;
export const UserH1 = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;
export const UserWideButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px 30px;
`;
export const UserSection = styled.View`
  justify-content: center;
  align-items: flex-start;
`;
export const UserTitle = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;
export const UserText = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

// Setting
export const SettingsContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;
export const SettingsContent = styled.View`
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  justify-content: space-between;
`;
export const SettingsScrollView = styled.ScrollView`
  width: 100%;
  flex-direction: column;
  padding: 10px 5px;
`;
export const SettingsItem = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0;
  padding: 0 6px;
  border-left-width: 2px;
  border-color: ${({ theme }) => theme.primary47};
`;
export const SettingsHeaderTitle = styled.Text`
  font-family: 'Nunito-Medium';
  text-align: left;
  font-size: 18px;
  margin-left: 5px;
  color: ${({ theme }) => theme.text};
`;
export const SettingsWideButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 13px;
  margin: 10px 0;
  border-left-width: 2px;
  border-color: ${({ theme }) => theme.primary47};
`;
export const SettingsDivider = styled.View`
  width: 95%;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.border}; SettingsDiv
`;
export const SettingsSection = styled.View`
  flex: 1;
  width: 100%;
  margin-left: 10px;
  justify-content: center;
  align-items: flex-end;
`;
export const SettingsDiv = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;
export const SettingsTitle = styled.Text`
  font-family: 'Nunito-Medium';
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;
export const SettingsText = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

// Auth
export const AuthContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
// News
export const NewsContainer = styled.View`
  width: 700px;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgSlider};
`;
export const NewsContent = styled.View`
  width: 100%;
  margin-top: 20px
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const NewsSection = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const NewsSlideImage = styled.Image`
  justify-content: center;
  align-items: center;
  width: calc(376.47px / 1.4);
  height: calc(911px / 1.4);
  resize-mode: contain;
  margin: 0 10px;
`;

// Content
export const ContentContainer = styled.View`
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
export const AuthInput = styled.View`
  width: 450px;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.text};
`;
export const AuthLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const AuthLinkText = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.textDark};
`;
export const AuthTitle = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: left;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;
export const AuthText = styled.Text`
  font-family: 'Nunito';
  text-align: left;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;
export const AuthButton = styled.TouchableOpacity`
  width: 144px;
  height: 45px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary};
`;
// Header
export const AuthHeaderLinkText = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;
// Footer
export const AuthFooterContainer = styled.View`
  width: 100%;
  height: 45px;
  padding: 0 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const AuthFooterLinkText = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.textDark};
`;
export const AuthFooterSection = styled.View`
  width: 240px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;