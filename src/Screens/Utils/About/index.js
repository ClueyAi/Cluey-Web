import React, { useContext } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';

import { LocaleContext} from '/src/components/locale';
import { ThemeContext } from '/src/components/theme';
/*import { 
  Div,
  View,
  H1, H1Mini, H3, H3Bold, P, PMini,
  ButtonEmpyte,
  Picture,
  Image,
} from '/src/components/global';*/

import {
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

  const handlePolicy = async () => {
    window.open('https://cluey.webflow.io/termos', '_blank');
  };
/*
  return (
    <AboutContainer>
      <AboutContent>
        <AboutHeader theme={theme}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ButtonEmpyte style={{color: theme.background, paddingHorizontal: 5}} onPress={handleBack}>
              <Ionicons name="chevron-back" size={32} color={theme.text} />
            </ButtonEmpyte>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: 58, height: 58, marginBottom: -2}} source={require('../../../../assets/images/icon.png')} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Ionicons name="chevron-back" size={32} color={theme.transparent} />
          </View>
        </AboutHeader>
        <AboutScrollView>
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
                <Picture>
                  <Image style = {{ width: 302.4, height: 127.68 }} source={{uri: locale.global.partners.islagaia.logo_url}}/>
                </Picture>   
              </ButtonEmpyte>
            </AboutSection>
            <View style={{flexDirection: 'row', marginTop: 60, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 152, height: 112}} source={require('../../../../assets/images/logoname.png')} />
              <H1Mini style={{fontSize: 16, padding: 2}}>©</H1Mini>
            </View>
            <View style={{marginTop: 20, marginBottom: 180, alignItems: 'center'}}>
              <H3Bold>{locale.global.app.resume_title}</H3Bold>
              <P style={{width: '60%', textAlign: 'center', marginTop: 5}}>{locale.global.app.resume}</P>
            </View>
          </AboutView>
        </AboutScrollView>
      </AboutContent>
      <AboutFooter theme={theme}>
        <ButtonEmpyte 
          style={{color: theme.background}}
          onPress={handlePolicy}  
        >
          <P>{locale.global.app.policy_terms.title}</P>
        </ButtonEmpyte>
        <H3 style={{marginTop: 5}}>{locale.global.app.contact_us.title}</H3>
        <Div style={{flexDirection: 'row', padding: 5}}>
          <ButtonEmpyte style={{color: theme.background, paddingHorizontal: 5}} onPress={() => handleOpenLink(locale.global.app.contact_us.website)}>
            <AntDesign name="earth" size={28} color={theme.border} />
          </ButtonEmpyte>
          <ButtonEmpyte style={{color: theme.background, paddingHorizontal: 5}} onPress={() => handleOpenLink(locale.global.app.contact_us.github)}>
            <AntDesign name="github" size={28} color={theme.border}  />
          </ButtonEmpyte>
          <ButtonEmpyte style={{color: theme.background, paddingHorizontal: 5}} onPress={() => handleOpenLink(locale.global.app.contact_us.facebook)}>
            <AntDesign name="facebook-square" size={28} color={theme.border}  />
          </ButtonEmpyte>
        </Div>
      </AboutFooter>
    </AboutContainer>
  );*/
  return 
};

export default About;