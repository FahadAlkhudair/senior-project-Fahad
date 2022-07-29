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

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.showAppointments = this.showAppointments.bind(this);
        this.getAppointment = this.getAppointment.bind(this);
        this.confirmCancelAppointment = this.confirmCancelAppointment.bind(this);
        this.cancelAppointment = this.cancelAppointment.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.detailsComponent = React.createRef();

        this.state = {
            appointments: [],
            currentAppointment: undefined,
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
            notifications: []
        };
    }

    componentDidMount() {
        this.getAppointment();
    }

    showAppointments() {
        this.setState({
            modal: {
                ...this.state.modal,
                title: "Select Blood Drive",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Book",
                showModal: true,
                showFooter: false,
                handleClose: this.handleClose,
                saveChanges: this.bookAppointment,
                content: <CampaignsMap ref={this.detailsComponent} close={() => this.handleClose(true)} />
            }
        });
    }

    confirmCancelAppointment(appointment) {
        this.setState({
            currentAppointment: appointment,
            modal: {
                ...this.state.modal,
                title: "Cancel Appointment",
                classes: "m-0 p-2",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Cancel Appointment",
                showModal: true,
                showFooter: true,
                handleClose: this.handleClose,
                saveChanges: this.cancelAppointment,
                content: <p>Are you sure you want to cancel appointment to be held at <b>{appointment.slot.bloodDrive.location}</b> on {new Date(appointment.slot.bloodDrive.date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}?</p>
            }
        });
    }

    getAppointment() {
        DonationManagementService
            .getAppointments()
            .then(data => {
                this.setState({
                    appointments: data
                });
            });
    }

    cancelAppointment() {
        if (this.state.currentAppointment !== undefined) {
            DonationManagementService
                .cancelAppointment(this.state.currentAppointment._id)
                .then(data => {
                    this.setState({
                        currentAppointment: undefined
                    });
                    this.handleClose();
                    this.getAppointment();
                    this.context.queueNotification({ message: "Appointment cancelled successfully" });
                });
        }
    }

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
        const { appointments, history } = this.state;
        const { backdrop, showModal, showFooter, handleClose, saveChanges, title, content, classes, closeBtnLabel, closeBtnClass, saveChangesBtnLabel, saveChangesBtnClass } = this.state.modal;

        return (
            <Container className='px-0'>
                <Card className='mb-2'>
                    <Card.Body>
                        <Button onClick={this.showAppointments} className='float-end'> Book Appointment</Button>
                    </Card.Body>
                </Card>

                {appointments[0] === undefined ? (
                    <>
                        <p className='px-3'>You have no scheduled appointments</p>
                    </>
                ) : (
                    <ListGroup>
                        {appointments && appointments.map((appointment, index) => (
                            <ListGroup.Item
                                key={index}
                                as="li"
                                className="d-flex justify-content-between align-items-start appointment"
                            >
                                <div className="ms-2 me-auto w-100 d-flex">
                                    <div className='d-flex flex-column w-100'>
                                        <div className="fw-bold d-flex">
                                            <div className="p-2">
                                                {new Date(appointment.slot.bloodDrive.date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })} at {appointment.slot.startTime}
                                            </div>
                                            <div className="p-2" style={{ color: 'green' }}>{appointment.slot.donationType}</div>
                                        </div>
                                        <div className='d-flex w-100'>
                                            <FontAwesomeIcon icon='location-pin' color='red' className='p-2 align-self-center pin'></FontAwesomeIcon>

                                            <div className='d-flex flex-column me-auto p-2'>
                                                <small>{appointment.slot.bloodDrive.location}</small>
                                                <small>{appointment.slot.bloodDrive.street}, {appointment.slot.bloodDrive.city}</small>
                                                <small>{appointment.slot.bloodDrive.state} {appointment.slot.bloodDrive.zipCode}</small>
                                            </div>
                                            <div>
                                                {/* <Button onClick={() => this.navigateTo(campaign)} size='sm' variant='outline-success' className='mx-1'><FontAwesomeIcon icon={['regular', 'eye']}></FontAwesomeIcon></Button>
                                                    {!campaign.booked && (
                                                        <Button onClick={() => this.editCampaign(campaign)} size='sm' variant='outline-secondary' className='mx-1'><FontAwesomeIcon icon="edit"></FontAwesomeIcon></Button>
                                                    )} */}
                                                <Button className='cancel-appointment' title='Cancel Appointment' onClick={() => this.confirmCancelAppointment(appointment)} size='sm' variant='outline-danger'><FontAwesomeIcon icon="ban"></FontAwesomeIcon></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* {this.context.user.isHealthProvider && (
                                            <div>
                                                <Button onClick={() => this.navigateTo(campaign)} size='sm' variant='outline-success' className='mx-1'><FontAwesomeIcon icon={['regular', 'eye']}></FontAwesomeIcon></Button>
                                                {!campaign.booked && (
                                                    <Button onClick={() => this.editCampaign(campaign)} size='sm' variant='outline-secondary' className='mx-1'><FontAwesomeIcon icon="edit"></FontAwesomeIcon></Button>
                                                )}
                                                <Button onClick={() => this.deleteCampaign(campaign)} size='sm' variant='outline-danger'><FontAwesomeIcon icon="trash"></FontAwesomeIcon></Button>
                                            </div>
                                        )} */}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

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

AppointmentList.contextType = UserContext;

export default AppointmentList;
