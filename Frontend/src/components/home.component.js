import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import {Navigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../UserContext';
import MapService from '../services/map.service';
import CampaignsMap from '../components/donor_management/blood_drives/campaigns-map.component';
import DonationManagementService from '../services/donor.management.service';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AppointmentList from './appointments/appointment-list.component';
import AppointmentHistory from './appointments/appointment-history.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faBan } from '@fortawesome/free-solid-svg-icons';

library.add(faLocationPin, faBan);

class Home extends Component {

    render() {
        return (
            <Container>
                {(this.context.user.isAdministrator || this.context.user.isHealthProvider) && (
                    <Navigate to={'/donations'} replace={true} />
                )}
                <Tabs
                    defaultActiveKey="appointments"
                    id="tab-home"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="appointments" title="Appointments">
                       <AppointmentList/>
                    </Tab>
                    <Tab eventKey="history" title="History">
                        <AppointmentHistory/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

Home.contextType = UserContext;

export default Home;
