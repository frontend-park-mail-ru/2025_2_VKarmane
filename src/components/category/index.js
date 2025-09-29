export class Category {
  getSelf(color, category_name) {
    const template = Handlebars.templates["Category"];
    return template({ color, category_name });
  }
}
