import React from "react";
import Base from "../Base/base";
import { TextField } from "@mui/material";
import { Button, Form } from "react-bootstrap";
import MonacoEditor from "react-monaco-editor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Postquestion({ questions, setQuestions }) {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) navigate("/login");
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const handleClick = async function () {
    const ques = { question, description, code, tags };

    const res = await fetch(
      "https://stackoverflow-clone-2zgy.onrender.com/api/notes/add",
      {
        method: "POST",
        body: JSON.stringify(ques),
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }
    );
    const result = await res.json();

    setQuestions([...questions, result.data]);
    navigate("/");
  };
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
  };
  const editorStyle = {
    width: "100%",
    height: "500px !important", // Adjust this value to increase the height
  };

  return (
    <Base>
      <div className="add-question">
        <h3>Add your Question</h3>
        <div className="text-field">
          <TextField
            fullWidth
            label="Title"
            id="fullWidth"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="text-field">
          <TextField
            fullWidth
            label="Tags"
            id="fullWidth"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="text-field">
          <TextField
            className="description"
            fullWidth
            id="fullWidth"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="code-editor">
          <label>Your Code</label>
          {/* <SimpleCodeEditor
            value={code}
            onValueChange={handleCodeChange}
            highlight={(code) => highlight(code, languages.javascript)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          /> */}
          <MonacoEditor
            language="javascript"
            value={code}
            options={options}
            onChange={(newCode) => {
              setCode(newCode);
            }}
            style={editorStyle}
          />
        </div>
      </div>
      <Button variant="primary" onClick={handleClick}>
        Post question
      </Button>
    </Base>
  );
}
