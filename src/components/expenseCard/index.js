import { Status } from "../status/index.js";

import Handlebars from "handlebars";
import CategoryTemplate from "../../templates/components/ExpenseCard.hbs?raw";

export class ExpenseCard {
  constructor() {
    this.template = Handlebars.compile(CategoryTemplate);
  }
  getSelf(currency, sum, text, gotStatus = "") {
    let status = "";
    if (gotStatus) {
      status = new Status().getSelf(gotStatus);
    }
    const formated = sum.toLocaleString("ru-RU");
    return this.template({ currency, formated, text, status });
  }
}
