export class Status {
  #statusColors = {
    Сбалансировано: "green",
    Превышено: "red",
  };

  getSelf(status) {
    const template = Handlebars.templates["Status.hbs"];
    return template({ color: this.#statusColors[status], status });
  }
}
