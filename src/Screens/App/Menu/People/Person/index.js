import React from "react";
import { StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";

import {
  View,
  Profile,
  Picture,
  ProfilePicture,
  Infor,
  H3,
  H4,
} from "../../../../../components/styles";

const Person = ({ item }) => {
  const contact = item?.contactData.profile;

  const styles = StyleSheet.create({
    cards: {
      flex: 1,
      flexDirection: 'column',
    },
    data: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    }
  });

  return (
    <View style={{...styles.cards }}>
      <View style={styles.data}>
        <Profile
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: 50,
          }}
        >
          <Picture>
            <ProfilePicture style={{ width: 40, height: 40, borderWidth: 10 }}>
              <UserAvatar
                size={38}
                style={{ width: 38, height: 38, borderRadius: 100 }}
                name={contact?.displayName}
                src={contact?.photoURL}
              />
            </ProfilePicture>
          </Picture>
          <Infor
            style={{
              width: "auto",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 10,
            }}
          >
            <H3>{contact?.displayName}</H3>
            <H4>{contact?.userName}</H4>
          </Infor>
        </Profile>
      </View>
    </View>
  );
};

Person.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Person;
