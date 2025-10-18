declare module "*.hbs" {
  const content: string;
  export default content;
}
declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

declare module "window" {
    interface Window {
        openPopups: () => void;
    }

    const window: Window;
    export default window;
}