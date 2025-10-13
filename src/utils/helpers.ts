import Handlebars from "handlebars";
export function registerHandlebarsHelpers() {
  Handlebars.registerHelper("not", function (value) {
    return !value;
  });

}
