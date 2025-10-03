import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import menuTemplate from "../../templates/components/menu.hbs?raw"

export class Menu {
  template: TemplateFn
  constructor() {
    this.template = Handlebars.compile(menuTemplate)
  }
  getSelf(): string {
    return this.template({});
  }
}
