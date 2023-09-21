import React, { useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';

import { LocaleContext} from '/src/components/locale';
import { ThemeContext } from '/src/components/theme';

import {
  View,
  Div,
  H1, H1Mini, H3, PMini,
  ButtonEmpyte,
  Image,
  AboutContainer,
  AboutHeader,
  AboutContent,
  AboutSection,
  AboutView,
  AboutPhoto,
  AboutScrollView,
  AboutFooter
} from '../components'
import { navigate } from "../../functions";

import Footer from '../Footer';

const About = () => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const {goBack} = navigate();

  const handleBack = () => {
    goBack();
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };

  const handleOpenLink = (url) => {
    openInNewTab(url);
  };

  return (
    <AboutContainer theme={theme}>
      <AboutContent>
        <AboutScrollView showsVerticalScrollIndicator={false}>
          <AboutHeader theme={theme}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ButtonEmpyte style={{color: theme.background, paddingHorizontal: 5}} onPress={handleBack}>
                <Ionicons name="chevron-back" size={32} color={theme.text} />
              </ButtonEmpyte>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="chevron-back" size={32} color={theme.transparent} />
            </View>
          </AboutHeader>
          <AboutView>
            <H1>{locale.global.team.title}</H1>
            <AboutSection>
              <ButtonEmpyte onPress={() => handleOpenLink(locale.global.team.designer.site_url)}>
                <AboutPhoto theme={theme}>
                  <UserAvatar size={112} style={{width: 112, height: 112, borderRadius: 100}} name={locale.global.team.designer.name} src={locale.global.team.designer?.photo_url}/>
                </AboutPhoto>
                <H3>{locale.global.team.designer.name}</H3>
                <PMini>{locale.global.team.designer.office}</PMini>        
              </ButtonEmpyte>
              <ButtonEmpyte onPress={() => handleOpenLink(locale.global.team.developer.site_url)}>
                <AboutPhoto theme={theme}>
                  <UserAvatar size={112} style={{width: 112, height: 112, borderRadius: 100}} name={locale.global.team.developer.name} src={locale.global.team.developer?.photo_url}/>
                </AboutPhoto>
                <H3>{locale.global.team.developer.name}</H3>
                <PMini>{locale.global.team.developer.office}</PMini>           
              </ButtonEmpyte>
              <ButtonEmpyte onPress={() => handleOpenLink(locale.global.team.tester.site_url)}>
                <AboutPhoto theme={theme}>
                  <UserAvatar size={112} style={{width: 112, height: 112, borderRadius: 100}} name={locale.global.team.tester.name} src={locale.global.team.tester?.photo_url}/>
                </AboutPhoto>
                <H3>{locale.global.team.tester.name}</H3>
                <PMini>{locale.global.team.tester.office}</PMini>         
              </ButtonEmpyte>
            </AboutSection>
            <H1 style={{marginTop: 20}}>{locale.global.mentor.title}</H1>
            <AboutSection>
              <ButtonEmpyte onPress={() => handleOpenLink(locale.global.mentor.mentor1.site_url)}>
                <AboutPhoto theme={theme}>
                  <UserAvatar size={112} style={{width: 112, height: 112, borderRadius: 100}} name={locale.global.mentor.mentor1.name} src={locale.global.mentor.mentor1.photo_url}/>
                </AboutPhoto>
                <H3>{locale.global.mentor.mentor1.name}</H3>           
              </ButtonEmpyte>
              <ButtonEmpyte onPress={() => handleOpenLink(locale.global.mentor.mentor2.site_url)}>
                <AboutPhoto theme={theme}>
                  <UserAvatar size={112} style={{width: 112, height: 112, borderRadius: 100}} name={locale.global.mentor.mentor2.name} src={locale.global.mentor.mentor2.photo_url}/>
                </AboutPhoto>
                <H3>{locale.global.mentor.mentor2.name}</H3>         
              </ButtonEmpyte>
              <ButtonEmpyte onPress={() => handleOpenLink(locale.global.mentor.mentor3.site_url)}>
                <AboutPhoto theme={theme}>
                  <UserAvatar size={112} style={{width: 112, height: 112, borderRadius: 100}} name={locale.global.mentor.mentor3.name} src={locale.global.mentor.mentor3.photo_url}/>
                </AboutPhoto>
                <H3>{locale.global.mentor.mentor3.name}</H3>        
              </ButtonEmpyte>
            </AboutSection>
            <H1 style={{marginTop: 40}}>{locale.global.partners.title}</H1>
            <AboutSection>
              <ButtonEmpyte onPress={() => handleOpenLink(locale.global.partners.islagaia.site_url)}>
                <Div>
                  <Image style = {{ width: 302.4, height: 127.68 }} source={{uri: locale.global.partners.islagaia.logo_url}}/>
                </Div>   
              </ButtonEmpyte>
            </AboutSection>
            <View style={{flexDirection: 'row', marginTop: 60, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 152, height: 112}} source={require('../../../../assets/images/logoname.png')} />
              <H1Mini style={{fontSize: 16, padding: 2}}>©</H1Mini>
            </View>
            <View style={{marginTop: 20, marginBottom: 280, alignItems: 'center'}}>
            </View>
          </AboutView>
        </AboutScrollView>
      </AboutContent>
      <AboutFooter theme={theme}>
        <Footer />
      </AboutFooter>
    </AboutContainer>
  );
};

export default About;