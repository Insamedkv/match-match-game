import cardStyles from './card.scss';
import cardHTML from './card.html';
import { BaseComponent, BaseProps } from '../baseComponent';

const FLIP_CLASS = 'flipped';

interface CardComponentProps extends BaseProps {
  category: string;
  imageIndex: number;
  // cardFlippedCallback: () => {};
}

interface CardsImagesNames {
  [key: string]: string[];
}

const cardsImages: CardsImagesNames = require('./images.json');

export class CardComponent extends BaseComponent<CardComponentProps> {
  public static componentName: string = 'card';

  protected template: string = cardHTML;

  protected styles: string = cardStyles;

  protected isFlipped: boolean = false;

  public imageIndex: number = 0;

  protected onRender = async () => {
    (<HTMLElement> this.element.querySelector('.card__front'))!.style.backgroundImage = `url(${this.getImageURL()})`;
    this.element.addEventListener('click', async () => {
      if (this.isFlipped === false) {
        this.isFlipped = true;
        this.flipToFront();
        const cardClicked = new Event('cardClicked');
        this.dispatchEvent(cardClicked);
      }
    });
    this.imageIndex = this.props!.imageIndex;
  };

  public twoCardsClickedCallback(same: boolean) {
    if (same) {
      (<HTMLElement> this.element.querySelector('.card__front'))!.style.backgroundColor = 'green';
    } else {
      (<HTMLElement> this.element.querySelector('.card__front'))!.style.backgroundColor = 'red';
      setTimeout(() => {
        (<HTMLElement> this.element.querySelector('.card__front'))!.style.backgroundColor = 'grey';
        this.flipToBack();
        this.isFlipped = false;
      }, 1000);
    }
  }

  private getImageURL() {
    return `/images/${this.props!.category}/${cardsImages[this.props!.category][this.props!.imageIndex]}`;
  }

  public flipToBack() {
    this.isFlipped = true;
    return this.flip(true);
  }

  public flipToFront() {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
