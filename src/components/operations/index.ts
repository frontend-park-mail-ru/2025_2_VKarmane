import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import operationsTemplate from "../../templates/components/operations.hbs?raw";

export class Operations {
  template: TemplateFn;
  constructor(openPopupCallback: () => void) {
    this.template = Handlebars.compile(operationsTemplate);
      window.openPopups = openPopupCallback.bind(this);
  }

    getList(
        operationsArray: unknown[] = [],
        with_button: boolean = true,
    ): string {
        return this.template({
            operations_exists: operationsArray.length > 0,
            operationsItems: operationsArray,
            with_button: with_button,
        });
    }
}
