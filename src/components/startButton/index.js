import Handlebars from "handlebars";
import startButtonTemplate from "../../templates/components/StartButton.hbs?raw"

export class StartButton {
  constructor() {
    this.template = Handlebars.compile(startButtonTemplate)
  }
  getSelf(form, text) {
    return this.template({ form, text });
  }
}
