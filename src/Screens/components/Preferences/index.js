import React, { useState, useContext } from 'react';
import { Modal } from 'react-native';
import PropTypes from "prop-types";

import { LocaleContext } from '../../../components/locale'
import { ThemeContext, shadow } from '../../../components/theme'
import { FirebaseContext } from '../../../api/firebase';

import {
  LinkButton,
  PreferencesContainer,
  PreferencesContent,
  PreferencesHeader,
  PreferencesTitle,
  PreferencesDescription,
  PreferencesAction,
  PreferencesButton,
  PreferencesButtonText,
  PreferencesLinkText
} from '..';

import Focus from './Focus'
import Interests from './Interests'

const Preferences = ({ setVPreferences }) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {putPreferences} = useContext(FirebaseContext);
  const [focusItens, setFocusItens] = useState(null);
  const [interestsItens, setInterestsItens] = useState(null);
  const [focusDone, setFocusDone] = useState(false);

  const handleContinueFocus = () => {
    setFocusDone(true);
  };
  const handleSkipFocus = () => {
    setFocusDone(true);
  };

  const handleContinueInterests = async () => {
    await putPreferences(focusItens, interestsItens);
    setVPreferences(false)
  };
  const handleSkipInterests = async () => {
    await putPreferences(focusItens, interestsItens);
    setVPreferences(false)
  };
  
  if (focusDone) {
    return (
      <Modal transparent={true}>
        <PreferencesContainer theme={theme}>
          <PreferencesContent theme={theme} style={shadow}>
            <PreferencesHeader>
              <PreferencesTitle>{locale.preferences.interests.title}</PreferencesTitle>
              <PreferencesDescription>{locale.preferences.interests.description}</PreferencesDescription>
            </PreferencesHeader>
            <Interests setInterestsItens={setInterestsItens} />
            <PreferencesAction>
              <PreferencesButton theme={theme} onPress={handleContinueInterests}>
                <PreferencesButtonText theme={theme}>{locale.preferences.continue_button.text}</PreferencesButtonText>
              </PreferencesButton>
              <LinkButton onPress={handleSkipInterests}>
                <PreferencesLinkText theme={theme}>{locale.preferences.skip_button.text}</PreferencesLinkText>
              </LinkButton>
            </PreferencesAction>
          </PreferencesContent>
        </PreferencesContainer>
      </Modal>
    );
  }
  else {
    return (
      <Modal transparent={true}>
        <PreferencesContainer theme={theme}>
          <PreferencesContent theme={theme} style={shadow}>
            <PreferencesHeader>
              <PreferencesTitle>{locale.preferences.focus.title}</PreferencesTitle>
              <PreferencesDescription>{locale.preferences.focus.description}</PreferencesDescription>
            </PreferencesHeader>
            <Focus setFocusItens={setFocusItens} />
            <PreferencesAction>
              <PreferencesButton theme={theme} onPress={handleContinueFocus}>
                <PreferencesButtonText theme={theme}>{locale.preferences.continue_button.text}</PreferencesButtonText>
              </PreferencesButton>
              <LiLinkButtonnk onPress={handleSkipFocus}>
                <PreferencesLinkText theme={theme}>{locale.preferences.skip_button.text}</PreferencesLinkText>
              </LiLinkButtonnk>
            </PreferencesAction>
          </PreferencesContent> 
        </PreferencesContainer>
      </Modal>
    );
  }
};

Preferences.propTypes = {
  setVPreferences: PropTypes.func.isRequired,
};

export default Preferences;