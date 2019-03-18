import React, { Component } from 'react'
import Caption from './Caption'


export default class Body extends Component {

  createRenderContent = () => {
    return this.props.captions.map((caption) => {
      return <Caption
        text={caption.caption}
        key={caption.time}
      />
    })
  }

  render() {
    return <div className='body'>
      {this.createRenderContent()}
    </div>
  }

}