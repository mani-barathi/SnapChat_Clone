import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import WebCam from "./components/WebCam";
import Home from "./components/Home";
import SnapPreview from './components/SnapPreview';
import Login from './components/Login';
import { useStateValue } from './context_reducers/StateProvider';

function App() {
  const [{ user }] = useStateValue()
  return (
    <div className="app">
      <Router>
        <div className="app__body">
          {(user) ? (
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
          ) : (
              <Login />
            )}

        </div>
      </Router>
    </div>
  );
}

export default App;
