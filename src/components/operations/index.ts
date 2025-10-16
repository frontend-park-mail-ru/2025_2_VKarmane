import Handlebars from "handlebars";
import operationsTemplate from "../../templates/components/operations.hbs?raw";
<<<<<<< HEAD

interface Operation {
    id: string | number;
    name: string;
    amount?: number;
    [key: string]: any;
}

export class Operations {
    private template: Handlebars.TemplateDelegate;

    constructor(private openPopupCallback: () => void) {
    this.template = Handlebars.compile(operationsTemplate);
(window as any).openPopups = openPopupCallback.bind(this);
}

getList(operationsArray: Operation[]): string {
    return this.template({
        operations_exists: operationsArray.length > 0,
        operationsItems: operationsArray,
    });
}
}
=======
export class Operations {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(operationsTemplate);
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
>>>>>>> origin/main
