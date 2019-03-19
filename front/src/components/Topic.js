import React, { Component } from 'react';
import { Button } from 'antd';



export default class Topic extends Component {

  render() {
    return <Button
      type="primary"
      className={(this.props.selected ? ' selected-topic' : 'topic')}
    >
      {this.props.topicText}
    </Button>
  }
}