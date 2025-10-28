import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import type { TransactionIntefrace } from "../../schemas/index.js";
import calendarTemplate from "../../templates/components/Calendar.hbs?raw";

export class Calendar {
  #monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  #dayNames = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

  template: TemplateFn;

  constructor() {
    this.template = Handlebars.compile(calendarTemplate);
  }

  getSelf(transactions: TransactionIntefrace[]): string {
    const data = this.getCalendarData(transactions);
    return this.template(data);
  }

  getCalendarData(transactions: TransactionIntefrace[]) {
    const currentDate = new Date();
    const currentMonth = this.#monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();

    const daysInMonth = new Date(
      currentYear,
      currentMonthIndex + 1,
      0,
    ).getDate();
    const firstDayOfMonth = new Date(
      currentYear,
      currentMonthIndex,
      1,
    ).getDay();

    const emptyDaysCount = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    console.log(transactions);
    const currentMonthTransactions = transactions.filter((t) => {
      const d = new Date(t.date);
      console.log(
        d.getMonth(),
        currentMonthIndex,
        d.getFullYear(),
        currentYear,
      );
      return (
        d.getMonth() === currentMonthIndex && d.getFullYear() === currentYear
      );
    });
    console.log(currentMonthTransactions);

    const daySums = this.getTransactionsByDay(currentMonthTransactions);
    const maxSum = Math.max(0, ...Object.values(daySums));

    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const sum = daySums[day] || 0;
      const color = this.getColorForSum(sum, maxSum);
      days.push({
        day: day,
        color: color,
        sum: sum,
      });
    }

    const emptyDays = Array(emptyDaysCount).fill({});

    return {
      month: currentMonth,
      days: days,
      emptyDays: emptyDays,
    };
  }

  getTransactionsByDay(
    transactions: TransactionIntefrace[],
  ): Record<number, number> {
    const daySums: Record<number, number> = {};
    transactions.forEach((t) => {
      console.log(`date: ${new Date(t.date)} `);
      const date = new Date(t.date);
      const day = date.getDate();
      console.log(`day: ${day} `);
      daySums[day] = (daySums[day] || 0) + t.sum;
    });
    console.log(daySums);

    return daySums;
  }

  getColorForSum(sum: number, maxSum: number): string {
    console.log(sum);
    if (!sum) return "#f6f6f8";

    const minColor = [255, 215, 194];
    const maxColor = [235, 91, 29];

    const ratio = Math.min(sum / maxSum, 1);

    const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * ratio);
    const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * ratio);
    const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  }
}
