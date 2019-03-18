import React, { Component } from 'react';
import Video from './Video'
import { Row, Col, Button, Carousel } from 'antd';
import Header from './Header'
import Body from './Body'
import style from '../style/customStyle.css'
import { getVideoInformation, getCaptions } from '../Server'
import Caption from './Caption'

class VideoContainer extends Component {

  state = {
    videoId: '',
    videoTitle: '',
    themes: [],
    captions: [],
    statusByTime: {},
    timeSelected: null
  }


  /* Este metodo recorrer los captions y crear un hash de tipo time-> true/false **/
  processCaptions = (captions) => {
    const statusByTime = {}
    captions.forEach((item) => {
      statusByTime[item.time] = false
    })
    this.setState({ statusByTime, captions: captions })
  }

  generateCaptions = () => {
    const toReturn = this.state.captions.map((item) => {
      return <Caption
        text={item.caption}
        key={item.time}
        selected={this.state.statusByTime[item.time]}
      />
    })

    return toReturn;
  }


  /** Este metodo se va a llamar a medida que el video se esta reproduciendo */
  videoPlayingCallBack = (time) => {
    const roundedTime = Math.round(time)
    if (this.state.statusByTime[roundedTime] != undefined) {
      const statusByTimeModified = { ...this.state.statusByTime }
      statusByTimeModified[roundedTime] = true
      if (this.state.timeSelected != null) {
        statusByTimeModified[this.state.timeSelected] = false
      }
      this.setState({ statusByTime: statusByTimeModified, timeSelected: roundedTime })

    }
  }

  componentDidMount() {
    const videoId = this.props.match.params.videoId;
    getVideoInformation(videoId).then((body) => {
      this.setState({ videoTitle: body.video_title })
      getCaptions(body.caption_id).then((body) => {
        this.processCaptions(body.captions);
        this.setState({ themes: body.themes })
      })
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
            themes={this.state.themes}
          />
          <Video
            videoId={videoId}
            callBack={(time) => this.videoPlayingCallBack(time)}
          />
          <Body
            captions={this.generateCaptions()}
          />
        </Col>
        <Col span={6}>
        </Col>

      </Row>

    )
  }
}

export default VideoContainer;