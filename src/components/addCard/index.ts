import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import addCardTemplate from "../../templates/components/addCard.hbs?raw";


export class AddCard {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(addCardTemplate);
  }
  getSelf(): string {
    return this.template({});
  }
}
