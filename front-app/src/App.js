import React, {Component} from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import { Link } from "react-router-dom";

import Main from "./screens/Main/Main";
import history from "./history";

import MyPage from "./screens/MyPage/MyPage";
import HosDetail from "./screens/HosDetail/HosDetail";
import HosRes from "./screens/Res/HosRes";
import ResTab from "./screens/Res/ResTab";
// import { Link } from "react-router-dom";
import ReviewForm from "./screens/ReviewForm/ReviewForm";
import SelectOption from "./screens/ReviewForm/selectOption";
import ReviewDetail from "./screens/ReviewDetail/ReviewDetail";
import HosMapRes from './screens/HosMapRes/HosMapRes';
import ReviewRes from './screens/Res/ReviewRes';
import SignIn from './screens/SignIn/SignIn';
import smsVer from './screens/smsVer/smsVer';
import MyPetList from './components/MyPetList/MyPetList';
import SignUp from './screens/SignUp/SignUp';
const App = () => {
  return (
    <div>
      <Router history={history}>
        <Navigation>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/Main" exact component={Main} />
            <Route path="/MyPage" exact component={MyPage} />
            <Route path="/HosDetail" exact component={HosDetail} />
            <Route path="/HosRes" exact component={HosRes} />
            <Route path="/ReviewDetail" exact component={ReviewDetail} />
            <Route path="/ResTab" exact component={ResTab} />
            <Route path="/ReviewForm" exact component={ReviewForm} />
            <Route path="/SelectOption" exact component={SelectOption} />
            <Route path="/HosMapRes" exact component={HosMapRes} />
            <Route path="/ReviewRes" exact component={ReviewRes} />
            <Route path="/SignIn" exact component={SignIn} />
            <Route path="/smsVer" exact component={smsVer} />
            <Route path="/MyPetList" exact component={MyPetList} />
            <Route path="/SignUp" exact component={SignUp} />
          </div>
        </Navigation>

      </Router>
    </div>
  );
};

export default App;

