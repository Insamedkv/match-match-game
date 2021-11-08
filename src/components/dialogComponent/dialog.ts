import dialogStyles from './dialog.scss';
import dialogHTML from './dialog.html';
import { BaseComponent } from '../baseComponent';
import { dialogs } from '../dialogsStore';

export class DialogComponent extends BaseComponent {
  public static componentName: string = 'dialog';

  protected template: string = dialogHTML;

  protected styles: string = dialogStyles;

  private currentDialogName: string = '';

  protected onInit = async () => {
    document.addEventListener('click', (event) => {
      const eventTarget: HTMLElement = event.target as HTMLElement;
      if (eventTarget.closest('[dialog-open]')) {
        this.currentDialogName = eventTarget.closest('[dialog-open]')!.getAttribute('dialog-open')!;
        // если у элемента есть dialog-open, мы отображаем popup
        this.render();
      }
    });
    document.addEventListener('openCongratsDialog', () => {
      this.currentDialogName = 'congrats-dialog';
      this.render();
    });
  };

  protected onRender = async () => {
    if (this.currentDialogName) {
      const dialogsList = await dialogs();
      const DialogContentComponent = dialogsList.find(
        (component) => component.componentName === this.currentDialogName,
      );

      if (DialogContentComponent) {
        const contentHTMLElement = this.element.querySelector<HTMLElement>('[dialog-wrapper]')!;
        await new DialogContentComponent(contentHTMLElement).render();
        contentHTMLElement.classList.add('dialog-overlay__open');
        contentHTMLElement.addEventListener('click', (event) => {
          if ((event.target === event.currentTarget) || (<HTMLElement>event.target!).closest('[dialog-close]')) {
            // currentTarget тот, кто слушает событие
            contentHTMLElement.classList.remove('dialog-overlay__open');
          }
        });
      }
    }
  };
}
