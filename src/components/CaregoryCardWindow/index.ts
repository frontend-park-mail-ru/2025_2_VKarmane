import Handlebars from "handlebars";
import CategoriesListTemplate from "../../templates/components/categoriesList.hbs?raw";
import { apiFetch } from "../../api/fetchWrapper.js";

interface Category {
    id: string | number;
    name: string;
    [key: string]: unknown;
}

interface MetricData {
    label: string;
    value: number;
    color: string;
}

export class CategoriesList {
    private template: Handlebars.TemplateDelegate;
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.template = Handlebars.compile(CategoriesListTemplate);
    }


    async getList(categories: Category[]): Promise<string> {
        const metrics = await this.loadMetrics();
        const total = metrics.reduce((a, b) => a + b.value, 0);
        return this.template({
            categories_exists: categories.length > 0,
            categoriesItems: categories,
            metrics_exists: total > 0,
        });
    }

    async afterRender() {
        const metrics = await this.loadMetrics();
        const total = metrics.reduce((a, b) => a + b.value, 0);

        if (total > 0) {
            this.drawDonut(metrics);
        }
    }





    /** Загружаем данные отчёта */
    private async loadMetrics(): Promise<MetricData[]> {
        try {
            const today = new Date();
            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);

            const params = new URLSearchParams({
                start: lastMonth.toISOString().split("T")[0],
                end: today.toISOString().split("T")[0],
            });

            const res = await apiFetch(`/categories/report?${params}`);

            return (res.data.categoires || []).map((cat, i) => ({
                label: cat.category_name,
                value: cat.total_sum,
                color: [
                    "#90ee90",
                    "#ff69b4",
                    "#ffd580",
                    "#7efcff",
                    "#ffa500",
                    "#00ced1",
                ][i % 6],
            }));
        } catch (e) {
            console.error("Ошибка загрузки метрик", e);
            return [];
        }
    }

    /** Рисуем donut */
    private drawDonut(data: MetricData[]) {
        const canvas = this.container.querySelector(
            "#donutChart"
        ) as HTMLCanvasElement;

        const legendContainer = this.container.querySelector(".legend");
        const centerText = this.container.querySelector(".center-text");
        const ctx = canvas.getContext("2d");

        const total = data.reduce((a, b) => a + b.value, 0);
        centerText.textContent = `${this.shortNumber(total)} ₽`;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;
        const thickness = 20;
        const gap = 0.25;

        let startAngle = -Math.PI / 2;

        data.forEach((segment) => {
            const angle = (segment.value / total) * 2 * Math.PI;

            const from = startAngle + gap / 2;
            const to = startAngle + angle - gap / 2;

            if (to > from) {
                ctx.beginPath();
                ctx.strokeStyle = segment.color;
                ctx.lineWidth = thickness;
                ctx.lineCap = "round";
                ctx.arc(centerX, centerY, radius, from, to);
                ctx.stroke();
            }

            startAngle += angle;
        });

        legendContainer.innerHTML = "";
        data.forEach((segment) => {
            const item = document.createElement("div");
            item.className = "legend-item";

            const color = document.createElement("div");
            color.className = "color-box";
            color.style.backgroundColor = segment.color;

            item.appendChild(color);
            item.append(segment.label);

            legendContainer.appendChild(item);
        });
    }

    private shortNumber(num: number) {
        if (num >= 1_000_000) return Math.round(num / 100_000) / 10 + " млн.";
        if (num >= 100_000) return Math.round(num / 100) / 10 + " тыс.";
        return new Intl.NumberFormat("ru-RU").format(num);
    }
}
