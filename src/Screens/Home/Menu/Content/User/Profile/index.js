import React, { useState, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserAvatar from "react-native-user-avatar";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";

import { FirebaseContext } from "/src/api/firebase";
import { ThemeContext } from "/src/components/theme";
import { LocaleContext } from "/src/components/locale";
import {
  Input,
  ButtonEmpyte,
  Profile,
  Picture,
  ProfilePicture,
  PictureEdit,
  Infor,
} from "/src/components/global";

import {
  UserProfileInput,
  UserProfileText
} from '../../../../../components'

const User = ({ editingName, handleEditName }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const { user, updateUserPhoto, updateDisplayName } = useContext(FirebaseContext);
  const [userName, setUserName] = useState(user?.displayName);

  const handleEditPhoto = async () => {
    pickImage();
  };
  
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(locale.settings.photo_button.library_permission);
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      try {
        await updateUserPhoto(uri);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const nameValidation = (text) => {
    setUserName(text);
  };
  const onEditName = async () => {
    const displayName = userName;
    try {
      await updateDisplayName(displayName);
    } catch (error) {
      console.error(error);
    }
    handleEditName();
  };

  return (
    <Profile>
      <Picture>
        <ButtonEmpyte
          onPress={handleEditPhoto}
        >
          <ProfilePicture>
            <UserAvatar
              size={102}
              style={{ width: 102, height: 102, borderRadius: 100 }}
              name={user?.displayName}
              src={user?.photoURL}
            />
          </ProfilePicture>
        </ButtonEmpyte>
        <PictureEdit>
          <Ionicons name="camera" size={14} color={theme.text} />
        </PictureEdit>
      </Picture>
      {editingName ?
        <Infor style={{marginTop: 10}}>
          <Input style={{ width: "50%", height: 30 }}>
            <UserProfileInput
              style={{ height: 50 }}
              value={userName}
              theme={theme}
              selectionColor={theme.primary}
              enterKeyHint="done"
              autoFocus
              onChangeText={nameValidation}
              onSubmitEditing={onEditName}
            />
            <ButtonEmpyte
              style={{ marginLeft: 5, marginRight: 10 }}
              onPress={onEditName}
            >
              <Ionicons name="checkmark" size={19} color={theme.secondary} />
            </ButtonEmpyte>
            <ButtonEmpyte
              style={{ marginLeft: 5, marginRight: 10 }}
              onPress={handleEditName}
            >
              <Ionicons name="close" size={19} color={theme.error} />
            </ButtonEmpyte>
          </Input>
        </Infor>
        :
        <Infor style={{marginTop: 10}}>
          <ButtonEmpyte
            style={{
              marginLeft: 30,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={handleEditName}
          >
            <UserProfileText theme={theme} style={{ marginRight: 10 }}>{user?.displayName}</UserProfileText>
            <Ionicons name="create-outline" size={19} color={theme.textGray} />
          </ButtonEmpyte>
        </Infor>
      }
    </Profile>
  );
};

User.propTypes = {
  editingName: PropTypes.bool,
  handleEditName: PropTypes.func,
};

export default User;
