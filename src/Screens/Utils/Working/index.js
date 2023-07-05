import React, {useContext} from 'react';
import { ThemeContext } from '../../../components/theme';
import { LocaleContext } from '../../../components/locale';

import { WorkingContainer, WorkingImage, WorkingTitle, WorkingText } from '../components';

const Working = () => {
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);

  return (
    <WorkingContainer theme={theme}>
      <WorkingImage source={require('../../../../assets/images/working.png')} />
      <WorkingTitle theme={theme}>{locale.working.title}</WorkingTitle>
      <WorkingText theme={theme}>{locale.working.description}</WorkingText>
    </WorkingContainer>
  );
};

export default Working;