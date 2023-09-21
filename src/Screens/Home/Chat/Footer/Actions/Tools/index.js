import React, { useContext } from 'react';
import { LocaleContext } from '/src/components/locale';
import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext, shadow } from '/src/components/theme';
import PropTypes from 'prop-types';

import { 
  ToolsContainer,
  ToolsContent,
  ToolsButton,
  ToolsButtonText,
} from '../../../../../components';

const Tools = ({id}) => {
  const {locale} = useContext(LocaleContext);
  const {archivedChat} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);

  const handlerArchivedChat = async () => {
    await archivedChat(id);
  };

  return (
    <ToolsContainer theme={theme} style={shadow}>
      <ToolsContent theme={theme}>
        <ToolsButton theme={theme}>
          <ToolsButtonText theme={theme}>{locale.tools.data}</ToolsButtonText>
        </ToolsButton>
        <ToolsButton theme={theme}>
          <ToolsButtonText theme={theme}>{locale.tools.select}</ToolsButtonText>
        </ToolsButton>
        <ToolsButton theme={theme}>
          <ToolsButtonText theme={theme}>{locale.tools.silence}</ToolsButtonText>
        </ToolsButton>
        <ToolsButton theme={theme}>
          <ToolsButtonText theme={theme}>{locale.tools.delete}</ToolsButtonText>
        </ToolsButton>
        <ToolsButton theme={theme} onPress={handlerArchivedChat}>
          <ToolsButtonText theme={theme}>{locale.tools.drop}</ToolsButtonText>
        </ToolsButton>
        <ToolsButton theme={theme}>
          <ToolsButtonText theme={theme}>{locale.tools.block}</ToolsButtonText>
        </ToolsButton>
      </ToolsContent>
    </ToolsContainer>
  );
};

Tools.propTypes = {
  id: PropTypes.string,
};

export default Tools;