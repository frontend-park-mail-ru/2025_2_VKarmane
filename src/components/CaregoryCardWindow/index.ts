import Handlebars from "handlebars";
import CategoriesListTemplate from "../../templates/components/categoriesList.hbs?raw";
import {apiFetch} from "../../api/fetchWrapper.js";
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend);


interface Category {
  id: string | number;
  name: string;
  [key: string]: unknown;
}

export class CategoriesList {
  private template: Handlebars.TemplateDelegate;
    private container: HTMLElement;
    constructor(container: HTMLElement) {
        this.container = container;
    this.template = Handlebars.compile(CategoriesListTemplate);
  }

  getList(CategoriesArray: Category[]): string {
    return this.template({
      categories_exists: CategoriesArray.length > 0,
      categoriesItems: CategoriesArray,
    });
  }

    async setEvents() {
        const canvas = this.container.querySelector('#donutChart');
        const legendContainer = this.container.querySelector('.legend');
        const ctx = canvas.getContext('2d');

        try {
            const today = new Date();

            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);

            const periodStart = lastMonth.toISOString().split('T')[0];
            const periodEnd = today.toISOString().split('T')[0];

            const params = new URLSearchParams({
                start: periodStart,
                end: periodEnd,
            });

            const url = `/categories/report?${params.toString()}`;

            const categories = await apiFetch(url);
            const data = categories.data.categoires.map((cat, i) => ({
                label: cat.category_name,
                value: cat.total_sum,
                color: ['#90ee90', '#ff69b4', '#ffd580', '#7efcff', '#ffa500', '#00ced1'][i % 6],
            }));

            const totalSum = data.reduce((acc, cur) => acc + cur.value, 0);
            const centerText = this.container.querySelector('.center-text');
            centerText.textContent = `${this.shortNumber(totalSum)} ₽`;

            const total = data.reduce((acc, cur) => acc + cur.value, 0);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 100;
            const thickness = 20;

            const gap = 0.25;
            let startAngle = -Math.PI / 2;

            data.forEach(segment => {
                const segmentAngle = (segment.value / total) * 2 * Math.PI;

                const from = startAngle + gap / 2;
                const to   = startAngle + segmentAngle - gap / 2;

                if (to > from) {
                    ctx.beginPath();
                    ctx.strokeStyle = segment.color;
                    ctx.lineWidth = thickness;
                    ctx.lineCap = 'round';
                    ctx.arc(centerX, centerY, radius, from, to);
                    ctx.stroke();
                }

                startAngle += segmentAngle;
            });

            legendContainer.innerHTML = ''; // очищаем старую легенду

            data.forEach(segment => {
                const item = document.createElement('div');
                item.classList.add('legend-item');

                const colorBox = document.createElement('div');
                colorBox.classList.add('color-box');
                colorBox.style.backgroundColor = segment.color;

                item.appendChild(colorBox);
                item.appendChild(document.createTextNode(segment.label));

                legendContainer.appendChild(item);
            });

        } catch (err) {
            console.error('Ошибка при загрузке категорий:', err);
        }
    }
    shortNumber(num: number) {
        const format = new Intl.NumberFormat('ru-RU');

        if (num >= 1_000_000)
            return Math.round(num / 100_000) / 10 + " млн.";

        if (num >= 100_000)
            return Math.round(num / 100) / 10 + " тыc.";

        return format.format(num);
    }








}
