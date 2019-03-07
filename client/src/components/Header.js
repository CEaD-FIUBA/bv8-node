import React, { Component } from 'react';

import { Row, Col, Button, Carousel } from 'antd';

export default class Header extends Component {


  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  render() {
    return (
      <div>
        <Carousel style={{ background: '#F5F5F5' }} afterChange={this.onChange} >
          <div><Button type="primary">Tema1</Button> <Button type="primary">Tema1</Button></div>
          <div><Button type="primary">Tema2</Button></div>
          <div><Button type="primary">Tema3</Button></div>
          <div><Button type="primary">Tema4</Button></div>
        </Carousel>
      </div>
    );
  }
} 