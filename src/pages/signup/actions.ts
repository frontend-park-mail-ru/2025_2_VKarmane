import { dispatcher } from "../../core/dispatcher/dispatcher.js";

enum SignUpActionsType {
  UpdateField = "SIGNUP_FIELD_UPDATE",
  Submit = "SIGNUP_SUBMIT",
}

export const SignUpActions = {
  updateField(name: string, value: string) {
    dispatcher.dispatch({
      type: SignUpActionsType.UpdateField,
      payload: { [name]: value },
    });
  },

  submit() {
    dispatcher.dispatch({
      type: SignUpActionsType.Submit,
      payload: {},
    });
  },
};
