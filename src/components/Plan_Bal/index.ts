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
      PlanSum: PlanSum,
      is_empty: false,
    });
  }
}
