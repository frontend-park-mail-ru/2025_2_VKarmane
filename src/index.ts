import { LoginPage } from "./pages/login/Login.js";
import { SignUpPage } from "./pages/signup/Signup.js";
import { MainPage } from "./pages/main/Main.js";
import { ProfilePage } from "./pages/profile/Profile.js";
import { registerHandlebarsHelpers } from "./utils/helpers.js";
import { setWorkers } from "./utils/helpers.js";
import { Router } from "./router/index.js";


import "./index.css";

export const router = new Router({
  "/": renderUserPage,
  "/login": renderLoginPage,
  "/signup": renderSignUpPage,
  "/profile": renderProfilePage,
  "*": renderUserPage,
});

const rootElement: HTMLElement | null = document.getElementById("root");

function renderUserPage(): void {
  if (!rootElement) return;
  const page: MainPage = new MainPage();
  page.render(rootElement);
}

function renderProfilePage(): void {
  if (!rootElement) return;
  const page: ProfilePage = new ProfilePage();
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
  setWorkers();
  router.loadRoute();
}

startApp();
