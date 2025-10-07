
import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import informerTemplate from "../../templates/components/Informer.hbs?raw";

export class Informer {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(informerTemplate);
  }
  getSelf(text: string): string {
    return this.template({ text });
  }
}