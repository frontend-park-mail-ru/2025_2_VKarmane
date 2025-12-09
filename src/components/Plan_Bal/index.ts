import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import planBalTemplate from "../../templates/components/PlanBalance.hbs?raw";

export class PlanBal {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(planBalTemplate);
  }
  getSelf(PlanSum: number | null): string {
    if (PlanSum === null) {
      return this.template({
        is_empty: true,
      });
    }
    return this.template({
      PlanSum: this.shortNumber(PlanSum),
      is_empty: false,
    });
  }
    shortNumber(num: number) {
        if (num >= 1_000_000)
            return Math.round(num / 100_000) / 10 + " млн";
        if (num >= 100_000)
            return Math.round(num / 100) / 10 + " тыс";
        return num;
    }
}
