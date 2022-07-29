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
import MapService from '../../services/map.service';
import CampaignsMap from '../../components/donor_management/blood_drives/campaigns-map.component';
import DonationManagementService from '../../services/donor.management.service';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faBan } from '@fortawesome/free-solid-svg-icons';

library.add(faLocationPin, faBan);

class AppointmentHistory extends Component {
    constructor(props) {
        super(props);
        this.getDonationHistory = this.getDonationHistory.bind(this);

        this.state = {
            history: [],
            message: "",
        };
    }

    componentDidMount() {
        this.getDonationHistory();
    }

    getDonationHistory() {
        DonationManagementService
            .getHistory()
            .then(data => {
                this.setState({
                    history: data
                });
            });
    }

    render() {
        const { history } = this.state;
        return (
            <Container className='px-0'>
                {history[0] === undefined ? (
                    <>
                        <p className='px-3'>You have no donation history</p>
                    </>
                ) : (
                    <>
                        {history && history.map((item, index) => (
                                    <Card className='d-inline-flex m-2'>
                                        <Card.Header>
                                            <small>{new Date(item.slot.bloodDrive.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</small>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className='d-flex align-content-stretch'>
                                                <div className='d-flex flex-column p-4'>
                                                    <span>Pressure</span>
                                                    <span><b>{item.examResult.pressure}</b></span>
                                                </div>
                                                <div className='d-flex flex-column p-4'>
                                                    <span>Heamoglobin</span>
                                                    <span><b>{item.examResult.haemoglobin}gm/dL</b></span>
                                                </div>
                                                <div className='d-flex flex-column p-4'>
                                                    <span>Pulse</span>
                                                    <span><b>{item.examResult.pulse}bpm</b></span>
                                                </div>
                                            </div>
                                            <div className='d-flex'>
                                                <FontAwesomeIcon icon='location-pin' color='red' className='p-2 align-self-center pin'></FontAwesomeIcon>
                                                <div className='d-flex flex-column p-2'>
                                                    <small>{item.slot.bloodDrive.location}</small>
                                                    <small>{item.slot.bloodDrive.street}, {item.slot.bloodDrive.city}, {item.slot.bloodDrive.state} {item.slot.bloodDrive.zipCode}</small>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                        ))}
                    </>
                )}
            </Container>
        );
    }
}

AppointmentHistory.contextType = UserContext;

export default AppointmentHistory;
