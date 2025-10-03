import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import FactBalanceTemplate from "../../templates/components/FactBalance.hbs?raw"


export class FactBal {
  template: TemplateFn
  constructor() {
    this.template = Handlebars.compile(FactBalanceTemplate)
  }
  getSelf(FactSum: number, PrevFactSum: number, updateFactFortwoWeek: number): string {
    let informationsAboutSign = updateFactFortwoWeek > 0;
    let procents = Math.abs(FactSum / (PrevFactSum / 100) - 100).toFixed(1);
    return this.template({
      FactSum: FactSum,
      updateFactFortwoWeek: updateFactFortwoWeek,
      hasUpdateFactPlan: informationsAboutSign,
      GetBalance: procents,
    });
  }
}
