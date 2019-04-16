import React, { Component } from 'react';
import Video from './Video'
import { Row, Col, Button, Carousel } from 'antd';
import Header from './Header'
import Body from './Body'
import style from '../style/customStyle.css'
import { getVideoInformation, getCaptions } from '../Server'
import Caption from './Caption'
import { log } from 'util';

class VideoContainer extends Component {

  state = {
    videoId: '',
    videoTitle: '',
    topics: [],
    captions: [],
    selectedCaptionByTime: {},
    selectedTopicByTime: {},
    captionTimeSelected: null,
    topicTimeSelected: null,
    target: null
  }


  /* Este metodo recorrer los captions y crear un hash de tipo time-> true/false **/
  processCaptions = (captions) => {
    const selectedCaptionByTime = { ...this.state.selectedCaptionByTime }
    captions.forEach((item) => {
      selectedCaptionByTime[item.time] = false
    })
    this.setState({ selectedCaptionByTime, captions: captions })
  }


  /* Este metodo recorrer los captions y crear un hash de tipo time-> true/false **/
  processTopics = (topics) => {
    const selectedTopicByTime = { ...this.state.selectedTopicByTime }
    topics.forEach((item) => {
      selectedTopicByTime[item.time] = false
    })
    this.setState({ selectedTopicByTime, topics: topics })
  }

  updateTargetReference = (target) => {
    this.setState({ target: target })
  }

  generateCaptions = () => {
    const container = document.querySelector('.body');
    const toReturn = this.state.captions.map((item, idx) => {
      return <Caption
        text={item.caption}
        time={item.time}
        key={item.time}
        selected={this.state.selectedCaptionByTime[item.time]}
        container={container}
        idx={idx - 1}
        target={this.state.target}
      />
    })

    return toReturn;
  }


  /** Este metodo se va a llamar a medida que el video se esta reproduciendo */
  videoPlayingCallBack = (time) => {

    const roundedTime = Math.round(time)

    if (this.state.selectedCaptionByTime[roundedTime] !== undefined && roundedTime !== this.state.captionTimeSelected) {
      const selectedCaptionByTime = { ...this.state.selectedCaptionByTime }
      selectedCaptionByTime[roundedTime] = true
      if (this.state.captionTimeSelected != null) {
        selectedCaptionByTime[this.state.captionTimeSelected] = false
      }
      this.setState({ selectedCaptionByTime, captionTimeSelected: roundedTime })
    }

    if (this.state.selectedTopicByTime[roundedTime] !== undefined && roundedTime !== this.state.topicTimeSelected) {
      const selectedTopicByTime = { ...this.state.selectedTopicByTime }
      selectedTopicByTime[roundedTime] = true
      if (this.state.topicTimeSelected !== null) {
        selectedTopicByTime[this.state.topicTimeSelected] = false;
      }
      console.log('selectedTopicByTime roundedTime', selectedTopicByTime, roundedTime);
      this.setState({ selectedTopicByTime, topicTimeSelected: roundedTime })
    }
  }

  componentDidMount() {
    const videoId = this.props.match.params.videoId;
    getVideoInformation(videoId).then((body) => {
      this.setState({ videoTitle: body.video_title })
      getCaptions(body.caption_id).then((body) => {
        this.processCaptions(body.captions);
        this.processTopics(body.themes);
      })
    })
  }

  render() {
    const videoId = this.props.match.params.videoId;
    return (
      <Row>
        <Col span={5}>
        </Col>
        <Col span={14}>
          <Header
            videoTitle={this.state.videoTitle}
            topics={this.state.topics}
            selectedTopicByTime={this.state.selectedTopicByTime}
            target={this.state.target}

          />
          <Video
            videoId={videoId}
            callBack={(time) => this.videoPlayingCallBack(time)}
            updateTargetReference={(target) => this.updateTargetReference(target)}
          />
          <Body
            captions={this.generateCaptions()}
          />
        </Col>
        <Col span={5}>
        </Col>

      </Row>

    )
  }
}

export default VideoContainer;