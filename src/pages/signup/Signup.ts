import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { serviceItem } from "../../components/serviceItem/index.js";
import { config, goToPage } from "../../index.js";
import { Validator } from "../../utils/validation.js";
import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import signUpTemplate from "../../templates/pages/SignUp.hbs?raw";
import { slogans } from "./slogans.js";
import router from "../../index.js"

export class SignUpPage {
  startButton: StartButton;
  inputField: InputField;
  absText: absenceText;
  servItem: serviceItem;
  template: TemplateFn;

  constructor() {
    this.startButton = new StartButton();

    this.inputField = new InputField();

    this.absText = new absenceText();

    this.servItem = new serviceItem();

    this.template = Handlebars.compile(signUpTemplate);
  }

  render(container: HTMLElement): void {
    document.body.classList.add("hide-scroller");
    const serviceItems = [
      this.servItem.getSelf(
        {
          db_name: "spotify",
          name: "Spotify",
          logo: "♪",
        },
        "Списание 8.10.25",
        "₽",
        169,
      ),
      this.servItem.getSelf(
        {
          db_name: "beeline",
          name: "Билайн доставка",
          logo: "Б",
        },
        "Списание 4.10.25",
        "₽",
        133,
      ),
      this.servItem.getSelf(
        {
          db_name: "tg_oil",
          name: "Телеграм нефть",
          logo: "✈",
        },
        "Списание 7.10.25",
        "₽",
        893,
      ),
    ];

    const data = {
      title: "Регистрация",
      loginInput: this.inputField.getSelf("login", "login", "логин"),
      emailInput: this.inputField.getSelf("email", "email", "email"),
      passwordInput: this.inputField.getSelf("password", "password", "пароль"),
      absenceText: this.absText.getSelf("Есть аккаунт?", "/login", "Войти!"),
      items: serviceItems,
      slogans: this.getRandomSlogan(),
      signUpButton: this.startButton.getSelf("signup", "Зарегистрироваться"),
    };

    container.innerHTML = this.template(data);
    this.setupEventListeners(container);
  }

  async handleSignUpRequest(form: HTMLFormElement): Promise<void> {
    const [loginInput, emailInput, passwordInput] =
      this.getLoginEmailPasswordInput(form);

    if (
      !this.validateInput(
        loginInput!.value,
        emailInput!.value,
        passwordInput!.value,
        form,
      )
    ) {
      return;
    }

    const response = await fetch(
      "http://217.16.23.67:8080/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          login: loginInput!.value,
          email: emailInput!.value,
          password: passwordInput!.value,
        }),
        credentials: "include",
      },
    );

    const status = response.status;
    const result = await response.json();
    this.checkResultStatus(status, result, form);
  }

  checkResultStatus(status: number, result: Object, form: HTMLFormElement) {
    if (status == 201) {
      // goToPage(config.user_page!);
      router.navigate("/")
    } else if (status == 409) {
      this.setInputsError(
        this.getLoginEmailPasswordInput(form),
        "Пользователь с таким логином или почту уже существует",
      );
    } else if (status == 500) {
      this.setServerError();
    }
  }

  setInputsError(
    input: HTMLInputElement | HTMLInputElement[],
    text_error: string,
    to_color: boolean = true,
  ): void {
    const arr = Array.isArray(input) ? input : [input];
    this.inputField.setError(arr, to_color, text_error);
  }

  setServerError(): void {
    const form: HTMLFormElement | null = document.querySelector(".signup-form");
    this.setInputsError(
      this.getLoginEmailPasswordInput(form!),
      "При регистрации произошла ошибка. Повторите попытку позже",
      false,
    );
  }

  /**
   * Настраивает обработчики событий
   * @param {HTMLElement} container - Контейнер с элементами
   * @returns {void}
   */
  setupEventListeners(container: HTMLElement): void {
    const form: HTMLFormElement | null = container.querySelector("#signup");
    if (!form) return;
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSignUpRequest(form);
      });
    }

    const loginLink = container.querySelector(".absence-text a");
    if (loginLink) {
      loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        router.navigate("/login")
        // goToPage(config.login!);
      });
    }

    const [loginInput, emailInput, passwordInput] =
      this.getLoginEmailPasswordInput(form);

    loginInput!.addEventListener("input", () => {
      this.validateSingleField("login", loginInput!.value, loginInput!);
    });

    emailInput!.addEventListener("input", () => {
      this.validateSingleField("email", emailInput!.value, emailInput!);
    });

    passwordInput!.addEventListener("input", () => {
      this.validateSingleField(
        "password",
        passwordInput!.value,
        passwordInput!,
      );
    });

    this.inputField.setPasswordInformerShow(passwordInput!);
  }

  /**
   * Валидирует введенные данные
   * @param {string} login - Логин пользователя
   * @param {string} email - Email пользователя
   * @param {string} password - Пароль пользователя
   * @param {HTMLFormElement} form - Форма регистрации
   * @returns {boolean} Результат валидации
   */
  validateInput(
    login: string,
    email: string,
    password: string,
    form: HTMLFormElement,
  ) {
    const validator = new Validator();

    const checkField = (
      fieldName: string,
      fieldValue: string,
      inputElem: HTMLInputElement,
    ) => {
      let error = validator.validate(fieldName, fieldValue);
      if (error !== undefined) {
        this.setInputsError(inputElem, error);
        return false;
      }
      return true;
    };

    const [loginInput, emailInput, passwordInput] =
      this.getLoginEmailPasswordInput(form);

    return (
      checkField("login", login, loginInput!) &&
      checkField("email", email, emailInput!) &&
      checkField("password", password, passwordInput!)
    );
  }
  validateSingleField(
    fieldName: string,
    fieldValue: string,
    inputElem: HTMLInputElement,
  ) {
    const validator = new Validator();

    let error = validator.validate(fieldName, fieldValue);

    if (error !== undefined) {
      this.inputField.setError([inputElem], true, error);
      return false;
    } else {
      this.inputField.setError([inputElem], false, "");
      inputElem.style.borderColor = "#e5e7eb";
      return true;
    }
  }

  getLoginEmailPasswordInput(form: HTMLFormElement): HTMLInputElement[] {
    const loginInput: HTMLInputElement | null = form.querySelector(
      'input[name="login"]',
    );
    const emailInput: HTMLInputElement | null = form.querySelector(
      'input[name="email"]',
    );
    const passwordInput: HTMLInputElement | null = form.querySelector(
      'input[name="password"]',
    );
    return [loginInput!, emailInput!, passwordInput!];
  }

  getRandomSlogan(): string[] {
    const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];

    return randomSlogan!;
  }
}
