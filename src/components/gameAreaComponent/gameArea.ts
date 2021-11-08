import { BaseComponent } from '../baseComponent';
import gameAreaFieldStyles from './gameArea.scss';
import gameAreaFieldHTML from './gameArea.html';
import { CardComponent } from '../cardComponent/card';
import { SettingComponent } from '../settingComponent/setting';
import { TimerComponent } from '../timerComponent/timer';
import { Database } from '../indexedDB';

const SHOW_TIME = 5;

export class GameAreaComponent extends BaseComponent {
  public static componentName: string = 'cards-field';

  protected template: string = gameAreaFieldHTML;

  protected styles: string = gameAreaFieldStyles;

  private clickSummary: number = 0;

  private clickWrong: number = 0;

  private savedCardComponent?: CardComponent;

  public score: number = 0;

  private numberOfCard: number = 0;

  private difficulty = SettingComponent.difficulty;

  private timerComponent?:TimerComponent;

  private category = SettingComponent.category;

  protected onRender = async () => {
    this.numberOfCard = this.difficulty;
    if (this.difficulty === 36) {
      this.element.querySelector('.game-area')?.classList.add('game-area36');
    }
    await this.addCards(this.difficulty);
    this.timerComponent = new TimerComponent(this.element.querySelector('timer')!);
    await this.timerComponent.render();
    const startGameTimer = setTimeout(() => {
      this.timerComponent!.start();
      clearTimeout(startGameTimer);
    }, 5000);
  };

  private async addCards(number: number) {
    const cardIndexes: number [] = [];
    for (let i = 0; i < number; i++) {
      cardIndexes[i] = Math.floor(i / 2);
    }
    cardIndexes.sort(() => Math.random() - 0.5);
    const areaToAppend = this.element.querySelector('[playground]');
    for (let i = 0; i < number; i++) {
      const newElement = document.createElement('card');
      areaToAppend!.appendChild(newElement);
      const card = new CardComponent(newElement, { category: this.category, imageIndex: cardIndexes[i] });
      card.addEventListener('cardClicked', () => {
        this.cardClickedCallback(card);
      });
      card.render();
      setTimeout(() => { new CardComponent(newElement).flipToBack(); }, SHOW_TIME * 1000);
    }
  }

  private async cardClickedCallback(card: CardComponent) {
    if (!this.savedCardComponent) {
      this.savedCardComponent = card;
    } else {
      if (card.imageIndex === this.savedCardComponent.imageIndex) {
        this.clickSummary += 1;
        this.numberOfCard -= 2;
        card.twoCardsClickedCallback(true);
        this.savedCardComponent.twoCardsClickedCallback(true);
        window.console.log(this.clickSummary);
      } else {
        this.clickSummary += 1;
        this.clickWrong += 1;
        window.console.log(this.clickSummary);
        card.twoCardsClickedCallback(false);
        this.savedCardComponent.twoCardsClickedCallback(false);
        (<HTMLElement> document.querySelector('.game-area'))!.classList.add('game-area-unclickable');
        setTimeout(() => {
          (<HTMLElement> document.querySelector('.game-area'))!.classList.remove('game-area-unclickable');
        }, 1000);
      }
      this.savedCardComponent = undefined;
      if (this.numberOfCard === 0) {
        this.score = (this.clickSummary - this.clickWrong) * 100 - this.timerComponent!.time * 10;
        this.timerComponent!.reset();
        const openCongratsDialogEvent = new Event('openCongratsDialog');
        document.dispatchEvent(openCongratsDialogEvent);
        const newDataBase = new Database();
        await newDataBase.update(SettingComponent.currentUser, { points: this.score });
      }
    }
  }
}
