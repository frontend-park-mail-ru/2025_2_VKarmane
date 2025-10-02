export class Category {
  getSelf(color, text_color,  category_name) {
    const template = Handlebars.templates["Category"];
    return template({ color, text_color, category_name });
  }
}
