import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PersonIcon from "@material-ui/icons/Person";
import SendIcon from "@material-ui/icons/Send";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';
import history from '../../history';
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

const cx = classNames.bind(styles)

const checkCancel = () => {
  const r = window.confirm('작성하던 내용이 사라진다냥')
  if (r == true) {
    return history.goBack()
  }
}


const Navigation = (props) => {
  let l = useLocation()
  let location = l.pathname
  let rightBtn = <PersonIcon />
  let leftBtn = <ChevronLeftIcon onClick={history.goBack} />                                   
  // console.log('loca', location)
  if (location === '/MyPage') {
    location = '마이페이지'
  } else if (location === '/HosDetail') {
    location = props.status.hosName + '병원 상세페이지'
  } else if (location === '/ReviewDetail') {
    location = [props.status.hosName, '후기 열람'].join(' ')
  } else if (location === '/SelectOption') {
    location = [props.status.hosName, '후기 작성'].join(' ')
  } else if (location === '/ReviewForm') {
    // selectOption이외에 접근 금지시키는 코드
    // if (props.status.hosName === '') {
    //   window.alert('잘못된 접근입니다.')
    //   history.goBack()
    // } else {
    //   location = [props.status.hosName, '후기 작성'].join(' ')
    //   rightBtn = <SendIcon  style={{ fontSize: 19 }}/>
    //   leftBtn = <ChevronLeftIcon onClick={() => checkCancel()} /> 
    // }
    location = [props.status.hosName, '후기 작성'].join(' ')
    rightBtn = <SendIcon  style={{ fontSize: 19 }}/>
    leftBtn = <ChevronLeftIcon onClick={() => checkCancel()} />  
  } else if (location === '/LogIn') {
    location = '로그인'
  } else if (location === '/') {
    leftBtn = null
    location = ''
  } else {
    location = ''
  }

  return (
    <div>
      <React.Fragment>
        <div className={cx('custom-nav')}>
          <div className={cx('nav-icon-box')}>
            {leftBtn}
          </div>
          <p className={cx('nav-title')}>{location}</p>
          <div className={cx('nav-icon-box')}>
            {rightBtn}
          </div>
        </div>
      </React.Fragment>
      <main>
        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  status: state.status,
})

export default connect(
  mapStateToProps
)(Navigation)