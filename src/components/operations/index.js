import Handlebars from "handlebars";
import operationsTemplate from "../../templates/components/operations.hbs?raw"

export class Operations {
  constructor() {
    this.template = Handlebars.compile(operationsTemplate)
  }
  getList(operationsArray) {
    return this.template({
      operations_exists: operationsArray.length > 0,
      operationsItems: operationsArray,
    });
  }
}
