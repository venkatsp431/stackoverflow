import React, { useEffect, useState } from "react";
import Base from "../Base/base";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Tags({ questions, setQuestions }) {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const pretags = [];
  useEffect(() => {
    for (let i = 0; i < questions.length; i++) {
      pretags.push(questions[i].tags);
    }
    console.log(pretags);
  });
  function handleSubmit(tag) {
    navigate(`/taggedques/${tag}`);
  }
  return (
    <div>
      <Base>
        <h3>Tags</h3>
        <div>
          {questions?.map((qn, idx) => (
            <div>
              {qn?.tags?.split(" ").map((tag, index) => (
                <Container>
                  <Row onClick={() => handleSubmit(tag)} className="pointer">
                    <Col>
                      <Card>
                        <Card.Header key={index}>{tag}</Card.Header>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              ))}
            </div>
          ))}
        </div>
      </Base>
    </div>
  );
}
