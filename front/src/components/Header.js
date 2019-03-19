import React, { Component } from 'react';

import { Row, Col, Button, Carousel } from 'antd';

export default class Header extends Component {


  state = {
    state_by_time: {}
  }

  componentDidMount() {
    console.log('Header themes', this.props.themes);
  }


  getThemes = () => {
    const SUBGROUP_SIZE = 4;
    const themes = [...this.props.themes]
    const themes_subgroups = []
    const size = this.props.themes.length;
    const quantityOfGroups = Math.floor(size / SUBGROUP_SIZE) + (size % SUBGROUP_SIZE > 0)
    for (var i = 0; i < quantityOfGroups; i++) {
      if (themes.length < SUBGROUP_SIZE) {
        themes_subgroups.push(themes);
      } else {
        themes_subgroups.push(themes.slice(i * SUBGROUP_SIZE, (i + 1) * SUBGROUP_SIZE));
      }
    }
    return themes_subgroups;
  }

  createContent = (groups) => {
    return groups.map((group, index) => {
      return <div
        key={index}
      >
        {group.map((item) => {
          return <Button
            type="primary"
            className='theme'
            key={item.time}
          >
            {item.caption.split(":")[1]}
          </Button>
        })}
      </div>
    })
  }

  render() {
    const groups = this.getThemes();
    const content = this.createContent(groups);
    return (
      <div style={{ marginBottom: '20px' }}>
        <Row type="flex" justify="end">
          <div className='title'>Titulo video - {this.props.videoTitle}</div>
        </Row>
        <Row type="flex" justify="start">
          <div className='title'>Temario</div>
        </Row>
        <Row>
          <Col span={1}>
            <Button icon="left" className='side-button' />
          </Col>
          <Col span={22}>
            <Carousel style={{ background: '#F5F5F5' }} afterChange={this.onChange} >
              {content}
            </Carousel>

          </Col>
          <Col span={1}>
            <Button icon="right" className='side-button' />
          </Col>
        </Row>

      </div >
    );
  }
} 