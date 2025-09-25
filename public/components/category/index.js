export class Category {
  getSelf(color, category_name) {
    const template = Handlebars.templates["Category.hbs"];
    return template({ color, category_name });
  }
}
