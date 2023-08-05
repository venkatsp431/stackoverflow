import React, { useState } from "react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { SimpleCodeEditor } from "react-simple-code-editor";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <div>
      <SimpleCodeEditor
        value={code}
        onValueChange={handleCodeChange}
        highlight={(code) => highlight(code, languages.javascript)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>
  );
};

export default CodeEditor;
