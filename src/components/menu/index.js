import Handlebars from "handlebars";
import menuTemplate from "../../templates/components/menu.hbs?raw"

export class Menu {
  constructor() {
    this.template = Handlebars.compile(menuTemplate)
  }
  getSelf() {
    return this.template;
  }
}
