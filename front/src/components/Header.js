import React, { Component } from 'react';

import { Row, Col, Button, Carousel } from 'antd';
import Topic from './Topic'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SUBGROUP_SIZE = 4;

export default class Header extends Component {


  getTopics = () => {
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
    const toReturn = groups.map((group, index) => {
      return group.map((item, idx) => {
        return <div
          key={index}
        >
          <Topic
            key={idx}
            time={item.time}
            topicText={item.caption.split(':')[1]}
            selected={this.props.selectedTopicByTime[item.time]}
          />
        </div>
      })
    })
    console.log('toReturn', toReturn);
    return toReturn;
  }

  next = () => {
  }

  render() {
    const groups = this.getTopics();
    const content = this.createContent(groups);

    const settings = { initialSlide: 1, slidesToShow: 3, infinite: false }
    return (
      <div style={{ marginBottom: '20px' }}>
        <Row type="flex" justify="end">
          <div className='title'>{this.props.videoTitle}</div>
        </Row>
        <Row type="flex" justify="start">
          <div className='title'>Temario</div>
        </Row>
        <Row>
          <Col>
            <Slider
              style={{ background: '#F5F5F5' }}
              afterChange={this.onChange}
              ref={slider => (this.slider = slider)} {...settings}
            >
              {content}
            </Slider>

          </Col>
        </Row>

      </div >
    );
  }
} 