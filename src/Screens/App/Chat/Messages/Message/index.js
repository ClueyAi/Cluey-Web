import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FirebaseContext } from '../../../../../api/firebase';

import { ChatMessages } from '../../../../../components/styles';

import Request from './Request';
import Response from './Response';

const Message = ({ data }) => {
  const {user} = useContext(FirebaseContext);


  if (!data ) {
    return null;
  }

  return (
    <ChatMessages>
      {data?.name === user?.profile.userName ? (
        <Request data={data}/>
      ) : null}
      {data?.name !== user?.profile.userName ? (
        <Response data={data}/>
      ) : null}
    </ChatMessages>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired
};

export default Message;