import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import history from '../../history';
import firebase from '../../apis/firebase';

class smsVer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: ''
      },
      random: '',
      submitting: false,
      verifying: false,
      error: false,
      ver_num: '',
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onNumberInput = this.onNumberInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit = () => {
    console.log(this.state.message.to)
    this.setState({ submitting: true });
    var number = '+82' + this.state.message.to.substr(1, 10);
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    
    console.log(number)
    firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
      var code = prompt('Enter the otp', '');
        if(code === null) return;
        e.confirm(code).then(function (result) {
            console.log(result.user);
            document.querySelector('label').textContent +=  result.user.phoneNumber + "Number verified";
        }).catch(function (error) {
            console.error( error);
        });

    })
    .catch(function (error) {
        console.error( error);
    });
  }
  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }
  onNumberInput(event) {
    this.state.var_num = event.target.value
  }
  async onverclick() {
    
  }
  displayVerify() {
    if (this.state.submitting) {
      return (
        <div>
          <div>
            <input
              value={this.state.var_num}
              onChange={this.onNumberInput}
            />
          </div>
          <button onClick ={() => this.onverclick()} >
            <strong>번호 인증</strong>
          </button>
        </div>


      )
    }
    else return <div></div>
  }
  render() {
    return (
      <div>
        <h1>메시지를 전송해보자.</h1>
        <div>
          <label htmlFor="to"><strong>보낼 전화번호:</strong></label>
          <input
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </div>
        <div id="recaptcha"></div>
        <button onClick={this.onSubmit}>Click</button>
        {this.displayVerify()}
      </div>

    );
  }
}

export default smsVer;