declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.gif";
declare module "*.svg";
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}