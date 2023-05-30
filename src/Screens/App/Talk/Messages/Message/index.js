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
      {data?.idUser === user?.uid ? (
        <Request data={data}/>
      ) : null}
      {data?.idUser !== user?.uid ? (
        <Response data={data}/>
      ) : null}
    </ChatMessages>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired
};

export default Message;