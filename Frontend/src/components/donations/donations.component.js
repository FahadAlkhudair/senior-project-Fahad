import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../../UserContext';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PhysicalExams from './physical-exam-list.component';
import LabResults from './lab-results-list.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faBan } from '@fortawesome/free-solid-svg-icons';

library.add(faLocationPin, faBan);

class Donations extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Container>
                {(this.context.user.isAdministrator) && (
                    <Navigate to={'/campaigns'} replace={true} />
                )}
                {(this.context.user.isDonor) && (
                    <Navigate to={'/'} replace={true} />
                )}
                <Tabs
                    defaultActiveKey="physical-exam"
                    id="tab-donations"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="physical-exam" title="Waiting List">
                        <PhysicalExams />
                    </Tab>
                    <Tab eventKey="lab-results" title="Inventory">
                        <LabResults />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

Donations.contextType = UserContext;

export default Donations;
