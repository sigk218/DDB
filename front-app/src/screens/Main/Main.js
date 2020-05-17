import React from "react";
import { connect } from "react-redux";
import MainSearchBar from "../../components/MainSearchBar/MainSearchBar";
import imgA from "../../assets/imgA.png";
class Main extends React.Component {
  componentDidMount() {

  }
  users() {

  }
  render() {
    console.log("bbbbb")
    return (
      <div>
        <div align="center">
          <img src={imgA} width="200" height="200"></img>
        </div>
        <MainSearchBar />
      </div>
    );
  }
}



export default Main;
