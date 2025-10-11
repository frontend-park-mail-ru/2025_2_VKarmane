
import { signUpStore } from "./store.js";
import { SignUpActions } from "./action.js";
import Handlebars from "handlebars";
import signUpTemplate from "../../templates/pages/SignUp.hbs?raw";
import {router} from "../../router/index.js";
import type { TemplateFn } from "../../types/handlebars.js";
import { StartButton } from "../../components/startButton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { serviceItem } from "../../components/serviceItem/index.js";
import type { SignUpState } from "./store.js";
import { SignUpBackendTextError } from "./store.js";
import { Validator } from "../../utils/validation.js";

export class SignUpPage {
  template: TemplateFn;
  inputField: InputField;
  startButton: StartButton;
  absText: absenceText;
  servItem: serviceItem;
  



  constructor() {
    this.template = Handlebars.compile(signUpTemplate);

    this.inputField = new InputField();
    this.startButton = new StartButton();
    this.absText = new absenceText();
    this.servItem = new serviceItem();

    signUpStore.on("change", () => this.render(document.querySelector("#root")!));
    signUpStore.on("update", () => this.updateInputs());
  }

  render(container: HTMLElement) {
    const state = signUpStore.getState();
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
      loginInput: this.inputField.getSelf("login", "login", "логин", state.login),
      emailInput: this.inputField.getSelf("email", "email", "email", state.email),
      passwordInput: this.inputField.getSelf("password", "password", "пароль", state.password),
      absenceText: this.absText.getSelf("Есть аккаунт?", "/login", "Войти!"),
      items: serviceItems,
      slogans: state.slogans,
      signUpButton: this.startButton.getSelf("signup", "Зарегистрироваться"),
    };

    container.innerHTML = this.template(data);
    this.setupEvents(container, state)
  }

  setupEvents(container: HTMLElement, state: SignUpState) {
    console.log("render")
    const form = container.querySelector("#signup") as HTMLFormElement;
    if (!form) return;
    const [loginInput, emailInput, passwordInput] =
          this.getLoginEmailPasswordInput(form);

    if (!loginInput || !emailInput || !passwordInput) return;

    form.addEventListener("input", (e) => {
      const input = e.target as HTMLInputElement;
      SignUpActions.updateField(input.name, input.value);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      SignUpActions.submit();
    });

    loginInput.addEventListener("input", () => {
      this.validateSingleField("login", loginInput.value, loginInput!);
    });

    emailInput.addEventListener("input", () => {
      this.validateSingleField("email", emailInput.value, emailInput);
    });

    passwordInput.addEventListener("input", () => {
      this.validateSingleField(
        "password",
        passwordInput.value,
        passwordInput,
      );
    });

    const loginLink = container.querySelector(".absence-text a");
    if (loginLink) {
      loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        router.navigate("/login")
      });
    }

    this.inputField.setPasswordInformerShow(passwordInput);

    if (state.errorBackend.text) {
      console.log(2222)
      console.log(state.errorBackend.text)
      switch (state.errorBackend.text) {
        case SignUpBackendTextError.CREDENTIALS_ERROR:
          this.inputField.setError([loginInput, emailInput, passwordInput], true, state.errorBackend.text); 
          break;
        case SignUpBackendTextError.SERVER_ERROR:
          this.inputField.setError([passwordInput], false, state.errorBackend.text);
          break;
        }
      }
      console.log(state.errorsFrontend)
      if (state.errorsFrontend.length > 0) {
        console.log(67)
        const [loginInput, emailInput, passwordInput] =
          this.getLoginEmailPasswordInput(form);

        if (!loginInput || !emailInput || !passwordInput) return; 
          state.errorsFrontend.forEach((err) => {
  
          switch (err.input) {
            case "login":
              this.inputField.setError([loginInput], true, err.text);
              break;
            case "email":
              this.inputField.setError([emailInput], true, err.text);
              break;
            case "password":
              this.inputField.setError([passwordInput], true, err.text);
              break;
          }
          })

        }

    if (state.success) {
    signUpStore.clearState();
    router.navigate("/");
  }
  }

  getLoginEmailPasswordInput(form: HTMLFormElement): HTMLInputElement[] {
    const loginInput: HTMLInputElement | null = form.querySelector(
      'input[name="login"]',
    );
    const emailInput: HTMLInputElement | null = form.querySelector(
      'input[name="email"]',
    );
    const passwordInput: HTMLInputElement | null = form.querySelector(
      'input[name="password"]',
    );
    if (!loginInput || !emailInput || !passwordInput) throw Error;

    return [loginInput, emailInput, passwordInput];
  }
  updateInputs() {
    const form = document.querySelector("#signup")!;
    if (!form) return;

    const state = signUpStore.getState();
    form.querySelector('input[name="login"]')!.value = state.login;
    form.querySelector('input[name="email"]')!.value = state.email;
    form.querySelector('input[name="password"]')!.value = state.password;
  }
  validateInput(
    login: string,
    email: string,
    password: string,
    form: HTMLFormElement,
  ) {
    const validator = new Validator();

    const checkField = (
      fieldName: string,
      fieldValue: string,
      inputElem: HTMLInputElement,
    ) => {
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
      checkField("login", login, loginInput!) &&
      checkField("email", email, emailInput!) &&
      checkField("password", password, passwordInput!)
    );
  }

  validateSingleField(
    fieldName: string,
    fieldValue: string,
    inputElem: HTMLInputElement,
  ) {
    const validator = new Validator();

    let error = validator.validate(fieldName, fieldValue);

    if (error !== undefined) {
      this.inputField.setError([inputElem], true, error);
      return false;
    } else {
      this.inputField.setError([inputElem], false, "");
      inputElem.classList.remove("border-red");
      inputElem.classList.add("border-grey");
      return true;
    }
  }

  setInputsError(
    input: HTMLInputElement | HTMLInputElement[],
    text_error: string,
    to_color: boolean = true,
  ): void {
    const arr = Array.isArray(input) ? input : [input];
    this.inputField.setError(arr, to_color, text_error);
  }

}