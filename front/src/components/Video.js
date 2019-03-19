import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { log } from 'util';


class Video extends Component {

  state = {
    target: null
  }

  getCurrentTime = () => {
    this.props.callBack(this.state.target.getCurrentTime())
  }

  startSpyPlayer = () => {
    const ONE_SECOND = 1000;
    window.setInterval(this.getCurrentTime, ONE_SECOND);
  }

  render() {
    const opts = {
      height: '360',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };


    return <div>
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onStateChange={(event) => {
          log('status change')
          this.setState({ target: event.target }, this.startSpyPlayer)
        }}

      />
    </div >
  }





}

export default Video;