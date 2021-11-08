import scoreStyles from './score.css';
import scoreHTML from './score.html';
import { BaseComponent } from '../baseComponent';
import { Database, User } from '../indexedDB';
import { UserComponent } from '../userComponent/user';

export class ScoreComponent extends BaseComponent {
  public static componentName = 'score';

  protected template: string = scoreHTML;

  protected styles: string = scoreStyles;

  protected onRender = async () => {
    const database = new Database();
    this.addUsers(await database.filter());
  };

  private async addUsers(users: User[]) {
    const areaToAppend = this.element.querySelector('.score-data');
    users.forEach((el) => {
      const newElement = document.createElement('user');
      areaToAppend!.appendChild(newElement);
      const user = new UserComponent(newElement, {
        name: el.name, surname: el.surname, email: el.email, points: el.points,
      });
      user.render();
    });
  }
}
