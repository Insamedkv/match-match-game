import aboutStyles from './about.css';
import aboutHTML from './about.html';
import { BaseComponent } from '../baseComponent';

export class AboutComponent extends BaseComponent {
  public static componentName = 'aboutfield';

  protected template: string = aboutHTML;

  protected styles: string = aboutStyles;
}
