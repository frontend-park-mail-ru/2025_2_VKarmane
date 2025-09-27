export class Card {
    getSelf(balance, hasUpdateFactPlan, updateCardFortwoWeek, naibolsh_rashod,action) {
        const template = Handlebars.templates["cards"];
        return template({
            balance: balance,
            hasUpdateFactPlan : hasUpdateFactPlan,
            has_update_for_2_week : updateCardFortwoWeek,
            naibolsh_rashod: naibolsh_rashod,
            action: action,
        });
    }
}