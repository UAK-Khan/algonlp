import React from 'react';
import ReactQuill from 'react-quill';

type PropTypes = {
  value?: string,
  onChange?: (value: string) => void;
  placeholder?: string,
}

// todo: add more options, like font sizes, colors and all useful items
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'code'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'code',
  'align'
];

const QuillEditorComp = ({ value, onChange, placeholder }: PropTypes) => {
  return (
    <ReactQuill
      theme="snow"
      value={value || ''}
      modules={modules}
      formats={formats}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default QuillEditorComp;
