import React from "react";
import { Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";

import Main from "./screens/Main/Main";
import MyPage from "./screens/MyPage/MyPage";
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
          </div>
        </Navigation>

      </Router>
    </div>
  );
};

export default App;
