import React, { Component } from 'react'
import Caption from './Caption'
import { log } from 'util';


export default class Body extends Component {

  state = {
    captionByTime: {},
    captions: []
  }

  componentWillMount() {

  }

  createRenderContent = () => {
    return this.props.captions.map((item) => {
      return <Caption
        text={item.caption}
        key={item.time}
      />
    })
  }

  render() {
    const content = this.createRenderContent();
    return <div className='body'>
      {this.createRenderContent()}
    </div>
  }

}