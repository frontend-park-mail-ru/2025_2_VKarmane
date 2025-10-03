import Handlebars from "handlebars"
import type { TemplateFn } from "../../types/handlebars.js";
import serviceItemTemplate from "../../templates/components/serviceItem.hbs?raw"

export class serviceItem {
  template: TemplateFn
  constructor() {
    this.template = Handlebars.compile(serviceItemTemplate);
  }
  getSelf(service: Record<string, string>, date_text: string, currency: string, sum: number): string {
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
