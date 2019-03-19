import React, { Component } from 'react';

import { Row, Col, Button, Carousel } from 'antd';
import Topic from './Topic'
import { log } from 'util';

export default class Header extends Component {


  getTopics = () => {
    const SUBGROUP_SIZE = 4;
    const topics = [...this.props.topics]
    const themes_subgroups = []
    const size = topics.length;
    const quantityOfGroups = Math.floor(size / SUBGROUP_SIZE) + (size % SUBGROUP_SIZE > 0)
    for (var i = 0; i < quantityOfGroups; i++) {
      if (topics.length < SUBGROUP_SIZE) {
        themes_subgroups.push(topics);
      } else {
        themes_subgroups.push(topics.slice(i * SUBGROUP_SIZE, (i + 1) * SUBGROUP_SIZE));
      }
    }
    return themes_subgroups;
  }

  createContent = (groups) => {
    return groups.map((group, index) => {
      return <div
        key={index}
      >
        {group.map((item, idx) => {
          return <Topic
            key={idx}
            time={item.time}
            topicText={item.caption.split(':')[1]}
            selected={this.props.selectedTopicByTime[item.time]}
          />
        })}
      </div>
    })
  }

  render() {
    const groups = this.getTopics();
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