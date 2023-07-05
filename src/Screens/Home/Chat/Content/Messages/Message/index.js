import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../../../../api/firebase';

import { MessagesContent } from '../../../../../components';

import Request from './Request';
import Response from './Response';

const Message = ({ data }) => {
  const {user} = useContext(FirebaseContext);

  if (!data ) {
    return null;
  }

  return (
    <MessagesContent>
      {data?.uid === user?.uid ? (
        <Request data={data}/>
      ) : null}
      {data?.uid !== user?.uid ? (
        <Response data={data}/>
      ) : null}
    </MessagesContent>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired
};

export default Message;