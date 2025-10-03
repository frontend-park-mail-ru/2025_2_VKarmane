import Handlebars from "handlebars";

import type { TemplateFn } from "../../types/handlebars.js";
import CategoryTemplate from "../../templates/components/Category.hbs?raw"


export class Category {
  template: TemplateFn
  constructor() {
    this.template = Handlebars.compile(CategoryTemplate);
  }

  getSelf(category: string, category_name: string) {
    return this.template({ category, category_name });

  }
}
