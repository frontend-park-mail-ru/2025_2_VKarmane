export class Informer {
  getSelf(text) {
    const template = Handlebars.templates["Informer"];
    return template({ text });
  }
}
