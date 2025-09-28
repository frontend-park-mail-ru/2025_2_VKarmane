import { StartButton } from "../../components/startButton";
import { InputField } from "../../components/inputField";
import { absenceText } from "../../components/absenceText";
import { Category } from "../../components/category";
import { ExpenseCard } from "../../components/expenseCard";
import { goToPage, config } from "../../index.js";
import { Validator } from "../../utils/validation.js";

export class LoginPage {
  constructor() {
    this.startButton = new StartButton();
    this.inputField = new InputField();
    this.absText = new absenceText();
    this.category = new Category();
    this.expCard = new ExpenseCard();
  }

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

  checkResultStatus(status, result, form) {
    if (status == 200) {
      goToPage(config.user_page);
    } else if (status == 401) {
      this.setInputsError(form, "Неверный логин или пароль");
    } else if (status == 500) {
      this.setServerError();
    }
  }

  setServerError() {
    const form = document.querySelector(".login-form");
    this.setInputsError(
      form,
      "При авторизации произошла ошибка. Повторите попытку позже",
      false,
    );
  }

  setInputsError(form, text_error, to_color = true) {
    const errorLogin = form.querySelector('input[name="login"]');
    const errorPassword = form.querySelector('input[name="password"]');
    this.inputField.setError([errorLogin, errorPassword], to_color, text_error);
  }

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

  validateInput(login, password, form) {
    const validator = new Validator();

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
