import { dispatcher } from "../../core/dispatcher/dispatcher.js";
import { Emitter } from "../../core/emitter/emitter.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { Validator } from "../../utils/validation.js";
import type { Action } from "../../core/dispatcher/dispatcher.js";
import { getRandomSlogan } from "./slogans.js";

export enum SignUpBackendTextError {
  CREDENTIALS_ERROR = "Пользователь с таким логином или почтой уже существует",
  SERVER_ERROR = "Ошибка регистрации",
}

interface SignUpBackendError {
  text: string;
}

interface SignUpFrontendError {
  input: string;
  text: string;
}

export interface SignUpState {
  login: string;
  email: string;
  password: string;
  errorBackend: SignUpBackendError;
  errorsFrontend: SignUpFrontendError[];
  loading: boolean;
  success: boolean;
  slogans: string[];
}

class SignUpStore extends Emitter {
  #state: SignUpState = {
    login: "",
    email: "",
    password: "",
    errorBackend: { text: "" },
    errorsFrontend: [],
    loading: false,
    success: false,
    slogans: getRandomSlogan(),
  };

  constructor() {
    super();

    dispatcher.register(async (action: Action) => {
      switch (action.type) {
        case "SIGNUP_FIELD_UPDATE":
          this.#state = { ...this.#state, ...action.payload };
          this.emit("update");
          break;
        case "SIGNUP_SUBMIT":
          await this.#handleSignUp();
          break;
      }
    });
  }

  getState() {
    return this.#state;
  }

  clearState() {
    this.#state = {
      login: "",
      email: "",
      password: "",
      errorBackend: { text: "" },
      errorsFrontend: [],
      loading: false,
      success: false,
      slogans: this.#state.slogans,
    };
  }

  async #handleSignUp() {
    const validator = new Validator();
    const { login, email, password } = this.#state;

    const loginError = validator.validate("login", login);
    const emailError = validator.validate("email", email);
    const passError = validator.validate("password", password);

    if (loginError || emailError || passError) {
      const errors: SignUpFrontendError[] = [];
      if (loginError)
        errors.push({
          input: "login",
          text: loginError,
        });
      if (emailError)
        errors.push({
          input: "email",
          text: emailError,
        });
      if (passError)
        errors.push({
          input: "password",
          text: passError,
        });
      console.log(errors);
      this.#state = {
        ...this.#state,
        errorsFrontend: errors,
      };
      this.emit("change");
      return;
    }
    this.#state = { ...this.#state, loading: true };
    this.emit("change");

    const { ok, status } = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        login,
        email,
        password,
      }),
    });
    if (!ok) {
      let msg = SignUpBackendTextError.SERVER_ERROR;
      if (status === 409) {
        msg = SignUpBackendTextError.CREDENTIALS_ERROR;
      }
      this.#state = {
        ...this.#state,
        loading: false,
        errorBackend: { text: msg },
      };
      this.emit("change");
      return;
    }
    this.#state = { ...this.#state, loading: false, success: true };
    this.emit("change");
  }
}

export const signUpStore = new SignUpStore();
