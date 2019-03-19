import React, { Component } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import ReactDOM from 'react-dom';



export default class Body extends Component {

  componentDidMount() {
    console.log('Body pos', ReactDOM.findDOMNode(this).getBoundingClientRect().y);
  }

  render() {
    return <PerfectScrollbar className='body'>
      {this.props.captions}
    </PerfectScrollbar>
  }

}