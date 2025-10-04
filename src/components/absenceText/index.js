import Handlebars from "handlebars";
import asbTextTemplate from "../../templates/components/AbsenceText.hbs?raw"


export class absenceText {
  constructor(){
    this.template = Handlebars.compile(asbTextTemplate)
  }
  getSelf(text, link, linkText) {
    return this.template({ text, link, linkText });
  }
}
