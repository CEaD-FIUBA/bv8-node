import React, { Component } from 'react'


export default class Body extends Component {
  render() {
    return <div style={{ background: '#F5F5F5', overflow: 'auto' }}>
      <div style={{ height: '36px', marginTop: '20px', marginBottom: '20px', background: 'white' }}>
        <div style={{ width: '3px', height: '36px', background: '#0CAADC', float: "left", marginBottom: '20px' }}>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '9px', height: '36px', background: 'white' }}>
          Buenos Días mi nombre es Luis Donseli yo soy docente del departamento de Electrotenia
        </div>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '9px', height: '36px', background: 'white', marginBottom: '20px' }}>
        de la Facultad de Ingeniería de la UBA
      </div>
      <div style={{ textAlign: 'center', paddingTop: '9px', height: '36px', background: 'white', marginBottom: '20px' }}>
        de la Facultad de Ingeniería de la UBA
      </div>

    </div>
  }

}