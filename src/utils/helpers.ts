import Handlebars from "handlebars";
import CarouselTemplate from "../templates/components/Carousel.hbs?raw"
export function registerHandlebarsHelpers() {
  Handlebars.registerHelper("not", function (value) {
    return !value;
  });

  Handlebars.registerPartial("carousel", CarouselTemplate);
}
