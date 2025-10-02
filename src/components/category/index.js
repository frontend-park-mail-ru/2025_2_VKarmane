export class Category {

  getSelf(category, category_name) {
    const template = Handlebars.templates["Category"];
    return template({ category, category_name });

  }
}
