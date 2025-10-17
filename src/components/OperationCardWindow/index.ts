import Handlebars from "handlebars";
import TransactionsListTemplate from "../../templates/components/transactionsList.hbs?raw";

export interface OperationItem {
    id: string | number;
    date?: string;
    amount?: number;
    description?: string;
    [key: string]: unknown;
}

export class TransactionsList {
    private template: Handlebars.TemplateDelegate;

    constructor() {
        this.template = Handlebars.compile(TransactionsListTemplate);
    }

    public getList(operationsArray: OperationItem[]): string {
        return this.template({
            operations_exists: operationsArray.length > 0,
            operationsItems: operationsArray,
        });
    }
}
