import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import statusTemplate from "../../templates/components/Status.hbs?raw";
import { EnumStatus } from "./enum.js";
export class Status {
  #statusColors = {
    [EnumStatus.Balanced]: "green",
    [EnumStatus.Unbalanced]: "red",
  };
  template: TemplateFn;

  constructor() {
    this.template = Handlebars.compile(statusTemplate);
  }

  getSelf(status: EnumStatus): string {
    return this.template({
      color: this.#statusColors[status],
      status,
    });
  }
}
