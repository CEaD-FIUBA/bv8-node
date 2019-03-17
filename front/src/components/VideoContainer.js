import React, { Component } from 'react';
import Video from './Video'
import { Row, Col, Button, Carousel } from 'antd';
import Header from './Header'
import Body from './Body'
import style from '../style/customStyle.css'
import { getVideoInformation } from '../Server'

class VideoContainer extends Component {

  state = {
    videoId: '',
    videoTitle: ''
  }

  componentDidMount() {
    const videoId = this.props.match.params.videoId;
    getVideoInformation(videoId).then((body) => {
      console.log('body', body);
      this.setState({ videoTitle: body.video_title })

    })
  }

  render() {
    const videoId = this.props.match.params.videoId;
    return (
      <Row>
        <Col span={6}>
        </Col>
        <Col span={12}>
          <Header
            videoTitle={this.state.videoTitle}
          />
          <Video
            videoId={videoId}
          />
          <Body />
        </Col>
        <Col span={6}>
        </Col>

      </Row>

    )
  }
}

export default VideoContainer;