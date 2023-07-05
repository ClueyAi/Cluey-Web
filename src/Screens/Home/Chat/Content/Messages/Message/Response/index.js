import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext ,shadow } from '../../../../../../../components/theme';

import { 
  MessagesResponse,
  MessagesUserData,
  MessagesResponseName,
  MessagesDate,
  MessagesText,
} from '../../../../../../components';

const Response = ({ data }) => {
  const {theme} = useContext(ThemeContext);
  const fullTime = data?.createdAt.split(" ")[1];
  const time = fullTime.split(":")[0] + ":" + fullTime.split(":")[1];

  return (
    <MessagesResponse theme={theme} style={shadow}>
      <MessagesUserData>
        <MessagesResponseName>{data?.name}</MessagesResponseName>
        <MessagesDate theme={theme}>{time}</MessagesDate>
      </MessagesUserData>
      <MessagesText theme={theme}>{data?.text}</MessagesText>
    </MessagesResponse>
  );
};

Response.propTypes = {
  data: PropTypes.object.isRequired
};

export default Response;