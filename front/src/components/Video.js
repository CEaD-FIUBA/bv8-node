import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { log } from 'util';


const Video = (props) => {

  console.log('props', props);

  const opts = {
    height: '360',
    width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  return <div>
    <YouTube
      videoId={props.videoId}
      opts={opts}
    />
  </div>
}

export default Video;