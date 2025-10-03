import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import operationsTemplate from "../../templates/components/operations.hbs?raw"

export class Operations {
  template: TemplateFn
  constructor() {
    this.template = Handlebars.compile(operationsTemplate)
  }
  getList(operationsArray: any[]): string {
    return this.template({
      operations_exists: operationsArray.length > 0,
      operationsItems: operationsArray,
    });
  }
}
