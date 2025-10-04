import Handlebars from "handlebars";
import cardsTemplate from "../../templates/components/cards.hbs?raw"


export class Card {
  constructor() {
    this.template = Handlebars.compile(cardsTemplate)
  }
  getSelf(
    balance,
    hasUpdateFactPlan,
    updateCardFortwoWeek,
    naibolsh_rashod,
    action,
  ) {
    return this.template({
      balance: balance,
      hasUpdateFactPlan: hasUpdateFactPlan,
      has_update_for_2_week: updateCardFortwoWeek,
      naibolsh_rashod: naibolsh_rashod,
      action: action,
    });
  }
}
