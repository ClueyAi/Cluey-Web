import React, { useContext } from 'react';

import { ThemeContext } from '/src/components/theme';
import { LocaleContext } from '/src/components/locale';
import { FirebaseContext } from '/src/api/firebase';

import {
  NotifySwitch,
  ContentNotify,
  ContentNotifyProfile,
  ContentNotifySection,
  ContentNotifyTitle,
} from '../../../components'

const Notify = () => {
  const {theme} = useContext(ThemeContext);
  const {locale} = useContext(LocaleContext);
  const {user, editNotify} = useContext(FirebaseContext);

  const toggleSwitchNotify = async (value) => {
    await editNotify(value);
  };

  return (
    <ContentNotify>
      <ContentNotifyProfile>
        <ContentNotifyTitle theme={theme}>{locale.notify.title}</ContentNotifyTitle>
      </ContentNotifyProfile>
      <ContentNotifySection theme={theme}>
        <NotifySwitch notifyState={user?.notify} circleSize={65} barHeight={50} toggleSwitchNotify={toggleSwitchNotify} />
      </ContentNotifySection>
    </ContentNotify>
  );
};

export default Notify;