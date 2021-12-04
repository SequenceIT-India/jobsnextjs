import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomEditor = (props) => {
  return (
    <Editor
      readOnly={props.disabled}
      editorState={props.editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName={props.editorClassName}
      onEditorStateChange={props.onEditorStateChange}
      toolbar={{
        inline: { inDropdown: false },
        list: { inDropdown: true },
        textAlign: { inDropdown: false },
        link: { inDropdown: true },
        history: { inDropdown: false },
      }}
    />
  );
};

export default CustomEditor;
