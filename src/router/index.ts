export class Router {
<<<<<<< HEAD
  routes: Record<string, () => void>;
  constructor(routes: Record<string, () => void>) {
    this.routes = routes;
    window.addEventListener("popstate", () => this.loadRoute());
  }

  navigate(path: string) {
    history.pushState({}, "", path);
    this.loadRoute();
  }


  loadRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes["*"];
    if (route) route();
  }
}
<<<<<<< HEAD

=======
=======
    routes: Record<string, () => void>;
    constructor(routes: Record<string, () => void>) {
        this.routes = routes;
        window.addEventListener("popstate", () => this.loadRoute());
    }

    navigate(path: string) {
        history.pushState({}, "", path);
        this.loadRoute();
    }

    loadRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes["*"];
        if (route) route()
    }
}
>>>>>>> deea218 (router)
>>>>>>> 70dd6d5 (router)
