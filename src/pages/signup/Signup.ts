import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { serviceItem } from "../../components/serviceItem/index.js";
import { Validator } from "../../utils/validation.js";
import { apiFetch } from "../../api/fetchWrapper.js";
<<<<<<< HEAD:src/pages/signup/Signup.ts
import type { TemplateFn } from "../../types/handlebars.js";
=======


>>>>>>> 120687c (vite implemented):src/pages/signup/Signup.js
import Handlebars from "handlebars";
import signUpTemplate from "../../templates/pages/SignUp.hbs?raw";
import { slogans } from "./slogans.js";
import router from "../../index.js";

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
    if (!loginInput || !emailInput || !passwordInput) return;

    if (
      !this.validateInput(
        loginInput.value,
        emailInput.value,
        passwordInput.value,
        form,
      )
    ) {
      return;
    }

    const { ok, status } = await apiFetch(`/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        login: loginInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    if (!ok) {
      if (status === 409) {
        this.setInputsError(
          [loginInput, emailInput, passwordInput],
          "Пользователь с таким логином или почтой уже существует",
        );
      } else if (status === 500) {
        this.setServerError();
      } else {
        this.setServerError();
      }
      return;
    }
    router.navigate("/");
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
    if (!form) return;
    const inputs = this.getLoginEmailPasswordInput(form).at(-1);
    if (!inputs) return;
    this.setInputsError(
      inputs,

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
        router.navigate("/login");
      });
    }

    const [loginInput, emailInput, passwordInput] =
      this.getLoginEmailPasswordInput(form);

    if (!loginInput || !emailInput || !passwordInput) return;

    loginInput.addEventListener("input", () => {
      this.validateSingleField("login", loginInput.value, loginInput);
    });

    emailInput.addEventListener("input", () => {
      this.validateSingleField("email", emailInput.value, emailInput);
    });

    passwordInput.addEventListener("input", () => {
      this.validateSingleField("password", passwordInput.value, passwordInput);
    });

    this.inputField.setPasswordInformerShow(passwordInput);
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

    if (!loginInput || !emailInput || !passwordInput) return;

    return (
      checkField("login", login, loginInput) &&
      checkField("email", email, emailInput) &&
      checkField("password", password, passwordInput)
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
      inputElem.classList.remove("border-red");
      inputElem.classList.add("border-grey");
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
    if (!loginInput || !emailInput || !passwordInput) throw "";

    return [loginInput, emailInput, passwordInput];
  }

  getRandomSlogan(): string[] {
    const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];

    if (!randomSlogan) throw "undefined slogan";
    return randomSlogan;
  }
}
