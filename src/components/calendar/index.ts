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
        
        // Количество дней в месяце
        const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
        
        // Первый день месяца (0-6, где 0 - воскресенье)
        const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
        
        // Корректируем для понедельника как первого дня недели
        let emptyDaysCount = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        
        // Создаем массив дней месяца
        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day: day,
                // Пример: подсвечиваем определенные дни (можно настроить логику)
                highlighted: this.isHighlightedDay(day)
            });
        }

        // Создаем массив пустых ячеек для выравнивания
        const emptyDays = Array(emptyDaysCount).fill({});

        return {
            month: currentMonth,
            days: days,
            emptyDays: emptyDays
        };
    }

    // Метод для определения, нужно ли подсвечивать день
    isHighlightedDay(day: number): boolean {
        // Пример логики - подсвечиваем дни, кратные 5
        // Замените на свою бизнес-логику
        return day % 5 === 0;
        
        // Или можно проверять даты из базы данных/API
        // return this.highlightedDates.includes(day);
    }
}