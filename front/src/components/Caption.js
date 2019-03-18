import React, { Component } from 'react';
import { log } from 'util';


export default class Caption extends Component {

  onClick = () => {
    console.log('onclik');
    this.setState({ selected: !this.props.selected })
  }

  render() {
    return <div
      className='caption'
      onClick={this.onClick}
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