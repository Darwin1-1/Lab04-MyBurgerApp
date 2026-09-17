declare module "*.jsx" {
  const component: () => import("react").JSX.Element;
  export default component;
}
