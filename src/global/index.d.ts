declare module '*.svg';

declare module '*.png';

declare module '*.jpg';

declare module '*.ico';

declare module '*.jpeg';

declare module 'react-syntax-highlighter';

declare module 'markdown-it';

declare module 'react-syntax-highlighter/dist/esm/styles/prism';

declare module '*.md' {
  const content: string;
  export default content;
}
