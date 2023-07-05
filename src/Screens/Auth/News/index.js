import React, { useContext } from 'react';
import { Image } from 'react-native';
import { ThemeContext } from '../../../components/theme';

import {
  NewsContainer,
  NewsContent,
  NewsSection,
  NewsSlideImage
} from '../../components'

const News = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NewsContainer theme={theme}>
      <NewsContent>
        <Image style={{width: '20%', height: '20%', resizeMode: 'contain'}} source={require('../../../../assets/images/logoname.png')} />
        <NewsSection>
          <NewsSlideImage source={require('../../../../assets/images/screen1.png')} />
          <NewsSlideImage source={require('../../../../assets/images/screen2.png')} />
        </NewsSection>
      </NewsContent>
    </NewsContainer>
  );
};

export default News;