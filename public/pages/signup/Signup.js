import { StartButton } from "../../components/startButton";
import { InputField } from "../../components/inputField";
import { absenceText } from "../../components/absenceText";
import { serviceItem } from "../../components/serviceItem";
import { config, goToPage } from "../../index.js";
import { Validator } from "../../utils/validation.js";

export class SignUpPage {
  constructor() {
    this.startButton = new StartButton();
    this.inputField = new InputField();
    this.absText = new absenceText();
    this.servItem = new serviceItem();
  }

  render(container) {
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
    this.setupEventListeners(container);
  }

  async handleSignUpRequest(form) {
    const login = form.querySelector('input[name="login"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    if (!this.validateInput(login, email, password, form)) {
      return;
    }

    const response = await fetch("http://217.16.23.67:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        login: login,
        email: email,
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
    } else if (status == 400) {
      this.setInputsError(
        form,
        "Пользователь с таким логином или почту уже существует",
      );
    } else if (status == 500) {
      this.setServerError();
    }
  }

  setInputsError(form, text_error, to_color = true) {
    const loginInput = form.querySelector('input[name="login"]');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    this.inputField.setError(
      [loginInput, emailInput, passwordInput],
      to_color,
      text_error,
    );
  }

  setServerError() {
    const form = document.querySelector(".signup-form");
    this.setInputsError(
      form,
      "При регистрации произошла ошибка. Повторите попытку позже",
      false,
    );
  }

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
  }

  validateInput(login, email, password, form) {
    const validator = new Validator();

    const setInputErrorAndReturn = (fieldName, fieldValue) => {
      console.log(fieldName);
      let error = validator.validate(fieldName, fieldValue);
      if (error !== undefined) {
        this.setInputsError(form, error);
        return false;
      }
      return true;
    };

    return (
      setInputErrorAndReturn("login", login) &&
      setInputErrorAndReturn("email", email) &&
      setInputErrorAndReturn("password", password)
    );
  }
}
