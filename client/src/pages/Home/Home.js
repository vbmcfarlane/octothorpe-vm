import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

console.log("running client/src/pages/detail/detail.js");
class Home extends Component {
  state = {
    video: {}
  };
  
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            
              <h3>
                Hi I'm Home
              </h3>
              
          </Col>
        </Row>
      </Container>
    ); //end return
  } // close render
} // close class
export default Home;