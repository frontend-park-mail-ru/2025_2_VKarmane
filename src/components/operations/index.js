export class Operations {
  getList(operationsArray) {
    const template = Handlebars.templates["operations"];
    return template({
      operations_exists: operationsArray.length > 0,
      operationsItems: operationsArray,
    });
  }
}
