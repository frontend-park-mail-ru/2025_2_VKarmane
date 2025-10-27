import Handlebars from "handlebars";
import AddCategoryTemplate from "../../templates/components/addCategory.hbs?raw";

export class AddCategory {
  private template: Handlebars.TemplateDelegate;

  constructor() {
    this.template = Handlebars.compile(AddCategoryTemplate);
  }

  getSelf(): Handlebars.TemplateDelegate {
    return this.template;
  }
}
