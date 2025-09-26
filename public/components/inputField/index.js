export class InputField {
  getSelf(type, name, text) {
    const template = Handlebars.templates["InputField"];
    return template({ type, name, text });
  }
}
