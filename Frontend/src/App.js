import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, useContext } from 'react';
import AuthService from './services/auth.service';
import config from './config';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserContext from './UserContext';
import Home from './components/home.component';
import SignIn from './components/auth/signin.component';
import SignUp from './components/auth/signup.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    
    this.updateUser = (user)=>{
      if (user) {
        this.setState({
          user: {
            auth: user,
            isAdministrator: user.role === config.roles[0],
            isHealthProvider: user.role === config.roles[1],
            isDonor: user.role === config.roles[2],
            isUser: user.role === config.roles[3]
          }
        });
      }
    };

    this.state = {
      user: {
        auth: undefined,
        isAdministrator: false,
        isHealthProvider: false,
        isDonor: false,
        isUser: false,
      },
      updateUser: this.updateUser    
    };
  }

  componentDidMount() {
    const user = AuthService.getUser();
    this.updateUser(user);
  }

  signOut() {
    AuthService.signOut();
  }

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={this.state}>
      <BrowserRouter>
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              OBMS
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
            </div>
            {user.auth ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {user.auth.names}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.signOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Register
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

App.contextType = UserContext;

export default App;
