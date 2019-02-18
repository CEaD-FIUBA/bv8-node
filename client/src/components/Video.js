import React, { Component } from 'react';
import { log } from 'util';


const Video = ({ match }) => {
  console.log('match', match);
  return <div>
    <h3>ID: {match.params.videoId}</h3>
  </div>
}


export default Video;