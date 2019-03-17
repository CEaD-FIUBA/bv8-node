import React, { Component } from 'react';
import { log } from 'util';


export default class Caption extends Component {

  state = {
    selected: false
  }

  onClick = () => {
    console.log('onclik');
    this.setState({ selected: !this.state.selected })
  }

  render() {
    return <div
      className='caption'
      onClick={this.onClick}
    >
      <div
        className={'caption-bar' + (this.state.selected ? ' bar-caption-selected' : '')}
      />
      <div className={'caption-text' + (this.state.selected ? ' caption-text-selected' : '')}>
        {this.props.text}
      </div>
    </div >
  }
}