import { IComponent } from './componentInterface';

export interface Type<T> extends Function { new (...args: any[]): T; }

export interface Route {
  path: string;
  Component: Type<IComponent>;
}

export class Router {
  constructor(
    private routes: Route[],
    private element: HTMLElement,
  ) {
    window.addEventListener('hashchange', this.render.bind(this));
  }

  private static parseLocation() {
    return window.location.hash.slice(1).toLowerCase() || '/';
  }

  private findComponentByPath(path: string) {
    return this.routes.find((r) => r.path === path);
  }

  public async render() {
    const route = this.findComponentByPath(Router.parseLocation());
    if (!route) {
      return;
    }
    this.element.innerHTML = '';
    await new (route.Component)(this.element).render();
  }
}
