import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle'
import React, { Component } from 'react';
import AuthService from './services/auth.service';
import ProfileService from './services/profile.service';
import config from './config';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from './UserContext';
import SignIn from './components/auth/signin.component';
import SignUp from './components/auth/signup.component';
import Profile from './components/auth/profile.component';
import DonationTypeList from './components/blood-component/donotionType-list.component';
import DonationTypeDetails from './components/blood-component/donationType-details.component';
import StaffList from './components/Staff/staff-list.component';
import AppointmentList from './components/Appointments/appointment-list.component';

import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell} from '@fortawesome/free-regular-svg-icons';

library.add(faDroplet, faUser, faPowerOff, faBell);

class App extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);

    this.updateUser = (user) => {
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

    this.updateUsername = (name)=> {
      this.setState({
        username: name
      });
    };

    this.state = {
      user: {
        auth: undefined,
        isAdministrator: false,
        isHealthProvider: false,
        isDonor: false,
        isUser: false,
      },
      username:"",
      updateUser: this.updateUser,
      updateUsername: this.updateUsername
    };
  }

  componentDidMount() {
    const user = AuthService.getUser();
    this.updateUser(user);

    ProfileService
      .getUsername()
      .then(username => this.updateUsername(username))
      .catch(() => this.updateUsername("Unknown User"));
  }

  signOut() {
    AuthService.signOut();
  }

  render() {
    const { user, username } = this.state;

    return (
      <UserContext.Provider value={this.state}>
        <BrowserRouter>
          <div className="App">
            <Navbar bg="dark" expand="lg" variant='dark'>
              <Container fluid>
                <Navbar.Brand href="#"><FontAwesomeIcon icon="droplet"></FontAwesomeIcon> OB<b>MS</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link href="/">Appointments</Nav.Link>
                    <Nav.Link href="/staff">Staff</Nav.Link>
                    <NavDropdown title="Donations Management" id="donoation-management" align="end">
                      <NavDropdown.Item href="#action3">Campaigns</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Questionnaires
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Component Management" id="component-management" align="end">
                      <NavDropdown.Item href="/blood-component-management/donation-types">Donation Types</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  { user && user.auth?(
                    <Nav>
                    <NavDropdown title={username} id="userDropdown" align="end">
                      <NavDropdown.Item href="/profile"><FontAwesomeIcon icon={['regular', 'user']}></FontAwesomeIcon> Profile</NavDropdown.Item>
                      <NavDropdown.Item href="/login" onClick={this.signOut}><FontAwesomeIcon icon="power-off"></FontAwesomeIcon> Logout</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  ):(
                    <Nav>
                    <NavLink href="/login">Login</NavLink>
                    <NavLink href="/register" bsPrefix='btn btn-success'>Sign Up</NavLink>
                    </Nav>
                  )}
                  
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div className="container mt-3">
              <Routes>
                <Route index element={<AppointmentList />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/staff" element={<StaffList />} />
                {/* <Route path="/donation-management/questionnaires" element={<QuestionnaresList />} /> */}
                <Route path="/blood-component-management/donation-types" element={<DonationTypeList />} />
                <Route path="/blood-component-management/donation-types/details" element={<DonationTypeDetails />} />
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