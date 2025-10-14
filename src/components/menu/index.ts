import Handlebars from "handlebars";
import menuTemplate from "../../templates/components/menu.hbs?raw";
import { config, goToPage } from "../../index.js";

// Определяем тип для окна с кастомными свойствами
declare global {
    interface Window {
        gotoPage?: typeof goToPage;
        config?: typeof config;
    }
}

export class Menu {
    private template: Handlebars.TemplateDelegate;

    constructor() {
        this.template = Handlebars.compile(menuTemplate);
        window.gotoPage = goToPage.bind(this);
        window.config = config;
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }
}
