import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import FactBalanceTemplate from "../../templates/components/FactBalance.hbs?raw";
import OperationsTemplate from "../../templates/components/operations.hbs?raw";
import { Operations } from "../operations/index.js";
export class FactBal {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(FactBalanceTemplate)

  }
  getSelf(
    FactSum: number | null,
    PrevFactSum: number,
    updateFactFortwoWeek: number,
  ): string {
    if (FactSum === null) {
      return this.template({
        is_empty: true,
      });
    }
    let informationsAboutSign = updateFactFortwoWeek > 0;
    let procents = Math.abs(FactSum / (PrevFactSum / 100) - 100).toFixed(1);
    return this.template({
      FactSum: FactSum,
      updateFactFortwoWeek: updateFactFortwoWeek,
      hasUpdateFactPlan: informationsAboutSign,
      GetBalance: procents,
      is_empty: false,
    });
  }
}
