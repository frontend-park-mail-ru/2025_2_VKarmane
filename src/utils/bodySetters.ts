export function setBody() {
  document.body.classList.remove("hide-scroller");
  document.body.classList.add("body_background");
}
export function unsetBody(): void {
  document.body.classList.add("hide-scroller");
  document.body.classList.remove("body_background");
}
