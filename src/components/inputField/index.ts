import { Informer } from "../informer/index.js";

import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import inputFieldTemplate from "../../templates/components/InputField.hbs?raw";

export class InputField {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(inputFieldTemplate);
  }

  getSelf(type: string, name: string, text: string): string {
    return this.template({ type, name, text });
  }


  setError(
    inputs: HTMLInputElement[],
    to_color: boolean,
    text_error: string = "",
  ): string | undefined {
    if (!inputs) {
      return;
    }
    const lastEl = inputs[inputs.length - 1];
    if (!lastEl) return;
    const group = lastEl.closest(".input-group");
    if (!group) return;
    let errEls = group.querySelectorAll(".error-text");
    errEls.forEach((element) => {
      element.remove();
    });

    if (text_error) {
      let errElem = document.createElement("div");
      errElem.classList.add("error-text");
      errElem.style.color = "red";
      errElem.style.fontSize = "0.875rem";

      errElem.textContent = text_error;
      group!.appendChild(errElem);
    }

    if (to_color) {
      inputs.forEach((element) => {
        element.classList.remove("border-grey");
        element.classList.add("border-red");
      });
    }
  }
  setPasswordInformerShow(passwordInput: HTMLInputElement): void {
    const inputGroup = passwordInput.closest(".input-group");
    if (!inputGroup) return;
    const informer = new Informer().getSelf(
      "Пароль должен содержать минимум 6 символов, заглавную букву, цифры, а так же может содержать символы @, #, _, &, %, $",
    );
    const informerWrapper = document.createElement("div");
    informerWrapper.innerHTML = informer;
    inputGroup!.appendChild(informerWrapper);

    passwordInput.addEventListener("mouseenter", () => {
      informerWrapper.classList.add("show");
    });

    passwordInput.addEventListener("mouseleave", () => {
      informerWrapper.classList.remove("show");
    });
  }
}
