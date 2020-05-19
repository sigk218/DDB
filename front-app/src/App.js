import React from "react";
import { Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";

import Main from "./screens/Main/Main";
import MyPage from "./screens/MyPage/MyPage";
import HosDetail from "./screens/HosDetail/HosDetail";
import HosRes from "./screens/HosRes/HosRes";
import history from "./history";
import { Link } from "react-router-dom";
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
          </div>
        </Navigation>

      </Router>
    </div>
  );
};

export default App;
