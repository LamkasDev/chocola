import { webFrame, ipcRenderer } from 'electron';
import { getAPI, StubEvent } from './api';
import { ipcInvoker } from './ipc-invoker';
import { IpcEvent } from './ipc-event';

declare const chrome: any;
declare let browser: any;

export const injectAPI = async (webUi: boolean) => {
  const api = getAPI(webUi ? 'webui' : 'blessed_extension');

  if (webUi) {
    const w = await webFrame.executeJavaScript('window');
    w.browser = api;
    w.browser.ipcRenderer = ipcRenderer;
  } else {
    Object.assign(chrome, api);
    Object.freeze(chrome);
  }
};