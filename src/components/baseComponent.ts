import { IComponent } from './componentInterface';
import { components } from './componentsStore';
import { Route, Router } from './routing';

export interface BaseProps {
  [key: string]: string | number;
}

export abstract class BaseComponent<T extends BaseProps = BaseProps> extends EventTarget implements IComponent {
  protected abstract template: string;

  protected dialogs?: string;

  protected routes?: Route[];

  protected abstract styles: string;

  public static componentName: string;

  protected inited: boolean = false;

  constructor(
    protected element: HTMLElement,
    protected props?: T,
  ) {
    super();
  }

  private propsInTemplate() {
    let savedTemplate = this.template;
    if (!this.props) {
      return savedTemplate;
    }
    Object.keys(this.props).forEach((key) => {
      const value = (this.props as BaseProps)[key];
      savedTemplate = savedTemplate.replace(new RegExp(`{${key}}`, 'g'), value.toString());
    });
    return savedTemplate;
  }

  protected onInit?: () => Promise<void>;

  protected onRender?: () => Promise<void>;

  public async render(): Promise<void> {
    const HTML = this.propsInTemplate();
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(HTML, 'text/html');
    const child = parsedHTML.body.children;

    if (this.inited) {
      this.element.innerHTML = ''; // очищаем компонент при повторном рендере
    } else if (this.onInit) {
      this.onInit(); // если у компонента есть onInit и он не был ранее зарендерен, то вызываем onInit
      this.inited = true;
    }

    await this.renderChildComponents(child);
    Array.from(child).forEach((el) => {
      this.element.appendChild(el);
    });
    if (this.onRender) {
      this.onRender();
    }
  }

  private async renderChildComponents(collection: HTMLCollection) {
    const componentsRender = await components();
    await Promise.all(Array.from(collection).map(async (element) => {
      const htmlElement = element as HTMLElement;
      const ComponentForTag = componentsRender.find((component) => component.componentName
      === htmlElement.tagName.toLowerCase());
      if (ComponentForTag) {
        await new ComponentForTag(htmlElement).render();
      } else if (element.tagName.toLowerCase() === 'router' && this.routes) {
        await new Router(this.routes, htmlElement).render();
      } else if (htmlElement.children) {
        await this.renderChildComponents(htmlElement.children);
      }
    }));
  }
}
