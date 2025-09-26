export class PlanBal {
    getSelf(PlanSum) {
        const template = Handlebars.templates["PlanBalance"];
        return template({
            PlanSum : PlanSum,
        });
    }
}
