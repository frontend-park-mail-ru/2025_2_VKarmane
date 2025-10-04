import Handlebars from "handlebars";
import CategoryTemplate from "../../templates/components/Category.hbs?raw"

export class Category {
  constructor() {
    this.template = Handlebars.compile(CategoryTemplate)
  }
  getSelf(color, text_color, category_name) {
    return this.template({ color, text_color, category_name });
  }
}
