import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import FactBalanceTemplate from "../../templates/components/FactBalance.hbs?raw";
import OperationsTemplate from "../../templates/components/operations.hbs?raw";
import { Operations } from "../operations/index.js";
export class FactBal {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(FactBalanceTemplate);
  }
  getSelf(
    FactSum: number | null,
    PrevFactSum: Array<object>,
    updateFactFortwoWeek: number,
  ): string {
    if (FactSum === null) {
      return this.template({
        is_empty: true,
      });
    }
      let flag = 0;
      if (PrevFactSum.length === 0) {
         flag = 1;
      }

      if (flag !== 1){
          let informationsAboutSign = FactSum > PrevFactSum[0].sum;
          let procents = Math.abs(FactSum / (PrevFactSum[0].sum / 100) - 100).toFixed(1);
          return this.template({
              FactSum: this.shortNumber(FactSum),
              updateFactFortwoWeek: updateFactFortwoWeek,
              hasUpdateFactPlan: informationsAboutSign,
              GetBalance: this.shortNumber(procents),
              is_empty: false,
              existsUpdates: !flag,
          });
      }
      else {
          return this.template({
              FactSum: this.shortNumber(FactSum),
              updateFactFortwoWeek: updateFactFortwoWeek,
              is_empty: false,
              existsUpdates: !flag,
          });
      }


  }
    shortNumber(num: number) {
        const format = new Intl.NumberFormat('ru-RU');

        if (num >= 1_000_000)
            return Math.round(num / 100_000) / 10 + " млн.";

        if (num >= 100_000)
            return Math.round(num / 100) / 10 + " тыc.";

        return format.format(num);
    }
}
