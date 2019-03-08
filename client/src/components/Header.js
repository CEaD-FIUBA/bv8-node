import React, { Component } from 'react';

import { Row, Col, Button, Carousel } from 'antd';

export default class Header extends Component {


  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <Carousel style={{ background: '#F5F5F5' }} afterChange={this.onChange} >
          <div>
            <Button type="primary" style={{ background: '#CFD2D4', borderColor: '#CFD2D4', color: 'black', marginRight: '40px' }}>
              Tema 1
            </Button>
            <div style={{ width: '2px', height: '25px', display: 'inline-block', background: '#28ABE0', position: 'absolute', marginTop: '27px' }}></div>
            <Button type="primary" style={{ background: '#F5F5F5', borderColor: '#F5F5F5', color: 'black', margin: '0px 40px' }}>
              Tema 2
            </Button>
            <div style={{ width: '2px', height: '25px', display: 'inline-block', background: '#28ABE0', position: 'absolute', marginTop: '27px' }}></div>
            <Button type="primary" style={{ background: '#F5F5F5', borderColor: '#F5F5F5', color: 'black', margin: '0px 40px' }}>
              Tema 3
            </Button>
            <div style={{ width: '2px', height: '25px', display: 'inline-block', background: '#28ABE0', position: 'absolute', marginTop: '27px' }}></div>
            <Button type="primary" style={{ background: '#F5F5F5', borderColor: '#F5F5F5', color: 'black', margin: '0px 40px' }}>
              Tema 4
            </Button>
          </div>
          <div>
            <Button type="primary" style={{ background: '#CFD2D4', borderColor: '#CFD2D4', color: 'black', marginRight: '40px' }}>
              Tema 1
            </Button>
            <div style={{ width: '2px', height: '25px', display: 'inline-block', background: '#28ABE0', position: 'absolute', marginTop: '27px' }}></div>
            <Button type="primary" style={{ background: '#F5F5F5', borderColor: '#F5F5F5', color: 'black', margin: '0px 40px' }}>
              Tema 2
            </Button>
            <div style={{ width: '2px', height: '25px', display: 'inline-block', background: '#28ABE0', position: 'absolute', marginTop: '27px' }}></div>
            <Button type="primary" style={{ background: '#F5F5F5', borderColor: '#F5F5F5', color: 'black', margin: '0px 40px' }}>
              Tema 3
            </Button>
            <div style={{ width: '2px', height: '25px', display: 'inline-block', background: '#28ABE0', position: 'absolute', marginTop: '27px' }}></div>
            <Button type="primary" style={{ background: '#F5F5F5', borderColor: '#F5F5F5', color: 'black', margin: '0px 40px' }}>
              Tema 4
            </Button>
          </div>
        </Carousel>
      </div>
    );
  }
} 