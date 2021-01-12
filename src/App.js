import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import WebCam from "./components/WebCam";
import Home from "./components/Home";
import SnapPreview from './components/SnapPreview';

function App() {

  return (
    <div className="app">
      <Router>
        <div className="app__body">
          <Switch >

            <Route path='/webcam'>
              <WebCam />
            </Route>

            <Route path="/preview" >
              <SnapPreview />
            </Route>

            <Route exact path="/" >
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
