import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/Header';
import EventsPage from './components/EventsPage';

import fetchEvents from './actions'

class App extends Component {
  state ={
    data: null
  }

  componentDidMount() {
    const nowTime = Math.round((new Date()).getTime() / 1000);
    const endTime = nowTime + 14 * 24 * 60 * 60;

    const proxyurl = `https://floating-wildwood-18564.herokuapp.com/`;
    const url = `https://kudago.com/public-api/v1.4/events/?expand=place,location,dates,participants&page_size=50&page=1&fields=id,dates,slug,title,place,location,images&actual_since=${nowTime}&actual_until=${endTime}`;

    this.props.fetchEvents(proxyurl+url);
  }

  render() {
    return (
      <div className="App">
        <Header />

        <EventsPage />
      </div>
    );
  }
}

const mapStateToProps = ({ data = {} }) => ({
  data
});

export default connect(mapStateToProps, { fetchEvents })(App);
