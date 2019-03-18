import React, { Component } from 'react'
import Caption from './Caption'
import { log } from 'util';


export default class Body extends Component {

  render() {
    return <div className='body'>
      {this.props.captions}
    </div>
  }

}