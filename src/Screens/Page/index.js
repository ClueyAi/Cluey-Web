import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import HTMLContent from './assets/index.html';

const Page = () => {
  const { width } = useWindowDimensions();
  const source = {
    html: HTMLContent
  };
  return (
    <RenderHtml
      contentWidth={width}
      source={source}
    />
  );
};

export default Page;
