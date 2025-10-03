import { Status } from "../status/index.js";
import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import CategoryTemplate from "../../templates/components/ExpenseCard.hbs?raw";

export class ExpenseCard {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(CategoryTemplate);
  }
  getSelf(
    currency: string,
    sum: number,
    text: string,
    gotStatus: string = "",
  ): string {
    let status = "";
    if (gotStatus) {
      status = new Status().getSelf(gotStatus);
    }
    const formated = sum.toLocaleString("ru-RU");
    return this.template({ currency, formated, text, status });
  }
}
