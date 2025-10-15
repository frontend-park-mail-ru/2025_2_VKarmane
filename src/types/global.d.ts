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
