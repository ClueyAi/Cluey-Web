import React, {useContext, useMemo} from 'react';
import PropTypes from 'prop-types';

import { FirebaseContext } from '../../../api/firebase';
import { Container } from '../../../components/global';

import Messages from './Messages';
import New from './New';

const Chat = ({navigation, route}) => {
  const {appStatus, chats} = useContext(FirebaseContext);

  const {id} = route.params;
  
  const status = appStatus?.server;

  const memoizedChatComponent = useMemo(() => (
    <Container>
      <Messages id={id} chats={chats} navigation={navigation} />
      <New chatId={id} />
    </Container>
  ), [chats, id, navigation]);
  
  if (!status) {
    return (
      <Container>
        <Messages id={id} chats={chats} navigation={navigation} />
      </Container>
    );
  }

  return memoizedChatComponent;
};

Chat.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default Chat;