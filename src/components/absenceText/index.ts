import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import asbTextTemplate from "../../templates/components/AbsenceText.hbs?raw";

export class absenceText {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(asbTextTemplate);
  }
  getSelf(text: string, link: string, linkText: string): string {
    return this.template({ text, link, linkText });
  }
}
