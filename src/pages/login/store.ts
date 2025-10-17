import { dispatcher } from "../../core/dispatcher/dispatcher.js";
import { Emitter } from "../../core/emitter/emitter.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import type { Action } from "../../core/dispatcher/dispatcher.js";

export enum LoginBackendTextError {
    CREDENTIALS_ERROR = "Неверный логин или пароль",
    SERVER_ERROR = "Ошибка авторизации"
};


interface LoginBackendError {
    text: string,
}


export interface LoginState {
        login: string,
        password: string,
        errorBackend: LoginBackendError,
        loading: boolean,
        success: boolean,
}


class LoginStore extends Emitter {
    #state: LoginState = {
        login: "",
        password: "",
        errorBackend: {text: ""},
        loading: false,
        success: false,
    };

    constructor() {
        super();

        dispatcher.register(async (action: Action) => {
            switch (action.type) {
                case "LOGIN_FIELD_UPDATE":
                    this.#state = {...this.#state, ...action.payload};
                    this.emit("update");
                    break;
                case "LOGIN_SUBMIT":
                    await this.#handleLogin();
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
        password: "",
        errorBackend: {text: ""},
        loading: false,
        success: false,
        }
    }

    async #handleLogin() {
        const {login, password} = this.#state;

        this.#state = {...this.#state, loading: true};
        this.emit("change");

        const {ok, status} = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                login, password
            })
        })
        if (!ok) {
            let msg = LoginBackendTextError.SERVER_ERROR;
            if (status === 400) {
                msg = LoginBackendTextError.CREDENTIALS_ERROR;
            }
            this.#state = { ...this.#state, loading: false, errorBackend: {text: msg} };
            this.emit("change");
            return;
        }
        this.#state = { ...this.#state, loading: false, success: true };
        this.emit("change");
     }

}

export const loginStore = new LoginStore();