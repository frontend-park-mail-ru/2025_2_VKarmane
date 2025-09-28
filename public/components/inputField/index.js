export class InputField {
  getSelf(type, name, text) {
    const template = Handlebars.templates["InputField"];
    return template({ type, name, text });
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
        element.style.borderColor = "red";
      });
    }

  }
}
