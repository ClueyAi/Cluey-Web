import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext ,shadow } from '/src/components/theme';

import { 
  MessagesRequest,
  MessagesUserData,
  MessagesRequestName,
  MessagesDate,
  MessagesText,
} from '../../../../../../components';

const Request = ({ data }) => {
  const {theme} = useContext(ThemeContext);
  const fullTime = data?.createdAt.split(" ")[1];
  const time = fullTime.split(":")[0] + ":" + fullTime.split(":")[1];

  return (
    <MessagesRequest theme={theme} style={shadow}>
      <MessagesUserData>
        <MessagesRequestName>{data?.name}</MessagesRequestName>
        <MessagesDate theme={theme}>{time}</MessagesDate>
      </MessagesUserData>
      <MessagesText theme={theme}>{data?.text}</MessagesText>
    </MessagesRequest>
  );
};

Request.propTypes = {
  data: PropTypes.object.isRequired
};

export default Request;