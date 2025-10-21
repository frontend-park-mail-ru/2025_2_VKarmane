declare module "*.hbs" {
  const content: string;
  export default content;
}
declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "window" {
  declare global {
    interface Window {
      openPopups: () => void;
    }
  }

  const window: Window;
  export default window;
}
