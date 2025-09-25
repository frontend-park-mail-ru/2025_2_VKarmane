import { StartButton } from "../../components/startbutton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { Category } from "../../components/category/index.js";
import { ExpenseCard } from "../../components/expenseCard/index.js";
import { goToPage, config } from "../../index.js";

export class LoginPage {
  constructor() {
    this.startButton = new StartButton();
    this.inputField = new InputField();
    this.absText = new absenceText();
    this.category = new Category();
    this.expCard = new ExpenseCard();
  }

  async render(container) {
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

    await this.setupEventListeners(container);
  }

  async handleLoginRequest(form) {
    const login = form.querySelector('input[name="login"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    });

    const result = await response.json();
    this.checkResultStatus(result, form);
  }

  checkResultStatus(result, form) {
    if (result.status !== "ok") {
      if (result.text === "wrong login or password") {
        this.setLoginFailedError(form);
      }
      return;
    }
    return;
  }

  setLoginFailedError(form) {
    const errorLogin = form.querySelector('input[name="login"]');
    const errorPassword = form.querySelector('input[name="password"]');
    this.inputField.setError(
      [errorLogin, errorPassword],
      "Неверный логин или пароль",
    );
  }

  async setupEventListeners(container) {
    const form = container.querySelector("#login");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.handleLoginRequest(form);
    });

    const signupLink = container.querySelector(".absence-text a");
    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(config.signup);
    });
  }
}
