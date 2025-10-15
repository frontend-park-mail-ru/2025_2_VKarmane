import Handlebars from "handlebars";
import TransactionsListTemplate from "../../templates/components/transactionsList.hbs?raw";

export class TransactionsList {
    constructor() {
        this.template = Handlebars.compile(TransactionsListTemplate);
    }
    getList(operationsArray) {
        return this.template({
            operations_exists: operationsArray.length > 0,
            operationsItems: operationsArray,
        });
    }

}
