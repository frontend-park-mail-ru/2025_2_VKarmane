import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { serviceItem } from "../../components/serviceItem/index.js";
import { config, goToPage } from "../../index.js";
import { Validator } from "../../utils/validation.js";
import { apiFetch } from "../../api/fetchWrapper.js";

import Handlebars from "handlebars";
import signUpTemplate from "../../templates/pages/SignUp.hbs?raw";
/**
 * Класс страницы регистрации
 * @class
 */
export class SignUpPage {
  /**
   * Создает экземпляр страницы регистрации
   * @constructor
   */
  constructor() {
    /** @type {StartButton} */
    this.startButton = new StartButton();

    /** @type {InputField} */
    this.inputField = new InputField();

    /** @type {absenceText} */
    this.absText = new absenceText();

    /** @type {serviceItem} */
    this.servItem = new serviceItem();

    this.template = Handlebars.compile(signUpTemplate);
  }

  /**
   * Рендерит страницу регистрации в контейнер
   * @param {HTMLElement} container - Контейнер для рендеринга
   * @returns {void}
   */
  render(container) {
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
      passwordInput: this.inputField.getSelf(
        "password",
        "password",
        "пароль",
        true,
      ),
      absenceText: this.absText.getSelf("Есть аккаунт?", "/login", "Войти!"),
      items: serviceItems,
      slogans: this.getRandomSlogan(),
      signUpButton: this.startButton.getSelf("signup", "Зарегистрироваться"),
    };

    container.innerHTML = this.template(data);
    this.setupEventListeners(container);
  }

  /**
   * Обрабатывает запрос регистрации
   * @param {HTMLFormElement} form - Форма регистрации
   * @returns {Promise<void>}
   * @async
   */
  async handleSignUpRequest(form) {
    const [loginInput, emailInput, passwordInput] =
      this.getLoginEmailPasswordInput(form);

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
    goToPage(config.user_page);
  }

  /**
   * Проверяет статус ответа сервера и выполняет соответствующие действия
   * @param {number} status - HTTP статус код
   * @param {Object} result - Результат ответа сервера
   * @param {HTMLFormElement} form - Форма регистрации
   * @returns {void}
   */
  checkResultStatus(status, result, form) {
    if (status == 201) {
      goToPage(config.user_page);
    } else if (status == 409) {
      this.setInputsError(
        form,
        "Пользователь с таким логином или почту уже существует",
      );
    } else if (status == 500) {
      this.setServerError();
    }
  }

  setInputsError(input, text_error, to_color = true) {
    const arr = Array.isArray(input) ? input : [input];
    this.inputField.setError(arr, to_color, text_error);
  }

  /**
   * Устанавливает ошибку сервера
   * @returns {void}
   */
  setServerError() {
    const form = document.querySelector(".signup-form");
    this.setInputsError(
      this.getLoginEmailPasswordInput(form).at(-1),
      "При регистрации произошла ошибка. Повторите попытку позже",
      false,
    );
  }

  /**
   * Настраивает обработчики событий
   * @param {HTMLElement} container - Контейнер с элементами
   * @returns {void}
   */
  setupEventListeners(container) {
    const form = container.querySelector("#signup");
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
        goToPage(config.login);
      });
    }

    const [loginInput, emailInput, passwordInput] =
      this.getLoginEmailPasswordInput(form);

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
  validateInput(login, email, password, form) {
    const validator = new Validator();

    const checkField = (fieldName, fieldValue, inputElem) => {
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
      checkField("login", login, loginInput) &&
      checkField("email", email, emailInput) &&
      checkField("password", password, passwordInput)
    );
  }
  validateSingleField(fieldName, fieldValue, inputElem) {
    const validator = new Validator();

    let error = validator.validate(fieldName, fieldValue);

    if (error !== undefined) {
      this.inputField.setError([inputElem], true, error);
      return false;
    } else {
      this.inputField.setError([inputElem], false, "");
      inputElem.classList.remove("border-red")
      inputElem.classList.add("border-grey")
      return true;
    }
  }

  getLoginEmailPasswordInput(form) {
    const loginInput = form.querySelector('input[name="login"]');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    return [loginInput, emailInput, passwordInput];
  }

  getRandomSlogan() {
    const slogans = [
      [
        "Свобода — это контроль.",
        "Контроль — это уверенность.",
        "Уверенность — это сила.",
      ],
      [
        "Долг — это рабство.",
        "Сбережения — это свобода.",
        "Свобода — это сила.",
      ],
      [
        "Богатство — это дисциплина.",
        "Дисциплина — это порядок.",
        "Порядок — это будущее.",
      ],
    ];

    const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];

    return randomSlogan;
  }
}
