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

  getSelf(
    fullName: string,
    email: string,
    userID: number,
    logo: string,
  ): string {
    const [name, surname] = fullName.split(" ");

    return this.template({
      logo: logo,
      fullName: fullName,
      ID: userID,
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

      const formData = new FormData();
      formData.append("first_name", firstNameInput.value);
      formData.append("last_name", lastNameInput.value);
      formData.append("email", emailInput.value);

      const avatarFile = (
        document.getElementById("avatarInput") as HTMLInputElement
      ).files?.[0];
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const { ok, error } = await apiFetch("/profile/edit", {
        method: "PUT",
        body: formData,
      });

      if (ok) {
        window.closePopup?.();

        this.updatePage(
          firstNameInput.value + lastNameInput.value
            ? firstNameInput.value + lastNameInput.value
            : "Неизвестно",
          emailInput.value,
          avatarPic.src,
        );
      } else {
        console.error(error);
      }
    });

    const avatarPic = document.getElementById("editAvatarPic");
    if (!avatarPic) throw new Error("no avatar pic element");
    const editForm = document.querySelector(".avatar-edit") as HTMLDivElement;
    if (!editForm) throw new Error("no edit avatar element");

    avatarPic.addEventListener("mouseover", () => {
      editForm.style.opacity = "1";
      editForm.style.visibility = "visible";
    });

    editForm.addEventListener("mouseleave", () => {
      editForm.style.opacity = "0";
      editForm.style.visibility = "hidden";
    });

    const editBtn = document.getElementById("editAvatarBtn");
    const fileInput = document.getElementById("avatarInput");
    if (!editBtn || !fileInput) throw new Error("no avatar edit elements");

    editBtn.addEventListener("click", () => {
      fileInput.click();
    });
    fileInput.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        console.warn("Выберите изображение");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          avatarPic.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
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

  updatePage(fullName: string, email: string, avatarSrc: string) {
    const fullNameElement = document.querySelector(
      ".profile__data_name",
    ) as HTMLElement;
    const emailElement = document.querySelector(
      ".profile__data_row__field",
    ) as HTMLElement;
    const avatarElement =
      document.querySelector<HTMLImageElement>(".profile__avatar");

    if (fullNameElement) fullNameElement.textContent = fullName;
    if (emailElement) emailElement.textContent = email;
    if (avatarElement) avatarElement.src = avatarSrc;
  }
}
