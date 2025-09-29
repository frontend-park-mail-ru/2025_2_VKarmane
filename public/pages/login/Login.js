import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { Category } from "../../components/category/index.js";
import { ExpenseCard } from "../../components/expenseCard/index.js";
import { goToPage, config } from "../../index.js";
import { Validator } from "../../utils/validation.js";

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
  }

  /**
   * Рендерит страницу авторизации в контейнер
   * @param {HTMLElement} container - Контейнер для рендеринга
   * @returns {void}
   */
  render(container) {
    const template = Handlebars.templates["Login"];
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
      this.category.getSelf("green", "Банковские"),
      this.category.getSelf("red", "Развлечения"),
      this.category.getSelf("pink", "Покупки"),
      this.category.getSelf("blue", "Подписки"),
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
    container.innerHTML = template(data);

    this.setupEventListeners(container);
  }

  /**
   * Обрабатывает запрос авторизации
   * @param {HTMLFormElement} form - Форма авторизации
   * @returns {Promise<void>}
   * @async
   */
  async handleLoginRequest(form) {
    const login = form.querySelector('input[name="login"]').value;
    const password = form.querySelector('input[name="password"]').value;

    if (!this.validateInput(login, password, form)) {
      return;
    }

    const response = await fetch("http://217.16.23.67:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        login: login,
        password: password,
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
      this.setInputsError(form, "Неверный логин или пароль");
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
      form,
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
  setInputsError(form, text_error, to_color = true) {
    const errorLogin = form.querySelector('input[name="login"]');
    const errorPassword = form.querySelector('input[name="password"]');
    this.inputField.setError([errorLogin, errorPassword], to_color, text_error);
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

  /**
   * Валидирует введенные данные
   * @param {string} login - Логин пользователя
   * @param {string} password - Пароль пользователя
   * @param {HTMLFormElement} form - Форма авторизации
   * @returns {boolean} Результат валидации
   */
  validateInput(login, password, form) {
    const validator = new Validator();

    /**
     * Устанавливает ошибку для поля и возвращает результат валидации
     * @param {string} fieldName - Название поля
     * @param {string} fieldValue - Значение поля
     * @returns {boolean} Результат валидации
     */
    const setInputErrorAndReturn = (fieldName, fieldValue) => {
      let error = validator.validate(fieldName, fieldValue);
      if (error !== undefined) {
        this.setInputsError(form, error);
        return false;
      }
      return true;
    };

    return (
      setInputErrorAndReturn("login", login) &&
      setInputErrorAndReturn("password", password)
    );
  }
}
