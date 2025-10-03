import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import CategoryTemplate from "../../templates/components/Category.hbs?raw";

export class Category {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(CategoryTemplate);
  }
  getSelf(color: string, text_color: string, category_name: string): string {
    return this.template({ color, text_color, category_name });
  }
}
