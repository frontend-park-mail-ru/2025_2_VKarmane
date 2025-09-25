export class absenceText {
  getSelf(text, link, linkText) {
    const template = Handlebars.templates["AbsenceText"];
    return template({ text, link, linkText });
  }
}
