import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { Category } from "../../components/category/index.js";
import { ExpenseCard } from "../../components/expenseCard/index.js";
import { LoginBackendTextError, loginStore } from "./store.js";
import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import { router } from "../../index.js";
import loginTemplate from "../../templates/pages/Login.hbs?raw";
import { LoginActions } from "./actions.js";
import type { LoginState } from "./store.js";

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

    loginStore.on("change", () => this.render(document.querySelector("#root")!));
    loginStore.on("update", () => this.updateInputs());
  }

  render(container: HTMLElement): void {
    const state = loginStore.getState();
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
      loginInput: this.inputField.getSelf("login", "login", "логин", state.login),
      passwordInput: this.inputField.getSelf("password", "password", "пароль", state.password),
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

    this.setupEvents(container, state);
  }

  setupEvents(container: HTMLElement, state: LoginState) {
      const form = container.querySelector("#login") as HTMLFormElement;
      if (!form) return;
      const [loginInput, passwordInput] =
            this.getLoginPasswordInput(form);
  
      if (!loginInput || !passwordInput) return;
  
      form.addEventListener("input", (e) => {
        const input = e.target as HTMLInputElement;
        LoginActions.updateField(input.name, input.value);
      });
  
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        LoginActions.submit();
      });

      const signupLink = container.querySelector(".absence-text a");
      signupLink!.addEventListener("click", (e) => {
      e.preventDefault();
      router.navigate("/signup");
    });
  
      if (state.errorBackend.text) {
        console.log(state.errorBackend.text)
        switch (state.errorBackend.text) {
          case LoginBackendTextError.CREDENTIALS_ERROR:
            this.inputField.setError([loginInput, passwordInput], true, state.errorBackend.text); 
            break;
          case LoginBackendTextError.SERVER_ERROR:
            this.inputField.setError([passwordInput], false, state.errorBackend.text);
            break;
          }
        }
  
      if (state.success) {
      loginStore.clearState();
      router.navigate("/");
    }
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

  getLoginPasswordInput(form: HTMLFormElement): HTMLInputElement[] {
    const loginInput: HTMLInputElement | null = form.querySelector(
      'input[name="login"]',
    );
    const passwordInput: HTMLInputElement | null = form.querySelector(
      'input[name="password"]',
    );
    if (!loginInput || !passwordInput) throw "no inputs";
    return [loginInput, passwordInput];
  }

    updateInputs() {
      const form = document.querySelector("#login") as HTMLFormElement;
      if (!form) return;
      const [loginInput, passwordInput] = this.getLoginPasswordInput(form)
      if (!loginInput || !passwordInput) throw "no inputs"; 
      const state = loginStore.getState();
      loginInput.value = state.login;
      passwordInput.value = state.password;
    }
}
