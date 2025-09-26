export class PlanBal {
    getSelf(PlanSum) {
        const template = Handlebars.templates["FactBalance"];
        return template({
            PlanSum : PlanSum,
        });
    }
}
