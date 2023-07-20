import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '/src/components/theme';

import { 
  FooterContainer,
  FooterContent,
} from '../../../components';

import Info from './Info';
import Input from './Input';
import Actions from './Actions';

const Footer = ({id, setSend}) => {
  const {theme} = React.useContext(ThemeContext);

  if (!id) {
    return null;
  }

  return (
    <FooterContainer>
      <FooterContent theme={theme}>
        <Info id={id} />
        <Input id={id} setSend={setSend} />
        <Actions id={id} />
      </FooterContent>
    </FooterContainer>
  );
};

Footer.propTypes = {
  id: PropTypes.string,
  setSend: PropTypes.func,
};

export default Footer;