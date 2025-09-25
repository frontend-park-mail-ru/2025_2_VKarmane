import { StartButton } from "../../components/startbutton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { serviceItem } from "../../components/serviceItem/index.js";
import { config, goToPage } from "../../index.js";

export class SignUpPage {
  constructor() {
    this.startButton = new StartButton();
    this.inputField = new InputField();
    this.absText = new absenceText();
    this.servItem = new serviceItem();
  }

  async render(container) {
    const template = Handlebars.templates["SignUp"];

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
      signUpButton: this.startButton.getSelf("signup", "Зарегистрироваться"),
    };

    container.innerHTML = template(data);
    await this.setupEventListeners(container);
  }

  async handleSignUpRequest(form) {
    const login = form.querySelector('input[name="login"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        login: login,
        email: email,
        password: password,
      }),
    });

    const result = await response.json();
    this.checkResultStatus(result, form);
  }

  checkResultStatus(result, form) {
    if (result.status !== "ok") {
      if (result.text === "occupied email") {
        this.setEmailError(form);
      } else if (result.text === "occupied login") {
        this.setLoginError(form);
      }
      return;
    }
  }

  setEmailError(form) {
    const errorInput = form.querySelector('input[name="email"]');
    this.inputField.setError([errorInput], "Адрес уже зарегистрирован");
  }

  setLoginError(form) {
    const errorInput = form.querySelector('input[name="login"]');
    this.inputField.setError([errorInput], "Такой логин уже существует");
  }

  async setupEventListeners(container) {
    const form = container.querySelector("#signup");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await this.handleSignUpRequest(form);
      });
    }

    const loginLink = container.querySelector(".absence-text a");
    if (loginLink) {
      loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        goToPage(config.login);
      });
    }
  }
}
