/*global kakao*/
import React, { Component } from "react";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import history from "../../history";
import { connect } from "react-redux";
import { user } from '../../actions';
const cx = classNames.bind(styles)

class SignUp extends Component {
    componentDidMount() {
        if (this.props.user !== {}) {
            const r = window.confirm('이미 로그인했다냥, 로그아웃할거냥')
            if (r === true) {
                this.props.logOut()
            } else {
                history.push('/')
            }
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            c_log: 1,
            username: '',
            password: '',
            passwordC: '',
        };
        this.updateId = this.updateId.bind(this);
        this.updatePw = this.updatePw.bind(this);
        this.updatePwc = this.updatePwc.bind(this);
    }
    updateId(event) {
        this.setState({ username: event.target.value })
    }
    updatePw(event) {
        this.setState({ password: event.target.value })
    }
    updatePwc(event) {
        this.setState({ password: event.target.value })
    }
    correct_id(e) {
        if (e) return <div> </div>
        else {
            return <div> 잘못된 정보입니다. </div>
        }
    }
    async handleSummit() {
        await this.props.register(this.state.username, this.state.password)
        window.alert('회원가입이 완료되었다냥')
        history.push('/')
    }
    render() {
        return (
            <div className={cx('container')}>
                <div className={cx('category')}><p>Sign Up</p></div>

                <div className={cx('basic-box')}>
                    <p>아이디</p>
                    <input type="text" className={cx('input-box')} placeholder="Your Id.." onChange={this.updateId}></input>
                    <p>비밀번호</p>
                    <input type="text" className={cx('input-box')} placeholder="Your Password.." onChange={this.updatePw}></input>
                    <p>비밀번호 확인</p>
                    <input type="text" className={cx('input-box')} placeholder="Password check" onChange={this.updatePwc}></input>
                    <div className={cx('border-button')} onClick={() => this.handleSummit()}>
                        <p>가입</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        user: state.user.user
    };
};

const mapStateToDispatch = dispatch => {
    return {
        register: (id, pwd) => {dispatch(user.register(id, pwd))},
        logOut: () => {dispatch(user.logOut())}
    }
}

export default (connect(mapStatetoProps, mapStateToDispatch)(SignUp));