import Handlebars from "handlebars";
import redactOperations from "../../templates/components/redactOperForm.hbs?raw";

declare global {
    interface Window {
        handleOperationTypeChange?: () => void;
    }
}

export class redactOpers {
    template: Handlebars.TemplateDelegate;

    constructor(
        ClosePopupCallback: () => void,
        handleOperationTypeChange: () => void
    ) {
        this.template = Handlebars.compile(redactOperations);
        window.closeEditPopup = ClosePopupCallback.bind(this);
        window.handleOperationTypeChange = handleOperationTypeChange.bind(this);
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }
}
