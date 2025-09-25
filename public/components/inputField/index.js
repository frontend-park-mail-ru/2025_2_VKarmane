export class InputField {
  getSelf(type, name, text) {
    const template = Handlebars.templates["InputField.hbs"];
    return template({ type, name, text });
  }
}
