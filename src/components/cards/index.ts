import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import cardsTemplate from "../../templates/components/cards.hbs?raw";

export class Card {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(cardsTemplate);
  }
  getSelf(
    id: number,
    balance: number | null,
    hasUpdateFactPlan: boolean,
    updateCardFortwoWeek: number,
    naibolsh_rashod: number,
    action: string,
  ): string {
    if (balance === null) {
      return this.template({ is_empty: true });
    }
    return this.template({
      id: id,
      balance: balance,
      hasUpdateFactPlan: hasUpdateFactPlan,
      has_update_for_2_week: updateCardFortwoWeek,
      naibolsh_rashod: naibolsh_rashod,
      action: action,
      is_empty: false,
    });
  }


}
