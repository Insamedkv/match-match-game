import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import registerDialogStyles from './registerDialog.scss';
import registerDialogHTML from './registerDialog.html';
import { BaseComponent } from '../baseComponent';
import { Database, UserCreate } from '../indexedDB';
import { SettingComponent } from '../settingComponent/setting';

export class RegisterDialogComponent extends BaseComponent {
  public static componentName: string = 'test-dialog';

  protected template: string = registerDialogHTML;

  protected styles: string = registerDialogStyles;

  private iDB = new Database();

  private isValid: {
    name: boolean;
    surname: boolean;
    email: boolean;
  } = {
    name: false,
    surname: false,
    email: false,
  };

  protected onRender = async () => {
    const textFields = this.element.querySelectorAll('.mdc-text-field');
    textFields.forEach((el) => new MDCTextField(el as Element));
    const buttons = this.element.querySelectorAll('.mdc-button');
    buttons.forEach((el) => new MDCRipple(el as Element));
    this.listenFormFields();
    const form = this.element.getElementsByTagName('form')[0];
    form.addEventListener('submit', this.submitForm.bind(this));
  };

  private listenFormFields() {
    const inputName = this.element.querySelector('[name="name"]')!;
    inputName.addEventListener('input', this.nameFieldListener.bind(this));
    const inputSurname = this.element.querySelector('[name="surname"]')!;
    inputSurname.addEventListener('input', this.surnameFieldListener.bind(this));
    const inputEmail = this.element.querySelector('[name="email"]')!;
    inputEmail.addEventListener('input', this.emailValidation.bind(this));
  }

  private nameFieldListener(event: Event) {
    const validationResult = RegisterDialogComponent.nameSurnameValidation(event);
    this.isValid.name = validationResult;
    this.validateForm();
  }

  private surnameFieldListener(event: Event) {
    const validationResult = RegisterDialogComponent.nameSurnameValidation(event);
    this.isValid.surname = validationResult;
    this.validateForm();
  }

  private static nameSurnameValidation(event: Event) {
    const inputField = (<HTMLInputElement>event.target);
    const inputParentNameSurname = inputField.closest('[name-surname]')!;
    const errorField = inputParentNameSurname.querySelector('.mdc-text-field-helper-text')!;
    const errorShow = inputParentNameSurname.querySelector('.error-color');
    let validFlag = false;

    if (/^[\p{L}\p{M} ]+$/gu.test(inputField.value) && inputField.value.trim()) { // /^[\p{L}\p{M}\d\. ]+$/u  ^[a-zA-Z\s]*$
      // показываем значок 'ок'
      inputField.nextElementSibling!.classList.add('material-icons__open');
      // убираем текст ошибки
      inputParentNameSurname.querySelector('.error-color')!.classList.remove('error-color__open');
      validFlag = true;
    } else {
      // убираем значок 'ок'
      inputField.nextElementSibling!.classList.remove('material-icons__open');
      if (/\d/g.test(inputField.value)) {
        errorField.textContent = 'Remove numbers please';
      } else if (inputField.value.length === 0 || !inputField.value.trim()) {
        errorField.textContent = 'Fill in the field please';
      } else if (/[~!@#$%*()_—+=|:;"'`<>,.?/^]/g.test(inputField.value)) {
        errorField.textContent = 'Remove special symbols please';
      }
      // показываем текст ошибки
      errorShow!.classList.add('error-color__open');
    }
    return validFlag;
  }

  private emailValidation(event: Event) {
    const inputField = (<HTMLInputElement>event.target);
    const inputParentEmail = inputField.closest('[e-mail]')!;
    const emailValidationRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailValidationRegExp.test(inputField.value)) {
      const errorFieldEmail = inputParentEmail.querySelector('.error-color');
      inputField.nextElementSibling!.classList.remove('material-icons__open');
      inputParentEmail.querySelector('.mdc-text-field-helper-text')!.textContent = 'Invalid e-mail';
      errorFieldEmail!.classList.add('error-color__open');
      this.isValid.email = false;
    } else {
      inputField.nextElementSibling!.classList.add('material-icons__open');
      inputParentEmail.querySelector('.error-color')!.classList.remove('error-color__open');
      this.isValid.email = true;
    }
    this.validateForm();
  }

  private validateForm() {
    const values = Object.values(this.isValid);
    const addUserButton = (<HTMLButtonElement> this.element.querySelector('.add-user'));
    if (values.every((el) => el === true)) {
      addUserButton.disabled = false;
    } else {
      addUserButton.disabled = true;
    }
  }

  public async submitForm(event: { preventDefault: () => void; }): Promise<void> {
    event.preventDefault();
    const name = (<HTMLInputElement>document.querySelector('[name="name"]'))!.value;
    const surname = (<HTMLInputElement>document.querySelector('[name="surname"]'))!.value;
    const email = (<HTMLInputElement>document.querySelector('[name="email"]'))!.value;
    const userData: UserCreate = {
      name, surname, email, points: 0,
    };

    const user = await this.iDB.create(userData);
    RegisterDialogComponent.updateButton();
    SettingComponent.currentUser = user.id;
  }

  private static updateButton() {
    const updateHeaderButtonEvent = new Event('updateHeaderButton');
    const headerButton = document.querySelector('[header-button]');
    headerButton!.dispatchEvent(updateHeaderButtonEvent);
  }
}
