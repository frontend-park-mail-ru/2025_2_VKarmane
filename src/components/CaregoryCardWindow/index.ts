import Handlebars from "handlebars";
import CategoriesListTemplate from "../../templates/components/categoriesList.hbs?raw";

// Интерфейс для категории (можно расширять по твоей структуре)
interface Category {
  id: string | number;
  name: string;
  [key: string]: unknown; // Для любых дополнительных полей
}

export class CategoriesList {
  private template: Handlebars.TemplateDelegate;

  constructor() {
    this.template = Handlebars.compile(CategoriesListTemplate);
  }

  getList(CategoriesArray: Category[]): string {
    return this.template({
      categories_exists: CategoriesArray.length > 0,
      categoriesItems: CategoriesArray,
    });
  }
}
