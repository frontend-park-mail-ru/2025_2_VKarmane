import Handlebars from "handlebars";
import CategoryTemplate from "../../templates/components/Category.hbs?raw";

export class Category {
  constructor() {
    this.template = Handlebars.compile(CategoryTemplate);
  }
  getSelf(category, category_name) {
    return this.template({ category, category_name });
  }
}
