import React, {Component} from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import TempNavigation from "./components/Navigation/TempNavigation";
import { Link } from "react-router-dom";

import Main from "./screens/Main/Main";
import history from "./history";

import MyPage from "./screens/MyPage/MyPage";
import HosDetail from "./screens/HosDetail/HosDetail";
import HosRes from "./screens/HosRes/HosRes";
import ResTab from "./components/Navigation/ResTab";
import ReviewDetail from "./screens/ReviewDetail/ReviewDetail";
import HosMapRes from './screens/HosMapRes/HosMapRes';
import ReviewRes from './screens/ReviewRes/ReviewRes';


const App = () => {
  return (
    <div>
      <Router history={history}>
        <TempNavigation>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/Main" exact component={Main} />
            <Route path="/MyPage" exact component={MyPage} />
            <Route path="/HosDetail" exact component={HosDetail} />
            <Route path="/HosRes" exact component={HosRes} />
            <Route path="/ReviewDetail" exact component={ReviewDetail} />
            <Route path="/ResTab" exact component={ResTab} />
            <Route path="/HosMapRes" exact component={HosMapRes} />
            <Route path="/ReviewRes" exact component={ReviewRes} />
          </div>
        </TempNavigation>

      </Router>
    </div>
  );
};

export default App;

