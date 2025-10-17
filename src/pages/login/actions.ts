import { dispatcher } from "../../core/dispatcher/dispatcher.js";

enum LoginActionsType {
    UpdateField = "LOGIN_FIELD_UPDATE",
    Submit = "LOGIN_SUBMIT"
}

export const LoginActions = {
    updateField(name: string, value: string) {
        dispatcher.dispatch({
            type: LoginActionsType.UpdateField,
            payload: {[name]: value}
        });
    },

    submit() {
        dispatcher.dispatch({
            type: LoginActionsType.Submit,
            payload: {}
        });
    },
};