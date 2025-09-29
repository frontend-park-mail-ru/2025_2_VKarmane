export class StartButton {
  getSelf(form, text) {
    const template = Handlebars.templates["StartButton"];
    return template({ form, text });
  }
}
