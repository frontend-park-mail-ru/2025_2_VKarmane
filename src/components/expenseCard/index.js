import { Status } from "../status/index.js";

export class ExpenseCard {
  getSelf(currency, sum, text, gotStatus = "") {
    const template = Handlebars.templates["ExpenseCard"];
    let status = "";
    if (gotStatus) {
      status = new Status().getSelf(gotStatus);
    }
    const formated = sum.toLocaleString("ru-RU");
    return template({ currency, formated, text, status });
  }
}
