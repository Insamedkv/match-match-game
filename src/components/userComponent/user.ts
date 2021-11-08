import userStyles from './user.scss';
import userHTML from './user.html';
import { BaseComponent, BaseProps } from '../baseComponent';

interface CardComponentProps extends BaseProps {
  name: string;
  surname: string;
  email: string;
  points: number;
}

export class UserComponent extends BaseComponent<CardComponentProps> {
  public static componentName: string = 'user';

  protected template: string = userHTML;

  protected styles: string = userStyles;
}
