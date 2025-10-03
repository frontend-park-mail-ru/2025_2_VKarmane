import { Informer } from "../informer/index.js";

<<<<<<< HEAD

import Handlebars from "handlebars";
import inputFieldTemplate from "../../templates/components/InputField.hbs?raw";
=======
import Handlebars from "handlebars";
import inputFieldTemplate from "../../templates/components/InputField.hbs?raw"
>>>>>>> 6781c2f (vite implemented)


export class InputField {
  constructor() {
<<<<<<< HEAD
    this.template = Handlebars.compile(inputFieldTemplate);
  }
  getSelf(type, name, text) {

=======
    this.template = Handlebars.compile(inputFieldTemplate)
  }
  getSelf(type, name, text) {
>>>>>>> 6781c2f (vite implemented)
    return this.template({ type, name, text });
  }

  setError(inputs, to_color, text_error = "") {
    if (!inputs) {
      return;
    }
    const group = inputs[inputs.length - 1].closest(".input-group");
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
      group.appendChild(errElem);
    }

    if (to_color) {
      inputs.forEach((element) => {
        element.classList.remove("border-grey")
        element.classList.add("border-red")
      });
    }
  }
  setPasswordInformerShow(passwordInput) {
    const inputGroup = passwordInput.closest(".input-group");
    const informer = new Informer().getSelf(
      "Пароль должен содержать минимум 6 символов, заглавную букву, цифры, а так же может содержать символы @, #, _, &, %, $",
    );
    const informerWrapper = document.createElement("div");
    informerWrapper.innerHTML = informer;
    inputGroup.appendChild(informerWrapper);

    passwordInput.addEventListener("mouseenter", () => {
      informerWrapper.classList.add("show");
    });

    passwordInput.addEventListener("mouseleave", () => {
      informerWrapper.classList.remove("show");
    });
  }
}
