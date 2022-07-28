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
        this.handleClose = this.handleClose.bind(this);

        this.detailsComponent = React.createRef();

        this.state = {
            history: [],
            currentHistory: undefined,
            modal: {
                title: "",
                content: "",
                classes: "",
                backdrop: "",
                showModal: false,
                closeBtnLabel: "Close",
                closeBtnClass: "",
                saveChangesBtnLabel: "Save Changes",
                saveChangesBtnClass: "",
                showFooter: true,
                handleClose: () => { },
                saveChanges: () => { }
            },
            message: "",
            notifications:[]
        };
    }

    componentDidMount() {
        this.getDonationHistory();
    }

    getDonationHistory() { }

    handleClose(refresh) {
        this.setState({
            modal: {
                showModal: false
            }
        });

        if (refresh) {
            this.getAppointment();
        }
    }

    render() {
        const { history } = this.state;
        const { backdrop, showModal, showFooter, handleClose, saveChanges, title, content, classes, closeBtnLabel, closeBtnClass, saveChangesBtnLabel, saveChangesBtnClass } = this.state.modal;

        return (
            <Container>
                <Card className='mb-3'>
                    <Card.Body>
                        <Card className='d-inline-flex m-2'>
                            <Card.Header>
                                <small>Wednesday, July 20, 2021</small>
                            </Card.Header>
                            <Card.Body>
                                <div className='d-flex align-content-stretch'>
                                    <div className='d-flex flex-column p-4'>
                                        <span>Pressure</span>
                                        <span><b>126/164</b></span>
                                    </div>
                                    <div className='d-flex flex-column p-4'>
                                        <span>Heamoglobin</span>
                                        <span><b>12.35gm/dL</b></span>
                                    </div>
                                    <div className='d-flex flex-column p-4'>
                                        <span>Pulse</span>
                                        <span><b>75bpm</b></span>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <FontAwesomeIcon icon='location-pin' color='red' className='p-2 align-self-center pin'></FontAwesomeIcon>
                                    <div className='d-flex flex-column p-2'>
                                        <small>Advent Healthcare</small>
                                        <small>123, Keystone, DeLand, FL, 20001</small>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
                <Modal show={showModal} onHide={handleClose} backdrop={backdrop} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={classes}>
                        {content}
                    </Modal.Body>
                    {showFooter && (
                        <Modal.Footer>
                            <Button variant="secondary" className={closeBtnClass} onClick={handleClose}>
                                {closeBtnLabel}
                            </Button>
                            <Button variant="primary" className={saveChangesBtnClass} onClick={saveChanges}>
                                {saveChangesBtnLabel}
                            </Button>
                        </Modal.Footer>)}
                </Modal>
            </Container>
        );
    }
}

AppointmentHistory.contextType = UserContext;

export default AppointmentHistory;
