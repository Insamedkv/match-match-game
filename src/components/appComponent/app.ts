import appStyles from './app.css';
import appHTML from './app.html';
import { BaseComponent } from '../baseComponent';

export class AppComponent extends BaseComponent {
  public static componentName = 'app';

  protected template: string = appHTML;

  protected styles: string = appStyles;
}
