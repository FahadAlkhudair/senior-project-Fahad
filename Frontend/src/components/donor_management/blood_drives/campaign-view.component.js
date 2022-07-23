import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../../../UserContext';

import DonationManagementService from '../../../services/donor.management.service';
import CampaignDetails from './campaign-details.component';
import CampaignSlotDetails from './campaign-slot-details.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faEdit, faPlus);

function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        return <Component {...props} params={params} />
    }
    return ComponentWithRouter
}

class CampaignView extends Component {
    constructor(props) {
        super(props);
        this.getCampaign = this.getCampaign.bind(this);
        this.editCampaign = this.editCampaign.bind(this);
        this.saveCampaign = this.saveCampaign.bind(this);
        this.addSlot = this.addSlot.bind(this);
        this.saveSlot = this.saveSlot.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.detailsComponent = React.createRef();

        this.state = {
            campaign: {},
            slots: [],
            navigateTo: undefined,
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
                handleClose: () => { },
                saveChanges: () => { }
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getCampaign();
    }

    getCampaign() {
        DonationManagementService
            .getCampaign(this.props.params.campaignId)
            .then(data => {
                this.setState({
                    campaign: data,
                    showModal: false,
                });

                this.getSlots();
            });
    }

    editCampaign() {
        this.setState({
            modal: {
                ...this.state.modal,
                title: "Edit Campaign",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Update Campaign",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.saveCampaign,
                content: <CampaignDetails ref={this.detailsComponent} campaign={this.state.campaign} />
            }
        });
    }

    saveCampaign() {
        //Close Modal
        const result = this.detailsComponent.current.onSubmit();
        if (result[0]) {
            DonationManagementService
                .updateCampaign(result[1]._id, result[1])
                .then(data => {
                    //TODO: referesh list
                    this.handleClose();
                    this.getCampaign();
                });
        }
    }

    getSlots() {
        DonationManagementService
            .getAllCampaignSlots(this.props.params.campaignId)
            .then(data => {
                this.setState({
                    slots: data,
                    showModal: false,
                });
            });
    }

    addSlot() {
        let slot = {
            _id: "",
            bloodDrive: "",
            startTime: "",
            endTime: "",
            donationType: "",
            seats: 0,
        };
        this.setState({
            modal: {
                ...this.state.modal,
                title: "Add Slot",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Save Changes",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.saveSlot,
                content: <CampaignSlotDetails ref={this.detailsComponent} slot={slot} />
            }
        });
    }

    saveSlot() {
        //Close Modal
        const result = this.detailsComponent.current.onSubmit();
        if (result[0]) {
            result[1].bloodDrive = this.state.campaign._id;
            DonationManagementService
                .createCampaignSlot(result[1])
                .then(data => {
                    //TODO: referesh list
                    this.handleClose();
                    this.getSlots();
                });
        }
    }

    handleClose() {
        this.setState({
            modal: {
                showModal: false
            }
        });
    }

    handleDelete() {
        if (this.state.currentCampaign !== undefined) {
            DonationManagementService.deleteCampaign(this.state.currentCampaign._id)
                .then(data => {
                    this.setState({
                        currentCampaign: undefined,
                    });

                    this.handleClose();
                    this.getCampaign();
                });
        }
    }

    render() {
        const { campaign, slots } = this.state;
        const { backdrop, showModal, handleClose, saveChanges, title, content, classes, closeBtnLabel, closeBtnClass, saveChangesBtnLabel, saveChangesBtnClass } = this.state.modal;

        return (
            <Container>
                <Card>
                    <Card.Header>
                        <h5>Blood Drive Campaign</h5>
                    </Card.Header>
                    <Card.Body>
                        <div className='d-inline-block'>
                            <div className="fw-bold">
                                {campaign.location}
                            </div>
                            <div>
                                <small>{campaign.street}, {campaign.city}, {campaign.state}, {campaign.zipCode}</small>
                            </div>
                        </div>
                        <div className='d-inline-flex flex-row float-end'>
                            {campaign && !campaign.booked && (
                                <Button onClick={this.editCampaign} variant='outline-secondary' className='float-end mx-1'><FontAwesomeIcon icon="edit"></FontAwesomeIcon> Edit</Button>
                            )}
                            <Button onClick={this.addSlot} variant='outline-primary' className='float-end'><FontAwesomeIcon icon="plus"></FontAwesomeIcon> Add Slot</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Modal show={showModal} onHide={handleClose} backdrop={backdrop}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={classes}>
                        {content}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className={closeBtnClass} onClick={handleClose}>
                            {closeBtnLabel}
                        </Button>
                        <Button variant="primary" className={saveChangesBtnClass} onClick={saveChanges}>
                            {saveChangesBtnLabel}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Container className="mt-3">
                    <h6 className='text-uppercase'>Appointment Slots</h6>
                </Container>
                <ListGroup>
                    {slots && slots.map((slot, index) => (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    {slot.donationType} {/* <Badge pill bg={campaign?.profession ==='Physician'? "success": 'primary'} title='Donation frequency'>{campaign?.profession}</Badge> */}
                                </div>
                                <div>
                                    <small className='me-3'><b>Time:</b> {slot.startTime} - {slot.endTime} </small>
                                    <small className='me-3'><b>Booked:</b> {slot.booked}</small>
                                    <small className='me-3'><b>Available:</b> {slot.seats - slot.booked}</small>
                                </div>
                            </div>

                            {this.context.user.isHealthProvider && (
                                <div>
                                    {slot.booked == 0 && (
                                        <div>
                                            <Button onClick={() => this.editCampaign(campaign)} size='sm' variant='outline-secondary' className='mx-1'><FontAwesomeIcon icon="edit"></FontAwesomeIcon></Button>
                                            <Button onClick={() => this.deleteCampaign(campaign)} size='sm' variant='outline-danger'><FontAwesomeIcon icon="trash"></FontAwesomeIcon></Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    };
}

CampaignView.contextType = UserContext;

export default withRouter(CampaignView);