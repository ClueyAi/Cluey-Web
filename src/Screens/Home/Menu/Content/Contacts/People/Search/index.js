import React, { useContext } from "react";
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";
import { ThemeContext } from '/src/components/theme'

import {
  SearchContainer,
  SearchContent,
  SearchSection,
  SearchPicture,
  SearchInfo,
  SearchDisplayName,
  SearchUserName
} from "../../../../../../components";

const Search = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SearchContainer>
      <SearchContent>
        <SearchSection>
          <SearchPicture>
            <UserAvatar
              size={45}
              style={{ width: 45, height: 45, borderRadius: 100 }}
              name={item?.displayName}
              src={item?.photoURL}
            />
          </SearchPicture>
          <SearchInfo>
            <SearchDisplayName theme={theme}>{item?.displayName}</SearchDisplayName>
            <SearchUserName theme={theme}>{item?.userName}</SearchUserName>
          </SearchInfo>
        </SearchSection>
      </SearchContent>
    </SearchContainer>
  );
};

Search.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Search;
