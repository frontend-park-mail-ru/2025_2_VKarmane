import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import statusTemplate from "../../templates/components/Status.hbs?raw";

export class Status {
  #statusColors = {
    Сбалансировано: "green",
    Превышено: "red",
  };
  template: TemplateFn;

  constructor() {
    this.template = Handlebars.compile(statusTemplate);
  }

  getSelf(status: string): string {
    return this.template({
      color: this.#statusColors[status as "Сбалансировано" | "Превышено"],
      status,
    });
  }
}
