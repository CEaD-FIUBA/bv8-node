import React, { Component } from 'react';
import { Button } from 'antd';



export default class Topic extends Component {

  onClick = () => {
    console.log('click in topic');
    this.props.target.seekTo(this.props.time);
  }

  render() {
    return <Button
      type="primary"
      className={(this.props.selected ? ' selected-topic' : 'topic')}
      onClick={this.onClick}
    >
      {this.props.topicText}
    </Button>
  }
}