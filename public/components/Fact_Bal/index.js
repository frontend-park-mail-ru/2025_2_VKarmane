export class FactBal {
    getSelf(FactSum, PrevFactSum,updateFactFortwoWeek) {
        const template = Handlebars.templates["FactBalance"];
        var informationsAboutSign = updateFactFortwoWeek > 0;
        var procents = Math.abs(FactSum / (PrevFactSum / 100) - 100).toFixed(1);
        return template ({
            FactSum : FactSum,
            updateFactFortwoWeek : updateFactFortwoWeek,
            hasUpdateFactPlan : informationsAboutSign,
            GetBalance : procents,
        });
    }
}
