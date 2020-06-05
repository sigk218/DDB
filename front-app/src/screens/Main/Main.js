import React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MainSearchBar from "../../components/MainSearchBar/MainSearchBar";
import imgA from "../../assets/imgA.png";
import Pets from '@material-ui/icons/Pets'
import history from "../../history";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
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
    history.push("/mypage");
  }
  async handleEnter(e) {
    if (e.key === 'Enter') {
      console.log(this.state)
    }
  }

  render() {
    const getKeywords = ['심장사상충', '중성화수술', '6월예방접종', '스케일링', '건강검진', '광견병접종', '햄스터깁스']
    const keword = getKeywords.map(word => {
    return <div key={word}>#{word}</div>
    })
    return (
      <div>
        <div className={cx('logo-box')} align="center">
          <div className={cx('phrase')}>
            <p><span>발</span>품팔지않고</p>
            <p>바로 <span>만</span>나는</p>
            <p>애니멀 <span>닥</span>터</p>
          </div>
          <img 
            className={cx('logo')} 
            src={require('../../assets/veterinary.png')}
            alt='logo'/>
        </div>
        <MainSearchBar />
        <div className={cx('keyword-box')}>
          {keword}
        </div>

        <div className={cx('event-box')}>
          <div className={cx('category', 'event-header')}>
            <p>발바닥 런칭 기념 이벤트</p>
          </div>
          <div className={cx('event-body')}>
            <img
              className={cx('coffee-icon')}
              src={require('../../assets/coffee.png')}
              alt='coffee-icon'/>
            <div className={cx('event-phrase')}>
              <p>리뷰를 작성하면 추첨을 통해 스타벅스 쿠폰을 드립니다</p>
              <p className={cx('event-title')}>리뷰 쓰러가자냥</p>
            </div>
          </div>
        </div>
        <div className={cx('quick-box')}>
          
          <div className={cx('quick-btn')}>
            <Pets/>
          </div>
          <p>Quick Search</p>
        </div>
      </div>
    );
  }
}



export default Main;
