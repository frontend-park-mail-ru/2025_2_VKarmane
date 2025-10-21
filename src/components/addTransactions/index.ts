import Handlebars from "handlebars";
import AddOperTemplate from "../../templates/components/addOperForm.hbs?raw";

declare global {
  interface Window {
    handleOperationTypeChange?: () => void;
  }
}

export class AddOperation {
  template: Handlebars.TemplateDelegate;

  constructor(
    ClosePopupCallback: () => void,
    handleOperationTypeChange: () => void,
  ) {
    this.template = Handlebars.compile(AddOperTemplate);
    window.closePopup = ClosePopupCallback.bind(this);
    window.handleOperationTypeChange = handleOperationTypeChange.bind(this);
  }

  getSelf(): Handlebars.TemplateDelegate {
    return this.template;
  }
}
