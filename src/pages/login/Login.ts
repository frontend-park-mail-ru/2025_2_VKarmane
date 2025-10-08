import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { Category } from "../../components/category/index.js";
import { ExpenseCard } from "../../components/expenseCard/index.js";
import { apiFetch } from "../../api/fetchWrapper.js";

import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import  router from "../../index.js"
import loginTemplate from "../../templates/pages/Login.hbs?raw";

export class LoginPage {
  startButton: StartButton;
  inputField: InputField;
  absText: absenceText;
  category: Category;
  expCard: ExpenseCard;
  template: TemplateFn;
  constructor() {
    this.startButton = new StartButton();

    this.inputField = new InputField();

    this.absText = new absenceText();

    this.category = new Category();

    this.expCard = new ExpenseCard();

    this.template = Handlebars.compile(loginTemplate);
  }

  render(container: HTMLElement): void {
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
      this.category.getSelf("banking", "Банковские"),
      this.category.getSelf("entertainments", "Развлечения"),
      this.category.getSelf("purchases", "Покупки"),
      this.category.getSelf("subscribes", "Подписки"),
    ];
    const data = {
      title: "Войти",
      loginInput: this.inputField.getSelf("login", "login", "логин"),
      passwordInput: this.inputField.getSelf("password", "password", "пароль"),
      absenceText: this.absText.getSelf(
        "Нет аккаунта?",
        "/register",
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

  async handleLoginRequest(form: HTMLFormElement) {
    const [loginInput, passwordInput] = this.getLoginPasswordInput(form);

    const { ok, status } = await apiFetch(`/auth/login`, {
      method: "POST",

      body: JSON.stringify({
        login: loginInput!.value,
        password: passwordInput!.value,
      }),
    });

    if (!ok) {
      if (status === 400) {
        this.setInputsError(
          [loginInput!, passwordInput!],
          "Неверный логин или пароль",
        );
      } else if (status === 500) {
        this.setServerError();
      } else {
        this.setServerError();
      }
      return;
    }
  }

  checkResultStatus(
    status: number,
    result: Object,
    form: HTMLFormElement,
  ): void {
    if (status == 200) {
      router.navigate("/");
    } else if (status == 400) {
      this.setInputsError(
        this.getLoginPasswordInput(form),
        "Неверный логин или пароль",
      );
    } else if (status == 500) {
      this.setServerError();
    }

  }

  setServerError(): void {
    const form: HTMLFormElement | null = document.querySelector(".login-form");
    if (!form) return;
    const reqInput: HTMLInputElement | undefined =
      this.getLoginPasswordInput(form).at(-1);
    if (!reqInput) return;
    this.setInputsError(
      reqInput,
      "При авторизации произошла ошибка. Повторите попытку позже",
      false,
    );
  }

  setInputsError(
    input: HTMLInputElement | HTMLInputElement[],
    text_error: string,
    to_color: boolean = true,
  ): void {
    const arr = Array.isArray(input) ? input : [input];
    this.inputField.setError(arr, to_color, text_error);
  }

  setupEventListeners(container: HTMLElement): void {
    const form: HTMLFormElement | null = container.querySelector("#login");
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleLoginRequest(form!);
    });

    const signupLink = container.querySelector(".absence-text a");
    signupLink!.addEventListener("click", (e) => {
      e.preventDefault();
      router.navigate("/signup");
    });
  }

  getLoginPasswordInput(form: HTMLFormElement): HTMLInputElement[] {
    const loginInput: HTMLInputElement | null = form.querySelector(
      'input[name="login"]',
    );
    const passwordInput: HTMLInputElement | null = form.querySelector(
      'input[name="password"]',
    );
    return [loginInput!, passwordInput!];
  }
}
