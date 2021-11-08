import { BaseComponent } from '../baseComponent';
import congratsDialogStyles from './congrats.scss';
import congratsDialogHTML from './congrats.html';

export class CongratsDialogComponent extends BaseComponent {
  public static componentName: string = 'congrats-dialog';

  protected template: string = congratsDialogHTML;

  protected styles: string = congratsDialogStyles;

  protected onRender = async () => {
    const headerButton = document.querySelector('[header-button]');
    this.element.addEventListener('click', (event) => {
      if ((event.target === this.element) || (<HTMLElement>event.target!).closest('[dialog-close]')) {
        // currentTarget тот, кто слушает событие
        window.location.hash = '#/score';
        document.querySelector('.new')!.innerHTML = 'START GAME';
        window.location.hash = '#/score';
        headerButton!.setAttribute('start', 'start');
        headerButton!.removeAttribute('stop');
      }
    });
  };
}
