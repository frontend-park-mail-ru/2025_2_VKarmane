import Handlebars from "handlebars";
import informerTemplate from "../../templates/components/Informer.hbs?raw";

export class Informer {
  constructor() {
    this.template = Handlebars.compile(informerTemplate);
  }
  getSelf(text) {
    return this.template({ text });
  }
}
