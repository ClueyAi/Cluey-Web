import React from 'react';
import PropTypes from 'prop-types';

import { shadow } from '../../../../../../components/theme';
import { 
  RequestMessages,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import Menu from './Menu';

const Request = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Menu data={data}>
    <RequestMessages style={shadow}>
      <MessageText>{data?.text}</MessageText>
      <DateText>{time}</DateText>
    </RequestMessages>
    </Menu>
  );
};

Request.propTypes = {
  data: PropTypes.object.isRequired
};

export default Request;