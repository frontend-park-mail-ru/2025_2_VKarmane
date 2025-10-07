import Handlebars from "handlebars";
import addTemplate from "../../templates/components/Add.hbs?raw";

export class Add {
  constructor() {
    this.template = Handlebars.compile(addTemplate);
  }

  getSelf() {
    return this.template;
  }
}
