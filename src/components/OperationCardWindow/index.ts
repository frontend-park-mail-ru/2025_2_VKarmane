import Handlebars from "handlebars";
import TransactionsListTemplate from "../../templates/components/transactionsList.hbs?raw";
import TransactionCardsTemplate from "../../templates/components/Transaction_List_cards.hbs?raw";

export interface OperationItem {
  id: string | number;
  date?: string;
  amount?: number;
  description?: string;
  [key: string]: unknown;
}

export class TransactionsList {
    private template: Handlebars.TemplateDelegate;
    private cardsTemplate: Handlebars.TemplateDelegate;

    constructor() {
        this.template = Handlebars.compile(TransactionsListTemplate);
        this.cardsTemplate = Handlebars.compile(TransactionCardsTemplate);
    }

    public getList(operationsArray: OperationItem[]): string {
        return this.template({
            operations_exists: operationsArray.length > 0,
            transactions: this.cardsTemplate({ operationsItems: operationsArray })
        });
    }

    public getCards(operationsArray: OperationItem[]): string {
        return this.cardsTemplate({ operationsItems: operationsArray });
    }
}
