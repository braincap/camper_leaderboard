import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var dataLinkList = {
  'recent': 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
  'alltime': 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
}
var axios = require('axios')

var Table = React.createClass({
  recentData: [{
    "username": "fetching",
    "img": "https://openclipart.org/download/225151/Loading_icon_with_fade.svg",
    "alltime": 'fetching',
    "recent": 'fetching',
    "lastUpdate": "fetching"
  }],
  alltimeData: [{
    "username": "fetching",
    "img": "https://openclipart.org/download/225151/Loading_icon_with_fade.svg",
    "alltime": 'fetching',
    "recent": 'fetching',
    "lastUpdate": "fetching"
  }],
  getInitialState: function () {
    return ({
      finalData: this.recentData
    })
  },
  componentDidMount: function () {
    axios.get(dataLinkList['recent'])
      .then(results => {
        this.recentData = results.data
        this.setState({
          finalData: this.recentData
        });
      });
    axios.get(dataLinkList['alltime'])
      .then(results => {
        this.alltimeData = results.data
      });
  },

  handleClick: function (e) {
    this.setState({
      finalData: (e.target.innerHTML === 'Points in past 30 days') ? this.recentData : this.alltimeData
    });
  },

  render: function () {
    return (
      <table className="dataTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th onClick={this.handleClick}>Points in past 30 days</th>
            <th onClick={this.handleClick}>All time points</th>
          </tr>
        </thead>
        <tbody>
          {this.state.finalData.map(function (value, index) {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><UserDetails userRecord={value} /></td>
                <td>{value["recent"]}</td>
                <td>{value["alltime"]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
});

var UserDetails = React.createClass({
  render: function () {
    return (
      <div>
        <a href={"https://www.freecodecamp.com/" + this.props.userRecord["username"]} target='__blank'>
          <img className="userPic" src={this.props.userRecord["img"]} alt="userpic" />
          <p className="username">{this.props.userRecord["username"]}</p>
        </a>
      </div>
    );
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Camper Leaderboard</h2>
        </div>
        <div className="tableDiv">
          <Table />
        </div>
      </div>
    );
  }
}

export default App;
