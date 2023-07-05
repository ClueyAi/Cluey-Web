import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../../components/theme';

import { 
  FooterContainer,
  FooterContent,
} from '../../../components';

import Info from './Info';
import Input from './Input';
import Actions from './Actions';

const Footer = ({id}) => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <FooterContainer>
      <FooterContent theme={theme}>
        <Info id={id} />
        <Input id={id} />
        <Actions id={id} />
      </FooterContent>
    </FooterContainer>
  );
};

Footer.propTypes = {
  id: PropTypes.string
};

export default Footer;