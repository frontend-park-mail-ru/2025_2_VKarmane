import { LoginPage } from "./pages/login/Login.js";
import { SignUpPage } from "./pages/Signup/Signup.js";

const rootElement = document.getElementById("root");

export const config = {
  user_page: {
    href: "/",
    render: renderUserPage,
  },
  login: {
    href: "/login",
    render: renderLoginPage,
  },
  signup: {
    href: "/signup",
    render: renderSignUpPage,
  },
};

async function renderUserPage() {
  const a = 1;
  const b = 2;
  // TODO сделать fetch
  if (a !== b) {
    await goToPage(config.login);
    return;
  }
}

async function renderLoginPage() {
  const page = new LoginPage();
  await page.render(rootElement);
}

async function renderSignUpPage() {
  const page = new SignUpPage();
  await page.render(rootElement);
}

export async function goToPage(pageToGo) {
  rootElement.innerHTML = "";
  await pageToGo.render();
}

renderUserPage();
