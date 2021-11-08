declare module '*.jpg';
declare module '*.gif';
declare module '*.png';
declare module '*.html' {
  const content: string;
  export default content;
}
declare module '*.css' {
  const content: string;
  export default content;
}
declare module '*.scss' {
  const content: string;
  export default content;
}
// declare module '*.json' {
//   const content: object;
//   export default content;
// }
