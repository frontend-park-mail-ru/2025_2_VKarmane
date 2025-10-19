import { registerHandlebarsHelpers } from "./utils/helpers.js";
import { router } from "./router.js"

import "./index.css";


function startApp() {
  registerHandlebarsHelpers();
  router.loadRoute();
}

startApp();
