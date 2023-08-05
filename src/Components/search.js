import React, { useEffect, useState } from "react";
import Base from "../Base/base";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function Search({ questions, setQuestions }) {
  const { query } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchURL() {
      const res = await fetch(
        `https://stackoverflow-clone-2zgy.onrender.com/api/notes/search?query=${query}`,
        {
          method: "GET",

          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const result = await res.json();

      if (result.data) {
        setQuestions(result.data);
      }
    }
    fetchURL();
  }, [query]);
  function bodyColor() {
    document.body.style.backgroundColor = "#fff";
  }
  bodyColor();

  async function questionpage(id) {
    navigate(`/question/${id}`);
    const res = await fetch();
  }
  return (
    <div>
      <Base>
        <div className="body-header">
          <Container>
            <Row>
              <Col md={8}>
                <h3>Search Results</h3>
              </Col>
              <Col md={4}>
                <Button variant="primary">Ask question</Button>
              </Col>
            </Row>
          </Container>
        </div>
        {questions?.map((qn, idx) => (
          <Card className="question-card" key={idx}>
            <Card.Body>
              <Container>
                <Row>
                  <Col xs={6} md={2}>
                    <span className="views-data">
                      <p>{qn.answers.length} answers</p>
                      <p>{qn.views} views</p>
                    </span>
                  </Col>
                  <Col xs={12} md={10}>
                    <Card.Title>
                      <a href="" onClick={() => questionpage(qn._id)}>
                        {qn.question}
                      </a>
                    </Card.Title>
                    <span className="tags-style">
                      {qn?.tags?.split(" ")?.map((tag, idx) => (
                        <a href="#">
                          <span className="tag-bg" key={idx}>
                            {tag}
                          </span>
                        </a>
                      ))}
                    </span>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        ))}
      </Base>
    </div>
  );
}
