export class Router {
    routes: Record<string, () => void>;
    private events: { [key: string]: Array<(data?: any) => void> } = {};

    constructor(routes: Record<string, () => void>) {
        this.routes = routes;
        window.addEventListener("popstate", () => this.loadRoute());
        this.loadRoute();
    }

    on(event: string, callback: (data?: any) => void): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    private emit(event: string, data?: any): void {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    navigate(path: string) {
        const previousPath = window.location.pathname;
        this.emit('beforeNavigate', {
            from: previousPath,
            to: path
        });

        history.pushState({}, "", path);
        this.loadRoute();

        // Вызываем событие после навигации
        this.emit('afterNavigate', {
            from: previousPath,
            to: path
        });
    }

    loadRoute() {
        const path = window.location.pathname;

        // Вызываем событие перед загрузкой роута
        this.emit('beforeRouteLoad', { path });

        const route = this.routes[path] || this.routes["*"];
        if (route) {
            route();
            this.emit('afterRouteLoad', { path });
        } else {
            console.error(`No route found for path: ${path}`);
        }
    }

    getCurrentPath(): string {
        return window.location.pathname;
    }

    back(): void {
        history.back();
    }

    forward(): void {
        history.forward();
    }

    reload(): void {
        this.loadRoute();
    }

    addRoute(path: string, handler: () => void): void {
        this.routes[path] = handler;
    }

    removeRoute(path: string): void {
        delete this.routes[path];
    }
}