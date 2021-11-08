import contentStyles from './content.css';
import contentHTML from './content.html';
import { BaseComponent } from '../baseComponent';
import { Route } from '../routing';
import { AboutComponent } from '../aboutComponent/about';
import { ScoreComponent } from '../scoreComponent/score';
import { SettingComponent } from '../settingComponent/setting';
import { GameAreaComponent } from '../gameAreaComponent/gameArea';

export class ContentComponent extends BaseComponent {
  public static componentName = 'content';

  protected routes: Route[] = [
    { path: '/', Component: AboutComponent },
    { path: '/score', Component: ScoreComponent },
    { path: '/setting', Component: SettingComponent },
    { path: '/game', Component: GameAreaComponent },
  ];

  protected template: string = contentHTML;

  protected styles: string = contentStyles;
}
