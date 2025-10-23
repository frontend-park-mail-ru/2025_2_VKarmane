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
        .then((reg) => {
          console.log(`SW succesfully registered: ${reg}`);
        })
        .catch((err) => {
          console.log(`An error occured: ${err}`);
        });
    });
  }
}

export function convertToISO(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toISOString();
}
