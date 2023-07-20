import React, { useContext } from "react";
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";
import { ThemeContext } from '/src/components/theme'

import {
  PersonContainer,
  PersonContent,
  PersonSection,
  PersonPicture,
  PersonInfo,
  PersonDisplayName,
  PersonUserName
} from "../../../../../../components";

const Person = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <PersonContainer>
      <PersonContent>
        <PersonSection>
          <PersonPicture>
            <UserAvatar
              size={55}
              style={{ width: 55, height: 55, borderRadius: 100 }}
              name={item?.displayName}
              src={item?.photoURL}
            />
          </PersonPicture>
          <PersonInfo>
            <PersonDisplayName theme={theme}>{item?.displayName}</PersonDisplayName>
            <PersonUserName theme={theme}>{item?.userName}</PersonUserName>
          </PersonInfo>
        </PersonSection>
      </PersonContent>
    </PersonContainer>
  );
};

Person.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Person;
