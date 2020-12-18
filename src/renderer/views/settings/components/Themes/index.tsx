import * as React from 'react';

import { Dropdown } from '~/renderer/components/Dropdown';
import { Title, Row, Control, Header } from '../App/style';
import store from '../../store';
import { observer } from 'mobx-react-lite';

const onThemeChange = (value: string) => {
  if (value === 'auto') {
    store.settings.themeAuto = true;
  } else {
    store.settings.themeAuto = false;
    store.settings.theme = value;
  }

  store.save();
};

const ThemeVariant = observer(() => {
  const defaultValue = store.settings.theme;

  return (
    <Row>
      <Title>Theme variant</Title>
      <Control>
        <Dropdown
          defaultValue={store.settings.themeAuto ? 'auto' : defaultValue}
          onChange={onThemeChange}
        >
          <Dropdown.Item value="auto">Auto</Dropdown.Item>
          <Dropdown.Item value="chocola-light">Light</Dropdown.Item>
          <Dropdown.Item value="chocola-dark">Dark</Dropdown.Item>
        </Dropdown>
      </Control>
    </Row>
  );
});

const onNekoChange = (value: string) => {
  store.settings.neko = value;
  store.save();
};

const NekoVariant = observer(() => {
  const defaultValue = store.settings.neko;

  return (
    <Row>
      <Title>Neko variant</Title>
      <Control>
        <Dropdown defaultValue={defaultValue} onChange={onNekoChange}>
          <Dropdown.Item value="chocola">Chocola</Dropdown.Item>
          <Dropdown.Item value="vanilla">Vanilla</Dropdown.Item>
        </Dropdown>
      </Control>
    </Row>
  );
});

export const Themes = observer(() => {
  return (
    <>
      <Header>Themes</Header>
      <ThemeVariant />
      <NekoVariant />
    </>
  );
});
