declare module '*.svg';

declare module '*.png';

declare module '*.jpg';

declare module '*.ico';

declare module '*.jpeg';

declare module 'markdown-it';

declare module '*.md' {
  const content: string;
  export default content;
}
