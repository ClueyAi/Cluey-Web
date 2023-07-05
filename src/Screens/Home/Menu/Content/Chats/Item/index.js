import React, { useContext, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import PropTypes from "prop-types";
import { ThemeContext } from "../../../../../../components/theme";

import {
  ItemContainer,
  ItemContent,
  ItemSection,
  ItemTextSection,
  ItemEditTextInput,
  ItemAction,
  ItemButton,
  ItemText
} from '../../../../../components';

const Item = ({ item, editing, setEditing, handlerEditChatName, handlerDeleteChat }) => {
  const { theme } = useContext(ThemeContext);
  const [chatName, setChatName] = useState(item.name? item.name : '');

  const name = item.name?.length > 35 ? item.name?.substring(0, 35) + '...' : item.name;

  const chatNameValidation = (text) => {
    setChatName(text);
  };
  
  const handlerEdit = () => {
    if (editing && item.id === editing) {
      setEditing(null);
    } else {
      setEditing(item.id);
    }
  };

  const handlerConfirmNameEdit = () => {
    setEditing(!editing);
    if (chatName !== item.name && chatName !== "") {
      handlerEditChatName(item.id, chatName);
    }
    setEditing(null);
    setChatName(item.name);
  };

  return (
    <ItemContainer>
      <ItemContent>
        <ItemSection>
          <AntDesign name="message1" size={22} color={theme.text} />
          <ItemTextSection>
            {editing === item.id ?
              <ItemEditTextInput
                placeholder={chatName}
                value={chatName}
                placeholderTextColor={theme.primary}
                selectionColor={theme.primary}
                autoFocus
                selectTextOnFocus
                onChangeText={chatNameValidation}
                onSubimiyEditing={handlerConfirmNameEdit}
              />
              :
              <ItemText>{name}</ItemText>
            }
          </ItemTextSection>
        </ItemSection>
      </ItemContent>
      {editing === item.id ?
        <ItemAction>
          <ItemButton onPress={handlerConfirmNameEdit}>
            <MaterialIcons style={{marginRight: 10}} name="check" size={22} color={theme.secondary} />
          </ItemButton>
          <ItemButton onPress={handlerEdit}>
            <MaterialIcons name="close" size={22} color={theme.error} />
          </ItemButton>
        </ItemAction>
        :
        <ItemAction>
          <ItemButton onPress={handlerEdit}>
            <MaterialIcons style={{marginRight: 10}} name="edit" size={22} color={theme.text} />
          </ItemButton>
          <ItemButton onPress={() => {handlerDeleteChat(item.id)}}>
            <MaterialIcons name="delete-outline" size={22} color={theme.error} />
          </ItemButton>
        </ItemAction>
      }
    </ItemContainer>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  handlerDeleteChat: PropTypes.func.isRequired,
  handlerEditChatName: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
};

export default Item;
