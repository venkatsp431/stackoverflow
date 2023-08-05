import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
    console.log(text);
  };

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={handleChange}
        style={{ height: "200px" }}
      />
    </div>
  );
};

export default Editor;
