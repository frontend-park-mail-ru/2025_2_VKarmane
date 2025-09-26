export class serviceItem {
  getSelf(service, date_text, currency, sum) {
    const template = Handlebars.templates["serviceItem"];
    return template({
      db_name: service.db_name,
      logo: service.logo,
      name: service.name,
      date_text: date_text,
      sum: sum,
      curr: currency,
    });
  }
}
