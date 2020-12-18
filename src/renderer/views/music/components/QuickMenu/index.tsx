import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from '~/renderer/components/Input';
import { ProgressWithKnob } from '~/renderer/components/ProgressWithKnob';

import {
  Line,
  MenuItem,
  MenuItemNoPointer,
  MenuItems,
  Content,
  Icon,
  MenuItemTitle
} from './style';
import { ICON_PLAY_START, ICON_VIEWS, ICON_LIKE } from '~/renderer/constants/icons';
import store from '../../store';

const onFindClick = () => {
  /*
  // TODO(sentialx): get selected tab
  ipcRenderer.send(
    `find-show-${store.windowId}`,
    store.tabs.selectedTab.id,
    store.tabs.selectedTab.findInfo,
  );*/
};

const play = () => {
  store.play();
};

const pause = () => {
  store.pause();
};

const goToPos = (pos) => {
  store.goToPos(pos);
};

export const QuickMenu = observer(() => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
      }}
    >
      <Content>
        <MenuItems>
          <MenuItemNoPointer>
            <MenuItemTitle style={{ marginTop: "5px" }}>Youtube URL</MenuItemTitle>
            <Input style={{ marginTop: "5px" }} ref={store.musicRef}/>
          </MenuItemNoPointer>
          <MenuItem onClick={play} style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Icon icon={ICON_PLAY_START} />
            <MenuItemTitle>Play</MenuItemTitle>
          </MenuItem>
          <Line style={{ marginTop: "10px", marginBottom: "10px" }} />
          <MenuItem onClick={pause}>
          <Icon id="music-pause-icon" />
            <div id="music-pause" style={{ flex: 1 }}>Pause/Resume</div>
          </MenuItem>
          <Line style={{ marginTop: "10px", marginBottom: "10px" }} />
          <MenuItemNoPointer>
            <div id="music-title" style={{ flex: 1 }}>Playing</div>
          </MenuItemNoPointer>
          <MenuItemNoPointer>
            <div id="music-progress-text" style={{ flex: 1, marginRight: "10px" }}>0:00/0:00</div>
            <ProgressWithKnob id="music-progress" onClick={(pos) => { goToPos(pos) }} />
          </MenuItemNoPointer>
          <MenuItemNoPointer>
            <Icon icon={ICON_VIEWS} />
            <div id="music-views" style={{ flex: 1 }}>0</div>
            <Icon icon={ICON_LIKE} />
            <div id="music-likes" style={{ flex: 1 }}>0</div>
          </MenuItemNoPointer>
        </MenuItems>
      </Content>
    </div>
  );
});
