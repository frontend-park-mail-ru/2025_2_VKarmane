export class StartButton {
  getSelf(form, text) {
    const template = Handlebars.templates["StartButton.hbs"];
    return template({ form, text });
  }
}
