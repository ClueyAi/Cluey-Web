import React, { useContext, useState} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../../components/theme';

import { HeaderChatContainer } from '../../../components';

const Header = ({id}) => {
  const { theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);

  if (id && visible) {
    return (
      <HeaderChatContainer theme={theme}>

      </HeaderChatContainer>
    );
  }

  return;
};

Header.propTypes = {
  id: PropTypes.string
};

export default Header;