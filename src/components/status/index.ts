import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import statusTemplate from "../../templates/components/Status.hbs?raw";
import { EnumBalanceStatus } from "./enum.js";
export class Status {
  #statusBalanceColors = {
    [EnumBalanceStatus.Balanced]: "green",
    [EnumBalanceStatus.Unbalanced]: "red",
  };
  template: TemplateFn;

  constructor() {
    this.template = Handlebars.compile(statusTemplate);
  }


  getSelf(status: EnumBalanceStatus): string {
    return this.template({
      color: this.#statusBalanceColors[status],
      status,
    });
  }
}
