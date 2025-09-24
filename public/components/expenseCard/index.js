import { Status } from "../Status/index.js";

export class ExpenseCard {
  getSelf(currency, sum, text, gotStatus = "") {
    const template = Handlebars.templates["ExpenseCard.hbs"];
    let status = "";
    if (gotStatus) {
      console.log(gotStatus);
      status = new Status().getSelf(gotStatus);
    }
    const formated = sum.toLocaleString("ru-RU");
    return template({ currency, formated, text, status });
  }
}
