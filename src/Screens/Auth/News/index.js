import React, { useContext } from 'react';
import { ThemeContext } from '/src/components/theme';

import {
  NewsContainer,
  NewsSlideImage
} from '../../components'

const News = () => {
  const { theme } = useContext(ThemeContext);

  const bannersUrls = [
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb4.png?alt=media&token=ec015370-c84d-4f86-be96-ae9dfa956803',
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb2.png?alt=media&token=888c5dc5-b1a5-4e8b-a067-2f083037713f',
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb3.png?alt=media&token=4073a6f5-de09-41e9-8ba3-d1355f13db0b',
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb4.png?alt=media&token=ec015370-c84d-4f86-be96-ae9dfa956803',
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb5.png?alt=media&token=826430e8-c8df-4258-9369-52a82e30aa30',
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb6.png?alt=media&token=c6bef93d-b639-44df-834f-f0cf7186ab22',
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb7.png?alt=media&token=fbc12211-cd91-4f31-a1dd-4ecd66c965d6',
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb8.png?alt=media&token=e4ff8b40-3d77-4d0c-8240-baa1bf092192',
    'https://firebasestorage.googleapis.com/v0/b/cluey-33308.appspot.com/o/public%2Fcluey%2Fb9.png?alt=media&token=bc4f08bd-e4d8-4a2a-8497-c5538bef287c'
  ];

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * bannersUrls.length);
    return bannersUrls[randomIndex];
  }

  const randomImageUrl = getRandomImage();

  return (
    <NewsContainer theme={theme}>
      <NewsSlideImage source={randomImageUrl} />
    </NewsContainer>
  );
};

export default News;