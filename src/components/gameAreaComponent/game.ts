// import { BaseComponent } from '../baseComponent';
// import { CardComponent } from '../cardComponent/card';
// import { CardFieldComponent } from './gameAreaField';

// const FLIP_DELAY = 3000;

// export class Game extends BaseComponent {
//   private readonly cardsField: CardFieldComponent;

//   private activeCard?: CardComponent;

//   private isAnimation = false;

//   constructor() {
//     super(element);
//     this.cardsField = new CardFieldComponent();
//     this.element.appendChild(this.cardsField.element);
//   }

//   newGame(images: string[]) {
//     this.cardsField.clear();
//     const cards = images
//       .concat(images)
//       .map((url) => new CardComponent(url))
//       .sort(() => Math.random() - 0.5);

//     cards.forEach((card) => {
//       card.element.addEventListener('click', () => this.cardHandler(card));
//     });

//     this.cardsField.addCards(cards);
//   }

//   private async cardHandler(card: CardComponent) {
//     if (this.isAnimation) return;
//     if (!card.isFlipped) return;
//     this.isAnimation = true;

//     await card.flipToFront();

//     if (!this.activeCard) {
//       this.activeCard = card;
//       this.isAnimation = false;
//       return;
//     }

//     if (this.activeCard.image !== card.image) {
//       await delay(FLIP_DELAY);
//       await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
//     }

//     this.activeCard = undefined;
//     this.isAnimation = false;
//   }
// }
