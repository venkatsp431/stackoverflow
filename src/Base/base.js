import React, { useState } from "react";
import Navbar from "./navbar";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Base({ query, setQuery, children }) {
  return (
    <div>
      <Navbar query={query} setQuery={setQuery} />
      <Container>
        <Row>
          <Col xs lg="2" className="border-sidebar">
            <div className="sidebar">
              <a href="/">Home</a>
              <p>PUBLIC</p>
              <div className="public-links">
                <a href="/">Questions</a>
                <a href="/tags">Tags</a>
                <a href="/users">Users</a>
                <a href="/profile">Edit/Delete</a>
              </div>
            </div>
          </Col>
          <Col xs lg="7">
            <div className="base">{children}</div>
          </Col>
          <Col xs lg="3" className="base">
            <Card className="right-card">
              <Card.Header>The overflow blog</Card.Header>
              <Card.Body>
                <Card.Text>
                  Hype or not? AI’s benefits for developers explored in the 2023
                  Developer Survey
                </Card.Text>
                <Card.Text>
                  Pair programing? We peek under the hood of Duet, Google’s
                  coding assistant....
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
