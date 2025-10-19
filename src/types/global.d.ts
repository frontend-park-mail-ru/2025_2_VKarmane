declare module "*.hbs" {
  const content: string;
  export default content;
}
declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

declare global {
    interface Window {
        openPopups: () => void;
    }
}

export {};