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
import { Navigate } from 'react-router-dom';

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
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import CampaignList from './components/donor_management/blood_drives/campaigns-list.component';
import CampaignView from './components/donor_management/blood_drives/campaign-view.component';
import Questionnaire from './components/donor_management/questionnaire/questionnaires.component';
import Home from './components/home.component';
import profileService from './services/profile.service';
import Toaster from './components/toast.component';
import Donations from './components/donations/donations.component';

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

    this.updateUsername = (name) => {
      this.setState({
        username: name
      });
    };

    this.updateDonorNumber = (number)=>{
      this.setState({
        donorNumber: number
      });
    }

    this.queueNotification=(message) =>{
      let notificationList = this.state.notifications;
      notificationList.push(message);
      this.setState({
        notifications: notificationList
      });
  
      console.log(this.state.notifications);
    }
  
    this.clearNotification=(message)=> {
      let notifications = this.state.notifications;
      let index = notifications.indexOf(message);
      notifications.splice(index, 1);
      this.setState({
        notifications: notifications
      });
    }

    this.state = {
      user: {
        auth: undefined,
        isAdministrator: false,
        isHealthProvider: false,
        isDonor: false,
        isUser: false,
      },
      username: "",
      donorNumber: "",
      notifications: [],
      updateUser: this.updateUser,
      updateUsername: this.updateUsername,
      updateDonorNumber: this.updateDonorNumber,
      queueNotification: this.queueNotification,
    };
  }

  componentDidMount() {
    const user = AuthService.getUser();
    this.updateUser(user);

    ProfileService
      .getUsername()
      .then(username => this.updateUsername(username))
      .catch(() => this.updateUsername("Unknown User"));

    profileService
      .getDonorNumber()
      .then(number=>this.updateDonorNumber(number));
  }

  signOut() {
    AuthService.signOut();
  }

  render() {
    const { user, username, donorNumber } = this.state;

    return (
      <UserContext.Provider value={this.state}>
        <BrowserRouter>
          <div className="App">
            <Navbar bg="dark" expand="lg" variant='dark'>
              <Container fluid>
                <Navbar.Brand href={(user.isAdministrator || user.isHealthProvider)? "/donations":"/"}><FontAwesomeIcon icon="droplet"></FontAwesomeIcon> OB<b>MS</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  {user && user.auth ? (
                    <>
                      <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                      >
                        {(user.isUser) && (
                          <>
                            <Nav.Link href="/">Home</Nav.Link>
                          </>
                        )}
                        {(user.isHealthProvider || user.isUser) && (
                          <>
                            <Nav.Link href="/donations">Donations</Nav.Link>
                          </>
                        )}
                        {(user.isHealthProvider || user.isAdministrator) && (
                          <>
                            <Nav.Link href="/donation-management/campaigns">Campaigns</Nav.Link>
                          </>
                        )}
                        {user.isHealthProvider && (
                          <>
                            <Nav.Link href="/staff">Staff</Nav.Link>
                          </>
                        )}
                        {(user.isAdministrator) && (
                          <>
                            <Nav.Link href="/blood-component-management/donation-types">Donation Types</Nav.Link>
                            <Nav.Link href="/questionnaire">Questionnaire</Nav.Link>                          </>
                        )}
                      </Nav>
                      <Nav>
                        <NavDropdown title={username} id="userDropdown" align="end">
                          {(user.isDonor || user.isUser) && (
                            <NavDropdown.ItemText className='text-nowrap' >Donor ID: <b>{donorNumber}</b></NavDropdown.ItemText>
                          )}
                          <NavDropdown.Item href="/profile"><FontAwesomeIcon icon={['regular', 'user']}></FontAwesomeIcon> Profile</NavDropdown.Item>
                          <NavDropdown.Item href="/login" onClick={this.signOut}><FontAwesomeIcon icon="power-off"></FontAwesomeIcon> Logout</NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </>
                  ) : (
                    <Nav className='ms-auto'>
                      <NavLink href="/login">Login</NavLink>
                      <NavLink href="/register" bsPrefix='btn btn-success'>Sign Up</NavLink>
                    </Nav>
                  )}

                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div className="container mt-3">
              <Routes>
                <Route index element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/donations' element={<Donations />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/staff" element={<StaffList />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/donation-management/campaigns" element={<CampaignList />} />
                <Route path="/donation-management/campaigns/:campaignId/view" element={<CampaignView />} />
                <Route path="/blood-component-management/donation-types" element={<DonationTypeList />} />
                <Route path="/blood-component-management/donation-types/details" element={<DonationTypeDetails />} />
              </Routes>
            </div>

            <Toaster notifications={this.state.notifications} clearMessage={this.clearNotification}/>

          </div>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

App.contextType = UserContext;

export default App;
