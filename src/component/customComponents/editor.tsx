// src/components/TinyEditor.tsx
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyEditorProps {
  value: string;
  onEditorChange: (content: string) => void;
  apiKey?: string;
  initOptions?: Record<string, any>;
}

const TinyEditor: React.FC<TinyEditorProps> = ({
  value,
  onEditorChange,
  apiKey = 'e8s9s316dsthhk6lmkr890vi0rgaet87553nfoz34fry0yho', 
  initOptions = {},
}) => {
  return (
    <Editor
      apiKey={apiKey}
      value={value}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | help',
        ...initOptions,
      }}
      onEditorChange={onEditorChange}
    />
  );
};

export default TinyEditor;
