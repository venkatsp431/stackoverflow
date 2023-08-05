import React, { useEffect, useState } from "react";
import Base from "../Base/base";
import { ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const showPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <ButtonGroup>
      {currentPage !== 1 && (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          variant="outline-primary"
        >
          {"<"}
        </Button>
      )}

      {startPage !== 1 && (
        <>
          <Button onClick={() => onPageChange(1)} variant="outline-primary">
            1
          </Button>
          {startPage !== 2 && <span>...</span>}
        </>
      )}

      {pageNumbers?.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          variant={currentPage === pageNumber ? "primary" : "outline-primary"}
        >
          {pageNumber}
        </Button>
      ))}

      {endPage !== totalPages && (
        <>
          {endPage !== totalPages - 1 && <span>...</span>}
          <Button
            onClick={() => onPageChange(totalPages)}
            variant="outline-primary"
          >
            {totalPages}
          </Button>
        </>
      )}

      {currentPage !== totalPages && (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          variant="outline-primary"
        >
          {">"}
        </Button>
      )}
    </ButtonGroup>
  );
}

export default function Dashboard({ questions }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  function bodyColor() {
    document.body.style.backgroundColor = "#fff";
  }
  bodyColor();

  function questionpage(id) {
    setLoading(true);
    navigate(`/question/${id}`);
    setLoading(false);
  }
  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  function handleSubmit(tag) {
    navigate(`/taggedques/${tag}`);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <Base>
        <div className="body-header">
          <Container>
            <Row>
              <Col md={8}>
                <h3>Top Questions</h3>
              </Col>
              <Col md={4}>
                <Button
                  variant="primary"
                  onClick={() => navigate("/postquestion")}
                >
                  Ask question
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        {currentItems.map((qn, idx) => (
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
                      <a
                        href=""
                        disabled={loading}
                        onClick={() => questionpage(qn._id)}
                      >
                        {qn.question}
                      </a>
                    </Card.Title>
                    <span className="tags-style">
                      {qn?.tags?.split(" ").map((tag, idx) => (
                        <a href="" key={idx} onClick={() => handleSubmit(tag)}>
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
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(questions.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </Base>
    </div>
  );
}
