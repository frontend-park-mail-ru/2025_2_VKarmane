import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { Category } from "../../components/category/index.js";
import { ExpenseCard } from "../../components/expenseCard/index.js";
import { goToPage, config } from "../../index.js";

import Handlebars from "handlebars";
import loginTemplate from "../../templates/pages/Login.hbs?raw"

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

    this.template = Handlebars.compile(loginTemplate)
  }

  /**
   * Рендерит страницу авторизации в контейнер
   * @param {HTMLElement} container - Контейнер для рендеринга
   * @returns {void}
   */
  render(container) {
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
      this.category.getSelf("#8BFF91", "#00B20C", "Банковские"),
      this.category.getSelf("#FF80EA", "#BF00AF", "Развлечения"),
      this.category.getSelf("#FFDA8F", "#B28600", "Покупки"),
      this.category.getSelf("#94F1FF", "#006B6F", "Подписки"),
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
  async handleLoginRequest(form) {
    const [loginInput, passwordInput] = this.getLoginPasswordInput(form);

    try {
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
    catch (error) {
      console.log(error)
      this.setServerError()
      return
    }


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
    } else if (status == 400) {
      this.setInputsError(
        this.getLoginPasswordInput(form),
        "Неверный логин или пароль",
      );
    } else if (status == 500) {
      this.setServerError();
    }
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
