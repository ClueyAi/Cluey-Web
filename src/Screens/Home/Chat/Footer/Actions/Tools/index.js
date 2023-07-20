import React, { useContext } from 'react';
import { LocaleContext } from '/src/components/locale';
import { ThemeContext, shadow } from '/src/components/theme';

import { 
  ToolsContainer,
  ToolsContent,
  ToolsButton,
  ToolsButtonText,
} from '../../../../../components';

const Tools = () => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

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
        <ToolsButton theme={theme}>
          <ToolsButtonText theme={theme}>{locale.tools.drop}</ToolsButtonText>
        </ToolsButton>
        <ToolsButton theme={theme}>
          <ToolsButtonText theme={theme}>{locale.tools.block}</ToolsButtonText>
        </ToolsButton>
      </ToolsContent>
    </ToolsContainer>
  );
};

export default Tools;