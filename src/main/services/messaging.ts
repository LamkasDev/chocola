import { ipcMain } from 'electron';
import { parse } from 'url';
// import { getPassword, setPassword, deletePassword } from 'keytar';

import { AppWindow } from '../windows';
import { Application } from '../application';
import { showMenuDialog } from '../dialogs/menu';
import { showMusicDialog } from '../dialogs/music';
import { PreviewDialog } from '../dialogs/preview';
import { IFormFillData, IBookmark } from '~/interfaces';
import { SearchDialog } from '../dialogs/search';

import * as bookmarkMenu from '../menus/bookmarks';
import { showFindDialog } from '../dialogs/find';
import { getFormFillMenuItems } from '../utils';
import { showAddBookmarkDialog } from '../dialogs/add-bookmark';
import { showExtensionDialog } from '../dialogs/extension-popup';
import { showDownloadsDialog } from '../dialogs/downloads';
import { showZoomDialog } from '../dialogs/zoom';
import { showTabGroupDialog } from '../dialogs/tabgroup';

export const runMessagingService = (appWindow: AppWindow) => {
  const { id } = appWindow;

  ipcMain.on(`window-focus-${id}`, () => {
    appWindow.win.focus();
    appWindow.webContents.focus();
  });

  ipcMain.on(`window-toggle-maximize-${id}`, () => {
    if (appWindow.win.isMaximized()) {
      appWindow.win.unmaximize();
    } else {
      appWindow.win.maximize();
    }
  });

  ipcMain.on(`window-minimize-${id}`, () => {
    appWindow.win.minimize();
  });

  ipcMain.on(`window-close-${id}`, () => {
    appWindow.win.close();
  });

  ipcMain.on(`window-fix-dragging-${id}`, () => {
    appWindow.fixDragging();
  });

  ipcMain.on(`show-menu-dialog-${id}`, (e, x, y) => {
    showMenuDialog(appWindow.win, x, y);
  });

  ipcMain.on(`show-music-dialog-${id}`, (e, x, y) => {
    showMusicDialog(appWindow.win, x, y);
  });

  ipcMain.on(`search-show-${id}`, (e, data) => {
    const dialog = Application.instance.dialogs.getPersistent(
      'search',
    ) as SearchDialog;
    dialog.data = data;
    dialog.show(appWindow.win);
  });

  ipcMain.handle(`is-dialog-visible-${id}`, (e, dialog) => {
    return Application.instance.dialogs.isVisible(dialog);
  });

  ipcMain.on(`show-tab-preview-${id}`, (e, tab) => {
    const dialog = Application.instance.dialogs.getPersistent(
      'preview',
    ) as PreviewDialog;
    dialog.tab = tab;
    dialog.show(appWindow.win);
  });

  ipcMain.on(`hide-tab-preview-${id}`, (e, tab) => {
    const dialog = Application.instance.dialogs.getPersistent(
      'preview',
    ) as PreviewDialog;
    dialog.hide();
  });

  ipcMain.on(`find-show-${id}`, () => {
    showFindDialog(appWindow.win);
  });

  ipcMain.on(`find-in-page-${id}`, () => {
    appWindow.send('find');
  });

  ipcMain.on(`play-id-${id}`, (e, videoID) => {
    appWindow.send('play-id', videoID);
  });

  ipcMain.on(`play-list-${id}`, (e, url) => {
    appWindow.send('play-list', url);
  });

  ipcMain.on(`pause-${id}`, (e) => {
    appWindow.send('pause');
  });

  ipcMain.on(`goToPos-${id}`, (e, pos) => {
    appWindow.send('goToPos', pos);
  });

  ipcMain.on(`skip-${id}`, (e) => {
    appWindow.send('skip');
  });

  let c_info: any;
  ipcMain.on(`play-update-${id}`, (e, info) => {
    c_info = info;
  });

  ipcMain.handle(`play-update-fetch-${id}`, async(e) => {
    return c_info;
  });

  ipcMain.on(`show-add-bookmark-dialog-${id}`, (e, left, top) => {
    showAddBookmarkDialog(appWindow.win, left, top);
  });

  if (process.env.ENABLE_EXTENSIONS) {
    ipcMain.on(`show-extension-popup-${id}`, (e, left, top, url, inspect) => {
      showExtensionDialog(appWindow.win, left, top, url, inspect);
    });
  }

  ipcMain.on(`show-downloads-dialog-${id}`, (e, left, top) => {
    showDownloadsDialog(appWindow.win, left, top);
  });

  ipcMain.on(`show-zoom-dialog-${id}`, (e, left, top) => {
    showZoomDialog(appWindow.win, left, top);
  });

  ipcMain.on(`show-tabgroup-dialog-${id}`, (e, tabGroup) => {
    showTabGroupDialog(appWindow.win, tabGroup);
  });

  ipcMain.on(`edit-tabgroup-${id}`, (e, tabGroup) => {
    appWindow.send(`edit-tabgroup`, tabGroup);
  });

  ipcMain.on(`is-incognito-${id}`, (e) => {
    e.returnValue = appWindow.incognito;
  });

  if (process.env.ENABLE_AUTOFILL) {
    // TODO: autofill
    // ipcMain.on(`form-fill-show-${id}`, async (e, rect, name, value) => {
    //   const items = await getFormFillMenuItems(name, value);

    //   if (items.length) {
    //     appWindow.dialogs.formFillDialog.send(`formfill-get-items`, items);
    //     appWindow.dialogs.formFillDialog.inputRect = rect;

    //     appWindow.dialogs.formFillDialog.resize(
    //       items.length,
    //       items.find((r) => r.subtext) != null,
    //     );
    //     appWindow.dialogs.formFillDialog.rearrange();
    //     appWindow.dialogs.formFillDialog.show(false);
    //   } else {
    //     appWindow.dialogs.formFillDialog.hide();
    //   }
    // });

    // ipcMain.on(`form-fill-hide-${id}`, () => {
    //   appWindow.dialogs.formFillDialog.hide();
    // });

    ipcMain.on(
      `form-fill-update-${id}`,
      async (e, _id: string, persistent = false) => {
        const url = appWindow.viewManager.selected.url;
        const { hostname } = parse(url);

        const item =
          _id &&
          (await Application.instance.storage.findOne<IFormFillData>({
            scope: 'formfill',
            query: { _id },
          }));

        if (item && item.type === 'password') {
          item.fields.password = await getPassword(
            'chocola',
            `${hostname}-${item.fields.username}`,
          );
        }

        appWindow.viewManager.selected.send(
          `form-fill-update-${id}`,
          item,
          persistent,
        );
      },
    );

    // ipcMain.on(`credentials-show-${id}`, (e, data) => {
    //   appWindow.dialogs.credentialsDialog.send('credentials-update', data);
    //   appWindow.dialogs.credentialsDialog.rearrange();
    //   appWindow.dialogs.credentialsDialog.show();
    // });

    // ipcMain.on(`credentials-hide-${id}`, () => {
    //   appWindow.dialogs.credentialsDialog.hide();
    // });

    ipcMain.on(`credentials-save-${id}`, async (e, data) => {
      const { username, password, update, oldUsername } = data;
      const view = appWindow.viewManager.selected;
      const hostname = view.hostname;

      if (!update) {
        const item = await Application.instance.storage.insert<IFormFillData>({
          scope: 'formfill',
          item: {
            type: 'password',
            url: hostname,
            favicon: appWindow.viewManager.selected.favicon,
            fields: {
              username,
              passLength: password.length,
            },
          },
        });

        appWindow.viewManager.settingsView.webContents.send(
          'credentials-insert',
          item,
        );
      } else {
        await Application.instance.storage.update({
          scope: 'formfill',
          query: {
            type: 'password',
            url: hostname,
            'fields.username': oldUsername,
            'fields.passLength': password.length,
          },
          value: {
            'fields.username': username,
          },
        });

        appWindow.viewManager.settingsView.webContents.send(
          'credentials-update',
          { ...data, hostname },
        );
      }

      await setPassword('chocola', `${hostname}-${username}`, password);

      appWindow.send(`has-credentials-${view.id}`, true);
    });

    ipcMain.on(`credentials-remove-${id}`, async (e, data: IFormFillData) => {
      const { _id, fields } = data;
      const view = appWindow.viewManager.selected;

      await Application.instance.storage.remove({
        scope: 'formfill',
        query: {
          _id,
        },
      });

      await deletePassword('chocola', `${view.hostname}-${fields.username}`);

      appWindow.viewManager.settingsView.webContents.send(
        'credentials-remove',
        _id,
      );
    });

    ipcMain.on(
      'credentials-get-password',
      async (e, id: string, account: string) => {
        const password = await getPassword('chocola', account);
        e.sender.send(id, password);
      },
    );
  }

  ipcMain.handle(
    `show-bookmarks-bar-dropdown-${id}`,
    (
      event,
      folderId: string,
      bookmarks: IBookmark[],
      { x, y }: { x: number; y: number },
    ) => {
      bookmarkMenu
        .createDropdown(appWindow, folderId, bookmarks)
        .popup({ x: Math.floor(x), y: Math.floor(y), window: appWindow.win });
    },
  );
  ipcMain.handle(
    `show-bookmarks-bar-context-menu-${id}`,
    (event, item: IBookmark) => {
      bookmarkMenu.createMenu(appWindow, item).popup({ window: appWindow.win });
    },
  );
};
