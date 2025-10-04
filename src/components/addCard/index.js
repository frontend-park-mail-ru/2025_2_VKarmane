import Handlebars from "handlebars";
import addCardTemplate from "../../templates/components/addCard.hbs?raw"

export class AddCard {
  constructor() {
    this.template = Handlebars.compile(addCardTemplate)
  }
  getSelf() {
    return this.template;
  }
}
