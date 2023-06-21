import { Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import SignUpPage from "./Components/Sign up page/sign-up-page";
import SignInPage from "./Components/Sign in page/sign-in-page";
import HomePage from "./Components/Home Page/home-page";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const userIsLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signin-page" />
        </Route>

        {!userIsLoggedIn && (
          <Route path="/signin-page" exact>
            <SignInPage />
          </Route>
        )}

        {!userIsLoggedIn && (
          <Route path="/signup-page" exact>
            <SignUpPage />
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="/home-page" exact>
            <HomePage />
          </Route>
        )}

        {!userIsLoggedIn && (
          <Route path="*">
            <Redirect to="/" exact />
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="*">
            <Redirect to="/home-page" exact />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
