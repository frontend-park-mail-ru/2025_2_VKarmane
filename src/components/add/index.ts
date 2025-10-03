import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import addTemplate from "../../templates/components/Add.hbs?raw"

export class Add {
  template: TemplateFn
  constructor(){
    this.template = Handlebars.compile(addTemplate)
  }

  getSelf(): string {
    return this.template({});
  }
}
