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

  public updateProgress() {
    ipcRenderer.invoke(`play-update-fetch-${this.windowId}`).then((result) => {
      if(result === undefined) { return; }

      try {
        const title = <HTMLDivElement>document.getElementById("music-title");
        const pause = <HTMLDivElement>document.getElementById("music-pause");
        const pauseIcon = <HTMLDivElement>document.getElementById("music-pause-icon");
        const views = <HTMLDivElement>document.getElementById("music-views");
        const likes = <HTMLDivElement>document.getElementById("music-likes");
        const queue = <HTMLDivElement>document.getElementById("music-queue");
        //const skip = <HTMLDivElement>document.getElementById("music-skip");
        const progress = <HTMLDivElement>document.getElementById("music-progress-text");

        const progressItem = <HTMLProgressElement>document.getElementById("music-progress");
        const pauseItem = <HTMLDivElement>document.getElementById("music-pause-item");
        const skipItem = <HTMLDivElement>document.getElementById("music-skip-item");

        progressItem.value = result.playInfo.val;
        progressItem.max = result.playInfo.max;

        if(result.queue[0] !== undefined) {
          title.innerHTML = "Playing - " + result.queue[0].title;
          pause.innerHTML = result.playInfo.paused ? "Resume" : "Pause";
          pauseIcon.style.backgroundImage = result.playInfo.paused ? "url(" + ICON_PLAY + ")" : "url(" + ICON_PAUSE + ")";
          views.innerHTML = result.queue[0].views.toLocaleString();
          likes.innerHTML = result.queue[0].likeCount.toLocaleString();

          pauseItem.style.cssText = "";
          skipItem.style.cssText = "";
          progressItem.style.cssText = "";
        } else {
          title.innerHTML = "Not playing";
          pause.innerHTML = "Pause/Resume";
          pauseIcon.style.backgroundImage = "url(" + ICON_PLAY + ")";
          views.innerHTML = "0";
          likes.innerHTML = "0";

          pauseItem.style.cssText = "pointer-events: none; filter: brightness(0.5);";
          skipItem.style.cssText = "pointer-events: none; filter: brightness(0.5);";
          progressItem.style.cssText = "pointer-events: none; filter: brightness(0.5);";
        }

        queue.innerHTML = "Add to queue (" + result.queue.length + " in queue)";
        progress.innerHTML = this.formatTime(result.playInfo.val*1000) + "/" + this.formatTime(result.playInfo.max*1000);
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

  public play() {
    const url = this.musicRef.current.value;
    let videoID = url.substring(url.indexOf("watch?v=") + "watch?v=".length);
    if(videoID.includes("&")) { videoID = videoID.substring(0, videoID.indexOf("&")); }

    ipcRenderer.send(`play-id-${this.windowId}`, videoID)
  }

  public pause() {
    ipcRenderer.send(`pause-${this.windowId}`)
  }

  public goToPos(pos) {
    ipcRenderer.send(`goToPos-${this.windowId}`, pos)
  }

  public skip() {
    ipcRenderer.send(`skip-${this.windowId}`)
  }
}

export default new Store();
