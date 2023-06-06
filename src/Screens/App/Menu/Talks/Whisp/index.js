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
  P,
  H6,
} from "../../../../../components/styles";

const Whisp = ({ item }) => {
  const user = item?.userData.profile;
  const talk = item;
  const lastMessage= talk?.messages.length > 0 ? talk?.messages[talk?.messages.length - 1].text : '';

  const fullTime = talk?.updatedAt.split(" ")[4];
  const time = fullTime.split(":")[0] + ":" + fullTime.split(":")[1];
  const fullDate = talk?.updatedAt.split(" ")[1] + "/" + talk?.updatedAt.split(" ")[2] + "/" + talk?.updatedAt.split(" ")[3];

  const styles = StyleSheet.create({
    cards: {
      flexDirection: 'column',
    },
    data: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
            height: 50,
          }}
        >
          <Picture>
            <ProfilePicture style={{ width: 40, height: 40, borderWidth: 10 }}>
              <UserAvatar
                size={38}
                style={{ width: 38, height: 38, borderRadius: 100 }}
                name={user?.displayName}
                src={user?.photoURL}
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
            <H3>{user?.displayName}</H3>
            <P>{lastMessage}</P>
          </Infor>
        </Profile>
        <View style={{position: 'absolute', right: 2, top: 10}}>
          <H6>{fullDate}</H6>
          <H6>{time}</H6>
        </View>
      </View>
    </View>
  );
};

Whisp.propTypes = {
  item: PropTypes.object.isRequired
};

export default Whisp;
