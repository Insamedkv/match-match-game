import { BaseComponent } from '../baseComponent';
import timerStyles from './timer.scss';
import timergHTML from './timer.html';

export class TimerComponent extends BaseComponent {
  public static componentName = 'timer';

  protected template: string = timergHTML;

  protected styles: string = timerStyles;

  public time = 0;

  public currentTime = 0;

  protected interval!: NodeJS.Timeout | null;

  public showTime() {
    this.time += 1;
    this.element.querySelector('#time')!.innerHTML = TimerComponent.toHHMMSS(this.time);
  }

  public start() {
    this.interval = setInterval(this.showTime.bind(this), 1000);
  }

  public reset() {
    clearInterval(this.interval!);
    this.interval = null;
    this.time = 0;
    this.element.querySelector('#time')!.innerHTML = TimerComponent.toHHMMSS(this.time);
  }

  static toHHMMSS(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    const hours1 = `${hours}`.padStart(2, '0');
    const minutes2 = `${minutes}`.padStart(2, '0');
    const seconds3 = `${seconds}`.padStart(2, '0');

    return `${hours1}:${minutes2}:${seconds3}`;
  }
}
