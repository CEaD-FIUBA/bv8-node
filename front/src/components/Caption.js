import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { log } from 'util';


export default class Caption extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  onClick = () => {
    console.log('onclik');
    this.setState({ selected: !this.props.selected })
    if (this.props.target != null) {
      this.props.target.seekTo(this.props.time)
    }
  }


  componentDidUpdate() {
    if (this.props.selected) {
      this.props.container.scrollTop = this.props.idx * 56;
    }
  }
  render() {
    return <div
      className={'caption' + (this.props.selected ? ' caption-selected' : '')}
      onClick={this.onClick}
      ref={this.myRef}
    >
      <div
        className={'caption-bar' + (this.props.selected ? ' bar-caption-selected' : '')}
      />
      <div className={'caption-text' + (this.props.selected ? ' caption-text-selected' : '')}>
        {this.props.text}
      </div>
    </div >
  }
}