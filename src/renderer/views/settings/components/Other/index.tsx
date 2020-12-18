import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import store from '../../store';
import { observer } from 'mobx-react-lite';
import { onSwitchChange } from '../../utils';
import { Switch } from '~/renderer/components/Switch';

const DiscordRPToggle = observer(() => {
  const { richPresence } = store.settings;

  return (
    <Row onClick={onSwitchChange('richPresence')}>
      <Title>Enable Discord Rich Presence</Title>
      <Control>
        <Switch value={richPresence} />
      </Control>
    </Row>
  );
});

const MusicModuleToggle = observer(() => {
  const { musicModule } = store.settings;

  return (
    <Row onClick={onSwitchChange('musicModule')}>
      <Title>Enable Music Module</Title>
      <Control>
        <Switch value={musicModule} />
      </Control>
    </Row>
  );
});

export const Other = () => {
  return (
    <>
      <Header>Other</Header>
      <DiscordRPToggle />
      <MusicModuleToggle />
    </>
  );
};
