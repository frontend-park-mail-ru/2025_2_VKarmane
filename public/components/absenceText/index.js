export class absenceText {
  getSelf(text, link, linkText) {
    const template = Handlebars.templates["AbsenceText.hbs"];
    return template({ text, link, linkText });
  }
}
