import Handlebars from "handlebars";
import planBalTemplate from "../../templates/components/PlanBalance.hbs?raw";

export class PlanBal {
  constructor() {
    this.template = Handlebars.compile(planBalTemplate);
  }
  getSelf(PlanSum) {
    return this.template({
      PlanSum: PlanSum,
    });
  }
}
