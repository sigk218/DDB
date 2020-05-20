import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MainSearchBar from "../../components/MainSearchBar/MainSearchBar";
import imgA from "../../assets/imgA.png";
class Main extends React.Component {
  componentDidMount() {

  }
  users() {

  }
  render() {
    return (
      <div>
        <div align="center">
          <img src={imgA} width="200" height="200"></img>
        </div>
        <MainSearchBar />
        <div>
          <ul>
            <li>
              <Link to="/MyPage">마이페이지</Link>
            </li>
            <li>
              <Link to="/HosDetail">병원상세페이지</Link>
            </li>
            <li>
              <Link to="/HosRes">병원 리스트</Link>
            </li>
            <li>
              <Link to="/ReviewDetail">리뷰상세페이지</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}



export default Main;
