import { LoginPage } from "./pages/login/Login.js";
import { SignUpPage } from "./pages/signup/Signup.js";

const rootElement = document.getElementById("root");

export const config = {
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

function renderUserPage() {
  const a = 1;
  const b = 2;
  // TODO сделать fetch
  if (a !== b) {
    goToPage(config.login);
    return;
  }
}

function renderLoginPage() {
  const page = new LoginPage();
  page.render(rootElement);
}

function renderSignUpPage() {
  const page = new SignUpPage();
  page.render(rootElement);
}

export function goToPage(pageToGo) {
  rootElement.innerHTML = "";
  pageToGo.render();
}

renderUserPage();
