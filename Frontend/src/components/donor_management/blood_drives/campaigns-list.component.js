import React, { Component } from 'react';
import { Navigate} from 'react-router-dom';
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
import MapService from '../../../services/map.service';

import DonationManagementService from '../../../services/donor.management.service';
import CampaignDetails from './campaign-details.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

library.add(faEye);

class CampaignList extends Component {
    constructor(props) {
        super(props);
        this.getCampaigns = this.getCampaigns.bind(this);
        this.addCampaign = this.addCampaign.bind(this);
        this.saveCampaign = this.saveCampaign.bind(this);
        this.deleteCampaign = this.deleteCampaign.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.navigateTo = this.navigateTo.bind(this);

        this.detailsComponent = React.createRef();

        this.state = {
            campaigns: [],
            currentCampaign: undefined,
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
        this.getCampaigns();
    }

    getCampaigns() {
        DonationManagementService
            .getAllCampaigns()
            .then(data => {
                this.setState({
                    campaigns: data,
                    showModal: false,
                });
            });
    }

    addCampaign() {
        let campaign = {
            date: new Date().toString(),
            location: "",
            street: "",
            city: "",
            state: "",
            zipCode: ""
        };
        this.setState({
            modal: {
                ...this.state.modal,
                title: "New Campaign",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Add",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.saveCampaign,
                content: <CampaignDetails ref={this.detailsComponent} campaign={campaign} />
            }
        });
    }

    editCampaign(campaign){
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
                content: <CampaignDetails ref={this.detailsComponent} campaign={campaign} />
            }
        });
    }

    saveCampaign() {
        // Close Modal
        const result = this.detailsComponent.current.onSubmit();
        if (result[0]) {
            let  {street, city, state, zipCode}  = result[1];
            MapService
            .geoCode(street,city,state,zipCode)
            .then((data)=>{
                console.log(data);
                if(data){
                    result[1].coordinates = [data.longitude, data.lattitude]
                    if (result[1]._id === undefined) {
                        DonationManagementService
                            .createCampaign(result[1])
                            .then(data => {
                                //TODO: referesh list
                                this.setState({
                                    navigateTo: '/donation-management/campaigns/' + data.id + '/view'
                                });
                            });
                    } else {
                        DonationManagementService
                            .updateCampaign(result[1]._id, result[1])
                            .then(data => {
                                //TODO: referesh list
                                this.handleClose();
                                this.getCampaigns();
                            });
                    }
                }else{
                    this.setState({
                        message: "The location provided cannot be geocoded"
                    })
                }
            });
        }
    }

    deleteCampaign(campaign) {
        this.setState({
            currentCampaign: campaign,
            modal: {
                ...this.state.modal,
                title: "Delete Campaign",
                closeBtnLabel: "Cancel",
                saveChangesBtnLabel: "Delete",
                saveChangesBtnClass: "btn-danger",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.handleDelete,
                content: <p>Are you sure you want to delete campaign to be held at <b>{campaign.location}</b> on {new Date(campaign.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}?</p>
            }
        });
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
                    this.getCampaigns();
                });
        }
    }

    navigateTo(campaign){
        this.setState({
            navigateTo: '/donation-management/campaigns/' + campaign._id + '/view'
        });
    }

    render() {
        const { campaigns, navigateTo } = this.state;
        const { backdrop, showModal, handleClose, saveChanges, title, content, classes, closeBtnLabel, closeBtnClass, saveChangesBtnLabel, saveChangesBtnClass } = this.state.modal;

        return (
            <Container>
                {navigateTo && (
                    <Navigate to={navigateTo}/>
                )}
                <Card>
                    <Card.Body>
                        <h4 className='d-inline-block'>Campaigns</h4>
                        <Button onClick={this.addCampaign} className='float-end'><FontAwesomeIcon icon="circle-plus"></FontAwesomeIcon> Add</Button>
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
                <ListGroup>
                    {campaigns && campaigns.map((campaign, index) => (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    {campaign.location}
                                </div>
                                <div>
                                    <small>{campaign.street}, {campaign.city}, {campaign.state}, {campaign.zipCode}</small>
                                </div>
                            </div>

                            {this.context.user.isHealthProvider && (
                                <div>
                                    <Button onClick={() => this.navigateTo (campaign)} size='sm' variant='outline-success' className='mx-1'><FontAwesomeIcon icon={['regular','eye']}></FontAwesomeIcon></Button>
                                    {!campaign.booked && (
                                        <Button onClick={() => this.editCampaign (campaign)} size='sm' variant='outline-secondary' className='mx-1'><FontAwesomeIcon icon="edit"></FontAwesomeIcon></Button>
                                    )} 
                                    <Button onClick={() => this.deleteCampaign(campaign)} size='sm' variant='outline-danger'><FontAwesomeIcon icon="trash"></FontAwesomeIcon></Button>
                                </div>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    };
}

CampaignList.contextType = UserContext;

export default CampaignList;