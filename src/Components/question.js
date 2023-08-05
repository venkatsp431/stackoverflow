import React, { useEffect, useState } from "react";
import Base from "../Base/base";
import { useParams } from "react-router-dom";
import Editor from "./wmd";
import { Button } from "react-bootstrap";
import CodeEditor from "./ace";
import MonacoEditor from "react-monaco-editor/lib/editor";

export default function Question() {
  const [answer, setAnswer] = useState("");
  const { id } = useParams();

  const [anscode, setansCode] = useState("");

  const [question, setQuestion] = useState("");
  useEffect(() => {
    async function fetchURL() {
      const res = await fetch(
        `https://stackoverflow-clone-2zgy.onrender.com/api/notes/question/${id}`,
        {
          method: "PUT",
        }
      );
      const result = await res.json();
      if (result.data) setQuestion(result.data);
    }
    fetchURL();
  }, []);
  const updateAnswer = async () => {
    try {
      const updatedAnswer = { answer, anscode };
      setAnswer("");
      setansCode("");
      const res = await fetch(
        `https://stackoverflow-clone-2zgy.onrender.com/api/notes/edit/${id}/answers`,
        {
          method: "POST",
          body: JSON.stringify(updatedAnswer),
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();

      if (result.data) setQuestion(result.data);
      if (!result.data) console.log("no");
    } catch (error) {
      console.log(error);
    }
  };
  const options = {
    readOnly: true,
  };
  const options1 = {
    selectOnLineNumbers: true,
    automaticLayout: true,
  };
  const editorStyle = {
    height: "400px",
  };
  return (
    <div>
      <Base>
        <div className="body-header1">
          <h3 className="question-inside">{question.question}</h3>
          <p>{question.description}</p>
        </div>
        <MonacoEditor
          language="javascript"
          value={question.code}
          options={options}
          style={editorStyle}
        />

        <div>
          <h5 className="answers-heading">Answers</h5>
          {question?.answers?.map((ans, idx) => (
            <ul key={idx}>
              <li>
                {ans.answer}{" "}
                <MonacoEditor
                  language="javascript"
                  value={ans.anscode}
                  options={options}
                  style={editorStyle}
                />
              </li>
            </ul>
          ))}
        </div>
        <div className="answer">
          <h3 className="answer-header">Your Answer</h3>
          {/* <Editor value={answer} onChange={(e) => setAnswer(e.target.value)} /> */}
          <MonacoEditor
            language="javascript"
            value={anscode}
            options={options1}
            onChange={(newCode) => {
              setansCode(newCode);
            }}
            style={editorStyle}
          />
          <p>
            {" "}
            <label for="w3review">Your brief description</label>
          </p>
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
          {/* <div className="code-editor">
            <CodeEditor />
          </div> */}
          <Button
            variant="primary"
            className="answer-button"
            onClick={updateAnswer}
          >
            Post Answer
          </Button>
        </div>
      </Base>
    </div>
  );
}
