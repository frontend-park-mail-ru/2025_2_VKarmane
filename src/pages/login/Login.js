import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { Category } from "../../components/category/index.js";
import { ExpenseCard } from "../../components/expenseCard/index.js";
import { goToPage, config } from "../../index.js";
<<<<<<< HEAD

import { apiFetch } from "../../api/fetchWrapper.js";

import Handlebars from "handlebars";
import loginTemplate from "../../templates/pages/Login.hbs?raw";
=======
>>>>>>> 611c2b2 (styles && dynamic valid)

/**
 * Класс страницы авторизации
 * @class
 */
export class LoginPage {
  /**
   * Создает экземпляр страницы авторизации
   * @constructor
   */
  constructor() {
    /** @type {StartButton} */
    this.startButton = new StartButton();

    /** @type {InputField} */
    this.inputField = new InputField();

    /** @type {absenceText} */
    this.absText = new absenceText();

    /** @type {Category} */
    this.category = new Category();

    /** @type {ExpenseCard} */
    this.expCard = new ExpenseCard();

    this.template = Handlebars.compile(loginTemplate);
  }

  /**
   * Рендерит страницу авторизации в контейнер
   * @param {HTMLElement} container - Контейнер для рендеринга
   * @returns {void}
   */
  render(container) {
<<<<<<< HEAD
=======
    const template = Handlebars.templates["Login"];
>>>>>>> 611c2b2 (styles && dynamic valid)
    document.body.classList.add("hide-scroller");
    const expCards = [
      this.expCard.getSelf(
        "₽",
        50102,
        "Планируемый расход за период",
        "Сбалансировано",
      ),
      this.expCard.getSelf("₽", 152104, "Расходы за прошлый период"),
    ];
    const categories = [
<<<<<<< HEAD
      this.category.getSelf("banking", "Банковские"),
      this.category.getSelf("entertainments", "Развлечения"),
      this.category.getSelf("purchases", "Покупки"),
      this.category.getSelf("subscribes", "Подписки"),
=======
      this.category.getSelf("#8BFF91", "#00B20C", "Банковские"),
      this.category.getSelf("#FF80EA", "#BF00AF", "Развлечения"),
      this.category.getSelf("#FFDA8F", "#B28600","Покупки"),
      this.category.getSelf("#94F1FF", "#006B6F", "Подписки"),
>>>>>>> 27fa6ce (chart-circle login style fixes)
    ];
    const data = {
      title: "Войти",
      loginInput: this.inputField.getSelf("login", "login", "логин"),
      passwordInput: this.inputField.getSelf("password", "password", "пароль"),
      absenceText: this.absText.getSelf(
        "Нет аккаунта?",
        config.signup.href,
        "Зарегистрируйтесь!",
      ),
      expenseCards: expCards,
      loginButton: this.startButton.getSelf("login", "Войти"),
      categories: categories,
    };
    container.innerHTML = this.template(data);

    this.setupEventListeners(container);
  }

  /**
   * Обрабатывает запрос авторизации
   * @param {HTMLFormElement} form - Форма авторизации
   * @returns {Promise<void>}
   * @async
   */
<<<<<<< HEAD

  async handleLoginRequest(form) {
    const [loginInput, passwordInput] = this.getLoginPasswordInput(form);

    const { ok, status } = await apiFetch(`/auth/login`, {
      method: "POST",

      body: JSON.stringify({
        login: loginInput.value,
        password: passwordInput.value,
      }),
    });

    if (!ok) {
      if (status === 400) {
        this.setInputsError(
          [loginInput, passwordInput],
          "Неверный логин или пароль",
        );
      } else if (status === 500) {
        this.setServerError();
      } else {
        this.setServerError();
      }
      return;
    }

    goToPage(config.user_page);
=======
  async handleLoginRequest(form) {
    const [loginInput, passwordInput] = this.getLoginPasswordInput(form);

    const response = await fetch("http://217.16.23.67:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        login: loginInput.value,
        password: passwordInput.value,
      }),
      credentials: "include",
    });

    const status = response.status;
    const result = await response.json();
    this.checkResultStatus(status, result, form);
  }

  /**
   * Проверяет статус ответа сервера и выполняет соответствующие действия
   * @param {number} status - HTTP статус код
   * @param {Object} result - Результат ответа сервера
   * @param {HTMLFormElement} form - Форма авторизации
   * @returns {void}
   */
  checkResultStatus(status, result, form) {
    if (status == 200) {
      goToPage(config.user_page);
    } else if (status == 401) {
      this.setInputsError(
        this.getLoginPasswordInput(form),
        "Неверный логин или пароль",
      );
    } else if (status == 500) {
      this.setServerError();
    }
>>>>>>> 611c2b2 (styles && dynamic valid)
  }

  /**
   * Устанавливает ошибку сервера
   * @returns {void}
   */
  setServerError() {
    const form = document.querySelector(".login-form");
    this.setInputsError(
      this.getLoginPasswordInput(form).at(-1),
      "При авторизации произошла ошибка. Повторите попытку позже",
      false,
    );
  }

  /**
   * Устанавливает ошибки для полей ввода
   * @param {HTMLFormElement} form - Форма авторизации
   * @param {string} text_error - Текст ошибки
   * @param {boolean} [to_color=true] - Нужно ли изменять цвет полей
   * @returns {void}
   */
  setInputsError(input, text_error, to_color = true) {
    const arr = Array.isArray(input) ? input : [input];
    this.inputField.setError(arr, to_color, text_error);
  }

  /**
   * Настраивает обработчики событий
   * @param {HTMLElement} container - Контейнер с элементами
   * @returns {void}
   */
  setupEventListeners(container) {
    const form = container.querySelector("#login");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleLoginRequest(form);
    });

    const signupLink = container.querySelector(".absence-text a");
    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(config.signup);
    });
  }

  getLoginPasswordInput(form) {
    const loginInput = form.querySelector('input[name="login"]');
    const passwordInput = form.querySelector('input[name="password"]');
    return [loginInput, passwordInput];
  }
}
