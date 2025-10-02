import Handlebars from "handlebars";
import CategoryTemplate from "../../templates/components/Category.hbs?raw";

export class Category {
<<<<<<< HEAD
  constructor() {
    this.template = Handlebars.compile(CategoryTemplate);
  }
  getSelf(category, category_name) {
    return this.template({ category, category_name });
=======
  getSelf(color, text_color,  category_name) {
    const template = Handlebars.templates["Category"];
    return template({ color, text_color, category_name });
>>>>>>> 27fa6ce (chart-circle login style fixes)
  }
}
