import { LoginPage } from "./pages/login/Login.js";
import { SignUpPage } from "./pages/signup/Signup.js";
import { MainPage } from "./pages/main/Main.js";
import { ProfilePage } from "./pages/profile/Profile.js";
import { registerHandlebarsHelpers } from "./utils/helpers.js";
import { Router } from "./router/index.js";

import "./index.css";

const router = new Router({
  "/": renderUserPage,
  "/login": renderLoginPage,
  "/signup": renderSignUpPage,
  "/profile": renderProfilePage,
  "*": renderUserPage, 
});

const rootElement: HTMLElement | null = document.getElementById("root");

type PageClas = { render: (container?: HTMLElement) => void };

interface PageConfig {
  href: string;
  render: () => void;
}

export const config: Record<string, PageConfig> = {
  user_page: {
    href: "/",
    render: renderUserPage,
  },
  login: {
    href: "/api/v1/login",
    render: renderLoginPage,
  },
  signup: {
    href: "/api/v1/register",
    render: renderSignUpPage,
  },
};

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

function renderProfilePage(): void {
  if (!rootElement) return;
  const page: ProfilePage = new ProfilePage();
  page.render(rootElement);
}

function renderSignUpPage(): void {
  if (!rootElement) return;
  const page: SignUpPage = new SignUpPage();
  page.render(rootElement);
}

export function goToPage(pageToGo: PageClas): void {
  if (!rootElement) return;
  rootElement.innerHTML = "";
  pageToGo.render();
}


function startApp() {
  registerHandlebarsHelpers();
  // renderUserPage();
  router.loadRoute()
  
}

startApp();

export default router

