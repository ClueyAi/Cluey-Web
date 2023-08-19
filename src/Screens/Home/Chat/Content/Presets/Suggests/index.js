import React, { useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import PropTypes from "prop-types";
import { ThemeContext } from "/src/components/theme";

import {
  SuggestsContainer,
  SuggestsContent,
  SuggestsProfile,
  SuggestsInfor,
  SuggestsText
} from '../../../../../components'

const Suggests = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SuggestsContainer>
      <SuggestsContent>
        <SuggestsProfile>
          <AntDesign name="staro" size={22} color={theme.text} />
          <SuggestsInfor>
            <SuggestsText theme={theme}>{item.name}</SuggestsText>
          </SuggestsInfor>
        </SuggestsProfile>
      </SuggestsContent>
    </SuggestsContainer>
  );
};

Suggests.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Suggests;
