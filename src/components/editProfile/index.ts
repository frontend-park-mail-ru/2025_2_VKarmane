import Handlebars from "handlebars";
import EditProfileTemplate from "../../templates/components/editProfile.hbs?raw";
import { InputField } from "../inputField/index.js";
import type { TemplateFn } from "../../types/handlebars.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { router } from "../../router.js";
import { Validator } from "../../utils/validation.js";

declare global {
  interface Window {
    handleOperationTypeChange?: () => void;
  }
}

export class EditProfile {
  inputField: InputField;
  template: TemplateFn;

  constructor(ClosePopupCallback: () => void) {
    this.inputField = new InputField();
    this.template = Handlebars.compile(EditProfileTemplate);
    window.closePopup = ClosePopupCallback.bind(this);
  }

  getSelf(fullName: string, email: string): string {
    const [name, surname] = fullName.split(" ");

    return this.template({
      fullName: fullName,
      ID: 1,
      firstNameInput: this.inputField.getSelf(
        "text",
        "firstName",
        "firstName",
        name,
      ),
      lastNameInput: this.inputField.getSelf(
        "text",
        "lastName",
        "lastName",
        surname,
      ),
      emailInput: this.inputField.getSelf("email", "email", "email", email),
    });
  }

  setEvents(): void {
    const form = document.getElementById(
      "edit-profile-form",
    ) as HTMLFormElement;
    if (!form) return;
    const firstNameInput = form.querySelector(
      "input[name='firstName']",
    ) as HTMLInputElement;
    const lastNameInput = form.querySelector(
      "input[name='lastName']",
    ) as HTMLInputElement;
    const emailInput = form.querySelector(
      "input[name='email']",
    ) as HTMLInputElement;
    emailInput.addEventListener("input", () => {
      this.validateSingleField("email", emailInput.value, emailInput);
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const validator = new Validator();
      const emailError = validator.validate("email", emailInput.value);
      if (emailError) {
        this.inputField.setError([emailInput], true, emailError);
        return;
      }
      const { ok, error } = await apiFetch("/profile/edit", {
        method: "POST",
        body: JSON.stringify({
          first_name: firstNameInput.value,
          last_name: lastNameInput.value,
          email: emailInput.value,
        }),
      });
      if (ok) {
        router.navigate("/profile");
        return;
      }
      console.log(error);
    });
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
}
