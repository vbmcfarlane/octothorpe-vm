import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

console.log("running client/src/pages/Videos/Videos.js");

class Videos extends Component {
  state = {
    videos: [],
    video: {},
    videoId: "",
    title: "",
    url: "",
    description: "",
    img: ""
  };
  componentDidMount() {
    this.loadVideos();
  }
  loadVideos = () => {
    API.getVideos()
      .then(res =>
        this.setState({ videos: res.data, 
          videoId: " ", 
          title: "", 
          url: "", 
          description: "",
          img: "", 
        })
      )
      .catch(err => console.log(err));
  };

  deleteVideo = id => {
    API.deletevideo(id)
      .then(res => this.loadVideos())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.description) {
      API.saveBook({
        videoId: this.state.videoId,
        title: this.state.title,
        url: this.state.url,
        description: this.state.description,
        img: this.state.img,
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

   getVideo = id => {
  API.getVideo(this.props.match.params.id)
      .then(res => this.setState({ video: res.data }))
      .catch(err => console.log(err));
  };
  handleSelectedVideo = (title, url) => {
    // event.preventDefault();
    console.log("videoSelected");
    let videoURL = url;
    let videoTitle = title;
    console.log('Title: ', videoTitle);
    console.log('URL: ', videoURL);
    this.setState({
      url: videoURL,
      title: videoTitle
    })
  }

  render() {
    console.log(this.state);

    return (
      <Container fluid>
        <Row>
          <Col size="md-8">
            <Jumbotron>
              <h1>Video Player</h1>
            </Jumbotron>
            <Row>
          <Col size="md-12">
            
              <h3>
                {this.state.title} 
              </h3>
              <h4>
              {this.state.description} 
              </h4>
          </Col>
        </Row>
        <Row>
          <Col size="col-md-12 ">
            <div className="video-detail col-md-12">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={this.state.url}></iframe>
              </div>
              <div className="details">
                <div>{this.state.video.description}</div>
              </div>
            </div>
          </Col>
        </Row>
       <Row>
        <div>
          <p> </p> 
          <p></p>
        </div>
       </Row> 
           {/*} <form>
              
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.videoId && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form> */}
          </Col>
          <Col size="md-4 sm-12">
            <Jumbotron>
              <h1>Video List</h1>
            </Jumbotron>
            {this.state.videos.length ? (
              <List>
                {this.state.videos.map(video => (
                  <ListItem key={video._id}>

                   {/*} <Link to={"/videos/" + video._id}>
                      <strong>
                        {video.title}
                      </strong>
                    </Link> */}

                    <p onClick={() => this.handleSelectedVideo(video.title, video.url)}>
                      {video.title}
                    <DeleteBtn onClick={() => this.deleteVideo(video._id)} />
                    </p>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Videos;