import { observable, computed } from 'mobx';
import { ISettings, ITheme, IVisitedItem } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { requestURL } from '~/utils/network';
import { INewsItem } from '~/interfaces/news-item';
import 'path';

type NewsBehavior = 'on-scroll' | 'always-visible' | 'hidden';
export type Preset = 'focused' | 'inspirational' | 'informational' | 'custom';

export class Store {
  @observable
  public settings: ISettings = { ...(window as any).settings };

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  @observable
  public news: INewsItem[] = [];

  @observable
  private _newsBehavior: NewsBehavior = 'on-scroll';

  @computed
  public get newsBehavior() {
    return this._newsBehavior;
  }

  public set newsBehavior(value: NewsBehavior) {
    this._newsBehavior = value;

    if (value === 'always-visible') {
      this.loadNews();
    }
  }

  @computed
  public get fullSizeImage() {
    return this.newsBehavior === 'on-scroll' || this.newsBehavior === 'hidden';
  }

  @observable
  public image = '';

  @observable
  private _imageVisible = true;

  public set imageVisible(value: boolean) {
    this._imageVisible = value;
  }

  @computed
  public get imageVisible() {
    return this._imageVisible;
  }

  @observable
  public changeImageDaily = true;

  @observable
  public topSitesVisible = true;

  @observable
  public quickMenuVisible = true;

  @observable
  public overflowVisible = false;

  @observable
  private _preferencesContent: 'main' | 'custom' = 'main';

  public set preferencesContent(value: 'main' | 'custom') {
    this._preferencesContent = value;
    this.overflowVisible = false;
  }

  @computed
  public get preferencesContent() {
    return this._preferencesContent;
  }

  @observable
  private _dashboardSettingsVisible = false;

  public set dashboardSettingsVisible(value: boolean) {
    this._dashboardSettingsVisible = value;

    if (!value) {
      this.preferencesContent = 'main';
    }
  }

  @computed
  public get dashboardSettingsVisible() {
    return this._dashboardSettingsVisible;
  }

  @observable
  private _preset: Preset = 'inspirational';

  @computed
  public get preset() {
    return this._preset;
  }

  public set preset(value: Preset) {
    this._preset = value;

    if (['focused', 'informational', 'inspirational'].includes(value)) {
      this.quickMenuVisible = true;
      this.topSitesVisible = true;
      this.changeImageDaily = true;
    }

    if (['focused', 'inspirational'].includes(value)) {
      this.newsBehavior = 'on-scroll';
    }

    if (['informational', 'inspirational'].includes(value)) {
      this.imageVisible = true;
    }

    if (value === 'focused') {
      this.imageVisible = false;
    } else if (value === 'informational') {
      this.newsBehavior = 'always-visible';
    }

    localStorage.setItem('preset', value);
  }

  private page = 1;
  private loaded = true;

  @observable
  public topSites: IVisitedItem[] = [];

  public constructor() {
    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };

    this.preset = localStorage.getItem('preset') as Preset;

    if (this.preset === 'custom') {
      [
        'changeImageDaily',
        'quickMenuVisible',
        'topSitesVisible',
        'imageVisible',
      ].forEach(
        (x) =>
          ((this as any)[x] =
            localStorage.getItem(x) == null
              ? (this as any)[x]
              : JSON.parse(localStorage.getItem(x))),
      );

      this.newsBehavior = localStorage.getItem('newsBehavior') as NewsBehavior;
    }

    this.loadTopSites();

    window.onscroll = () => {
      this.updateNews();
    };

    window.onresize = () => {
      this.updateNews();
    };

    this.image = Math.floor(Math.random() * 3);
  }

  public async updateNews() {
    const scrollPos = window.scrollY;
    const scrollMax =
      document.body.scrollHeight - document.body.clientHeight - 768;

    if (scrollPos >= scrollMax && this.loaded && this.page !== 10) {
      this.page++;
      this.loaded = false;
      try {
        await this.loadNews();
      } catch (e) {
        console.error(e);
      }
      this.loaded = true;
    }
  }

  public async loadNews() {
    try {
      const { data } = await requestURL('http://80.211.255.51:7000/news'); // ?lang=
      const json = JSON.parse(data);

      if (json.articles) {
        this.news = this.news.concat(json.articles);
      } else {
        throw new Error('Error fetching news');
      }
    } catch (e) {
      throw e;
    }
  }

  public async loadTopSites() {
    this.topSites = await (window as any).getTopSites(8);
  }
}

export default new Store();
