import Handlebars from "handlebars";
import CardListTemplate from "../../templates/components/cards_list.hbs?raw";


export class CardList {
    private template: Handlebars.TemplateDelegate;

    constructor() {
        this.template = Handlebars.compile(CardListTemplate);
    }

    getList(CategoriesArray : any): string {
        return this.template({
            cards_exists: CategoriesArray.length > 0,
            cardsItems: CategoriesArray,
        });
    }
}
