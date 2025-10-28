import Handlebars from "handlebars";
import RedactCategoryTemplate from "../../templates/components/redactCategory.hbs?raw";

export class RedactCategory {
    private template: Handlebars.TemplateDelegate;

    constructor() {
        this.template = Handlebars.compile(RedactCategoryTemplate);
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }
}
