import Handlebars from "handlebars";
import serviceItemTemplate from "../../templates/components/serviceItem.hbs?raw"

export class serviceItem {
  constructor() {
    this.template = Handlebars.compile(serviceItemTemplate)
  }
  getSelf(service, date_text, currency, sum) {
    return this.template({
      db_name: service.db_name,
      logo: service.logo,
      name: service.name,
      date_text: date_text,
      sum: sum,
      curr: currency,
    });
  }
}
