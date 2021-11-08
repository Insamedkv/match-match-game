import headerStyles from './header.css';
import headerHTML from './header.html';
import { BaseComponent } from '../baseComponent';

export class HeaderComponent extends BaseComponent {
  public static componentName: string = 'app-header';

  protected template: string = headerHTML;

  protected styles: string = headerStyles;

  protected onRender = async () => {
    const headerButton = this.element.querySelector('[header-button]');
    headerButton!.addEventListener('updateHeaderButton', (event) => {
      (event.currentTarget as HTMLElement).querySelector('.new')!.innerHTML = 'START GAME';
      (event.currentTarget as HTMLElement).removeAttribute('dialog-open');
      headerButton!.setAttribute('start', 'start');
    });

    document.addEventListener('click', (event) => {
      const eventTarget: HTMLElement = event.target as HTMLElement;
      if (eventTarget.closest('[start]')) {
        this.element.querySelector('.new')!.innerHTML = 'STOP GAME';
        window.location.hash = '#/game';
        headerButton!.setAttribute('stop', 'stop');
        headerButton!.removeAttribute('start');
      } else if (eventTarget.closest('[stop]')) {
        this.element.querySelector('.new')!.innerHTML = 'START GAME';
        window.location.hash = '#/score';
        headerButton!.setAttribute('start', 'start');
        headerButton!.removeAttribute('stop');
      }
    });
  };
}
