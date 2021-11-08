import { MDCSelect } from '@material/select';
import settingStyles from './setting.scss';
import settingHTML from './setting.html';
import { BaseComponent } from '../baseComponent';

export class SettingComponent extends BaseComponent {
  public static componentName = 'setting';

  public static category: string = 'Nature';

  public static currentUser: IDBValidKey;

  public static difficulty: number = 16;

  protected template: string = settingHTML;

  protected styles: string = settingStyles;

  private categoryField?: MDCSelect;

  private difficultyField?: MDCSelect;

  protected onRender = async () => {
    const category = this.element.querySelector('.category');
    const difficulty = this.element.querySelector('.difficulty');
    this.categoryField = new MDCSelect(category as Element);
    this.difficultyField = new MDCSelect(difficulty as Element);
    this.listenCategoryField();
    this.listenDifficultyField();
  };

  private listenCategoryField() {
    this.categoryField!.listen('MDCSelect:change', () => {
      SettingComponent.category = this.categoryField!.value;
    });
  }

  private listenDifficultyField() {
    this.difficultyField!.listen('MDCSelect:change', () => {
      SettingComponent.difficulty = Number(this.difficultyField!.value);
    });
  }
}
