import React from 'react';
import PropTypes from 'prop-types';

import { shadow } from '../../../../../../components/theme';
import { 
  ResponseMessages,
  NameText,
  MessageText,
  DateText,
} from '../../../../../../components/styles';
import Menu from './Menu';

const Response = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Menu data={data}>
      <ResponseMessages style={shadow}>
        <NameText>{data?.name}</NameText>
        <MessageText>{data?.text}</MessageText>
        <DateText>{time}</DateText>
      </ResponseMessages>
    </Menu>
  );
};

Response.propTypes = {
  data: PropTypes.object.isRequired
};

export default Response;