import React, { useContext } from "react";
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemeContext } from "../../../../../../../components/theme";
import { P } from '../../../../../../../components/global'

import {
  DirectItemContainer,
  DirectItemContent,
  DirectItemSection,
  DirectItemPicture,
  DirectItemState,
  DirectItemInfo,
  DirectItemStateSection,
  DirectItemNotify
} from "../../../../../../components";

const Item = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  const friend = item?.userData;
  const chat = item;
  const lastMessage= chat?.messages.length > 0 ? chat?.messages[chat?.messages.length - 1].text : '';
  const messagePreview = lastMessage?.length > 35 ? lastMessage?.substring(0, 35) + '...' : lastMessage;

  const fullTime = chat?.updatedAt.split(" ")[1];
  const time = fullTime.split(":")[0] + ":" + fullTime.split(":")[1];

  const getNotify = () => {
    if (chat?.notify === 'received') {
      return theme.primary;
    } else if (chat?.notify === 'readed') {
      return theme.secondary;
    } else {
      return theme.textDark;
    }
  };

  const getState = () => {
    if (chat?.status === 'online') {
      return theme.secondary;
    } else if (chat?.status === 'away') {
      return theme.primary;
    } else if (chat?.status === 'busy') {
      return theme.error;
    } else {
      return theme.textDark;
    }
  };

  return (
    <DirectItemContainer>
      <DirectItemContent>
        <DirectItemSection>
          <DirectItemPicture>
            <UserAvatar
              size={55}
              style={{ width: 55, height: 55, borderRadius: 100, borderWidth: 2 }}
              name={friend?.displayName}
              src={friend?.photoURL}
            />
          </DirectItemPicture>
          <DirectItemState style={{backgroundColor: getState()}}/>
          <DirectItemInfo>
            <P style={{fontSize: 20}}>{friend?.displayName}</P>
            <P style={{color: theme.textDark}}>{messagePreview?messagePreview:' '}</P>
          </DirectItemInfo>
        </DirectItemSection>
        <DirectItemStateSection>
          <DirectItemNotify>
            <AntDesign name="check" size={22} color={getNotify()} />
          </DirectItemNotify>
          <P style={{color: theme.textDark}}>{time}</P>
        </DirectItemStateSection>
      </DirectItemContent>
    </DirectItemContainer>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
