import React, { Component } from 'react'
import Caption from './Caption'


export default class Body extends Component {
  render() {
    return <div className='body'>
      <Caption
        text={'Buenos Días mi nombre es Luis Donseli yo soy docente del departamento de Electrotenia'}
      />
      <Caption
        text='de la Facultad de Ingeniería de la UBA'
      />
      <Caption
        text='de la Facultad de Ingeniería de la UBA'
      />
    </div>
  }

}