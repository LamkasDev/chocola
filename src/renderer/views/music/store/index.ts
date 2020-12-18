import * as React from 'react';
import { ipcRenderer, ipcMain, remote } from 'electron';
import { observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';
import { ICON_PLAY, ICON_PAUSE } from '~/renderer/constants/icons';

export class Store extends DialogStore {
  @observable
  public alwaysOnTop = false;

  @observable
  public updateAvailable = false;

  public musicRef = React.createRef<HTMLInputElement>();

  public constructor() {
    super();

    this.init();

    ipcRenderer.on('update-available', () => {
      this.updateAvailable = true;
    });

    this.updateProgress();
    setInterval(() => {
      this.updateProgress();
    }, 100)
  }

  public async updateProgress() {
    ipcRenderer.invoke(`play-update-fetch-${this.windowId}`).then((result) => {
      if(result === undefined) { return; }

      try {
        const progress = <HTMLProgressElement>document.getElementById("music-progress");
        const progressText = <HTMLDivElement>document.getElementById("music-progress-text");
        progress.value = result.playInfo.val;
        progress.max = result.playInfo.max;
        progressText.innerHTML = this.formatTime(result.playInfo.val*1000) + "/" + this.formatTime(result.playInfo.max*1000);

        const title = <HTMLDivElement>document.getElementById("music-title");
        const pause = <HTMLDivElement>document.getElementById("music-pause");
        const pauseIcon = <HTMLDivElement>document.getElementById("music-pause-icon");
        const views = <HTMLDivElement>document.getElementById("music-views");
        const likes = <HTMLDivElement>document.getElementById("music-likes");
        if(result.videoInfo !== undefined) {
          title.innerHTML = "Playing - " + result.videoInfo.title;
          pause.innerHTML = result.playInfo.paused ? "Resume" : "Pause";
          pauseIcon.style.backgroundImage = result.playInfo.paused ? "url(" + ICON_PLAY + ")" : "url(" + ICON_PAUSE + ")";
          views.innerHTML = result.videoInfo.views.toLocaleString();
          likes.innerHTML = result.videoInfo.likeCount.toLocaleString();
        } else {
          title.innerHTML = "Not playing";
          pause.innerHTML = "Pause/Resume";
          pauseIcon.style.backgroundImage = "url(" + ICON_PLAY + ")";
          views.innerHTML = "0";
          likes.innerHTML = "0";
        }
      } catch(e) {
        alert(e);
      }
    });
  }

  public formatTime(time) {
    let timeString = "";
    let timeLeft = time;

    const ms = timeLeft % 1000;
    timeLeft = (timeLeft - ms) / 1000;
    const secs = timeLeft % 60;
    timeLeft = (timeLeft - secs) / 60;
    const mins = timeLeft % 60;
    timeLeft = (timeLeft - mins) / 60;
    const hrs = timeLeft % 24;
    timeLeft = (timeLeft - hrs) / 24;
    const days = timeLeft;

    timeString = (secs < 10 ? "0" + secs : secs) + ":" + timeString;
    if(mins > 0) { timeString = (mins < 10 ? "0" + mins : mins) + ":" + timeString; } else { timeString = "0:" + timeString }
    if(hrs > 0) { timeString = (hrs < 10 ? "0" + hrs : hrs) + ":" + timeString; }
    if(days > 0) { timeString = (days < 10 ? "0" + days : days) + ":" + timeString; }

    timeString = timeString.substring(0, timeString.length - 1);
    return timeString;
  }

  public async init() {
    if (remote.getCurrentWindow()) {
      this.alwaysOnTop = remote.getCurrentWindow().isAlwaysOnTop();
    }

    this.updateAvailable = await ipcRenderer.invoke('is-update-available');
  }

  public async save() {
    ipcRenderer.send('save-settings', {
      settings: JSON.stringify(this.settings),
    });
  }

  public async play() {
    try {
      const url = this.musicRef.current.value;
      const videoID = url.substring(url.indexOf("watch?v=") + "watch?v=".length);
      ipcRenderer.send(`play-id-${this.windowId}`, videoID)
    } catch(e) {
      alert(e);
    }
  }

  public async pause() {
    try {
      ipcRenderer.send(`pause-${this.windowId}`)
    } catch(e) {
      alert(e);
    }
  }

  public async goToPos(pos) {
    try {
      ipcRenderer.send(`goToPos-${this.windowId}`, pos)
    } catch(e) {
      alert(e);
    }
  }
}

export default new Store();
