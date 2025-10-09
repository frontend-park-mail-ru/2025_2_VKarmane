export class Router {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 636d589 (style fixes)
  routes: Record<string, () => void>;
  constructor(routes: Record<string, () => void>) {
    this.routes = routes;
    window.addEventListener("popstate", () => this.loadRoute());
  }
<<<<<<< HEAD

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
=======
    routes: Record<string, () => void>;
    constructor(routes: Record<string, () => void>) {
        this.routes = routes;
        window.addEventListener("popstate", () => this.loadRoute());
    }
=======
>>>>>>> 636d589 (style fixes)

  navigate(path: string) {
    history.pushState({}, "", path);
    this.loadRoute();
  }

<<<<<<< HEAD
    loadRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes["*"];
        if (route) route()
    }
}
>>>>>>> deea218 (router)
=======
  loadRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes["*"];
    if (route) route();
  }
}
>>>>>>> 636d589 (style fixes)
