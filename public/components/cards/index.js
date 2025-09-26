export class Card {
    getSelf(balance, hasUpdateFactPlan, updateCardFortwoWeek,) {
        const template = Handlebars.templates["cards"];
        return template({
            balance: balance,
            hasUpdateFactPlan : hasUpdateFactPlan,
            has_update_for_2_week : updateCardFortwoWeek,
        });
    }
}