import React, { Component } from 'react';

import { Row, Col, Button, Carousel } from 'antd';
import { getVideoInformation } from '../Server'

export default class Header extends Component {


  state = {
    videoTitle: ''
  }

  componentDidMount() {
    const videoId = this.props.videoId;
    getVideoInformation(videoId).then((body) => {
      console.log('body', body);
      this.setState({ videoTitle: body.video_title })
    })
  }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <Row type="flex" justify="end">
          <div style={{ marginBottom: '20px', fontWeight: 'bolder', borderBottom: '3px solid #28ABE0', paddingBottom: '3px' }}>Titulo video - {this.state.videoTitle}</div>
        </Row>
        <Row type="flex" justify="start">
          <div style={{ marginBottom: '20px', fontWeight: 'bolder', borderBottom: '3px solid #28ABE0', paddingBottom: '3px' }}>Temario</div>
        </Row>
        <Row>
          <Col span={1}>
            <Button icon="left" style={{ background: '#F5F5F5', borderColor: '#F5F5F5', color: '#28ABE0', padding: '0px 12px' }} />
          </Col>
          <Col span={22}>
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

          </Col>
          <Col span={1}>
            <Button icon="right" style={{ background: '#F5F5F5', borderColor: '#F5F5F5', color: '#28ABE0', padding: '0px 12px' }} />
          </Col>
        </Row>

      </div >
    );
  }
} 