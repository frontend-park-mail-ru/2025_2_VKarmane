import Handlebars from "handlebars";
export function registerHandlebarsHelpers() {
  Handlebars.registerHelper("not", function (value) {
    return !value;
  });

}

export function setWorkers() {
  if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log(`SW succesfully registered: ${reg}`)
      }).catch(err => {
        console.log(`An error occured: ${err}`);
      })
    })
  }
}