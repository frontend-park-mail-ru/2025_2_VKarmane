import Handlebars from "handlebars";
import statusTemplate from "../../templates/components/Status.hbs?raw"


export class Status {
  #statusColors = {
    Сбалансировано: "green",
    Превышено: "red",
  };

  constructor() {
    this.template = Handlebars.compile(statusTemplate)
  }

  getSelf(status) {
    return this.template({ color: this.#statusColors[status], status });
  }
}
