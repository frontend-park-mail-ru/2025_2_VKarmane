import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import calendarTemplate from "../../templates/components/Calendar.hbs?raw";

export class Calendar {
    #monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    #dayNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

    template: TemplateFn;
    
    constructor() {
        this.template = Handlebars.compile(calendarTemplate);
    }

    getSelf(): string {
        const data = this.getCalendarData();
        return this.template(data);
    }

    getCalendarData() {
        const currentDate = new Date();
        const currentMonth = this.#monthNames[currentDate.getMonth()];
        const currentYear = currentDate.getFullYear();
        const currentMonthIndex = currentDate.getMonth();
        
        const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
        
        let emptyDaysCount = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        
        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day: day,
                highlighted: this.isHighlightedDay(day)
            });
        }

        const emptyDays = Array(emptyDaysCount).fill({});

        return {
            month: currentMonth,
            days: days,
            emptyDays: emptyDays
        };
    }

    isHighlightedDay(day: number): boolean {
        return day % 2 === 0;
    }
}