import { LoginPage } from "./pages/login/Login.js";
import { SignUpPage } from "./pages/signup/Signup.js";
import { MainPage } from "./pages/main/Main.js";
import { registerHandlebarsHelpers } from "./utils/helpers.js";
import { router } from "./router/index.js";

import "./index.css";



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

router.routes["/"] = renderUserPage;
router.routes["/login"] = renderLoginPage;
router.routes["/signup"] = renderSignUpPage;
router.routes["*"] = renderUserPage;


function startApp() {
  registerHandlebarsHelpers();
  router.loadRoute();
}

startApp();

