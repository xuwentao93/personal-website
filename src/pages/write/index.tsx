import * as React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './index.less';

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function Write() {
  const methods = {
    handleEditorChange({ html, text }: any) {
      console.log('handleEditorChange', html, text);
    }
  };
  return (
    <div className="personal-write-page">
      <MdEditor
        style={{ height: '500px' }}
        renderHTML={text => mdParser.render(text)}
        onChange={methods.handleEditorChange}
      />
    </div>
  );
}
