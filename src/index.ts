import { LoginPage } from "./pages/login/Login.js";
import { SignUpPage } from "./pages/signup/Signup.js";
import { MainPage } from "./pages/main/Main.js";
import { registerHandlebarsHelpers } from "./utils/helpers.js";
import { Router } from "./router/index.js";

import "./index.css";

const router = new Router({
  "/": renderUserPage,
  "/login": renderLoginPage,
  "/signup": renderSignUpPage,
  "*": renderUserPage,
});

const rootElement: HTMLElement | null = document.getElementById("root");

function renderUserPage(): void {
  if (!rootElement) return;
  const page: MainPage = new MainPage();
  page.render(rootElement);
}

function renderLoginPage(): void {
  if (!rootElement) return;
  const page: LoginPage = new LoginPage();
  page.render(rootElement);
}

function renderSignUpPage(): void {
  if (!rootElement) return;
  const page: SignUpPage = new SignUpPage();
  page.render(rootElement);
}

function startApp() {
  registerHandlebarsHelpers();
<<<<<<< HEAD
  router.loadRoute();
=======
  // renderUserPage();
  router.loadRoute()
  
>>>>>>> deea218 (router)
}

startApp();

<<<<<<< HEAD
export default router;
=======
export default router

>>>>>>> deea218 (router)
