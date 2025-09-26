export class Card {
    getSelf(balance, hasUpdateFactPlan, updateCardFortwoWeek, updateFactFortwoWeek) {
        const template = Handlebars.templates["cards"];
        return template({
            balance: balance,
            hasUpdateFactPlan: hasUpdateFactPlan,
            updateCardFortwoWeek: updateCardFortwoWeek,
            updateFactFortwoWeek: updateFactFortwoWeek,
        });
    }
}