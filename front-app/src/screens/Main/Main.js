import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MainSearchBar from "../../components/MainSearchBar/MainSearchBar";
import imgA from "../../assets/imgA.png";
import history from "../../history";
import styles from './main.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    }
  }

  componentDidMount() {

  }
  users() {

  }
  mypage() {
    console.log("asdfasdfasdfasdf")
    history.push("/mypage");
  }
  async handleEnter(e) {
    if (e.key === 'Enter') {
      console.log(this.state)
    }
  }

  render() {
    return (
      <div>
        <div align="center">
          <img src={imgA} width="200" height="200"></img>
        </div>
        <div className={cx('search-container')}>
          <input className={cx('search-box')}
            type="text"
            placeholder="병원이름, 진료명, 지역, 동물 종류 등을 입력하세요 ㅎㅎ"
            value={this.state.word}
            onChange={e => this.setState({ word: e.target.value })}
            onKeyPress={this.handleEnter.bind(this)}
          />

        </div>
        <div>
          <ul>
            <li>
              <Link to="/MyPage"> 마이페이지</Link>
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
            <li>
              <Link to="/ResTab">탭 입니당</Link>
            </li>
            <li>
              <Link to="/HosMapRes">맵 입니당</Link>
            </li>
            <li>
              <Link to="/LogIn">로그인2222</Link>
            </li>
            <li>
              <Link to="/SignIn">로그인2222</Link>
            </li>
            <li>
              <Link to="/smsVer">문자인증</Link>
            </li>
            <li>
              <Link to="/MyPetList">펫리스트</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}



export default Main;
