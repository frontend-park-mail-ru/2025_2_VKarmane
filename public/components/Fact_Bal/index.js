export class FactBal {
    getSelf(FactSum, PrevFactSum,updateFactFortwoWee) {
        const template = Handlebars.templates["FactBalance"];
        var informationsAboutSign = updateFactFortwoWee > 0;
        var procents = (FactSum / (PrevFactSum / 100)) - 100
        return template ({
            FactSum : FactSum,
            GetBalance: informationsAboutSign,
            updateFactFortwoWeek : procents
        });
    }
}
