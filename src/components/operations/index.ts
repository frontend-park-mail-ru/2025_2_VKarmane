import Handlebars from "handlebars";
import operationsTemplate from "../../templates/components/operations.hbs?raw";
import window from "window";

interface Operation {
    id: string | number;
    name: string;
    amount?: number;
    [key: string]: unknown;
}
export class Operations {
    private template: Handlebars.TemplateDelegate;
    constructor(private openPopupCallback: () => void) {
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
