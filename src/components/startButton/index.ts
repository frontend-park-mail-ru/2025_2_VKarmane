import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import startButtonTemplate from "../../templates/components/StartButton.hbs?raw";


export class StartButton {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(startButtonTemplate);
  }
  getSelf(form: string, text: string): string {
    return this.template({ form, text });
  }
}
