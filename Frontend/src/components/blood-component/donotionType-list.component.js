import React, { Component } from 'react';
import BloodComponentService from '../../services/blood.component.service';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../../UserContext';

import DonationTypeDetails from './donationType-details.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';

library.add(faTrash, faEdit, faCirclePlus);

class DonationTypeList extends Component {
    constructor(props) {
        super(props);
        this.getDonationTypes = this.getDonationTypes.bind(this);
        this.newDonationType = this.newDonationType.bind(this);
        this.saveDonationType = this.saveDonationType.bind(this);
        this.editDonationType = this.editDonationType.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.detailsComponent = React.createRef();

        this.state = {
            donationTypes: [],
            currentDonationType: undefined,
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
        this.getDonationTypes();
    }

    getDonationTypes() {
        BloodComponentService
            .getAllDonationTypes()
            .then(data => {
                this.setState({
                    donationTypes: data,
                    showModal: false,
                });
            });
    }

    newDonationType() {
        let donationType = {
            kind: "",
            frequency: 7,
            expiresAfter: 21,
            description: "",
        };
        this.setState({
            currentDonationType: undefined,
            modal: {
                ...this.state.modal,
                title: "New Donation Type",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Save Changes",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.saveDonationType,
                content: <DonationTypeDetails ref={this.detailsComponent} donationType={donationType} />
            }
        });
    }

    editDonationType(donationType) {
        this.setState({
            currentDonationType: undefined,
            modal: {
                ...this.state.modal,
                title: "Edit Donation Type",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Update Changes",
                saveChangesBtnClass: "btn-success",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.saveDonationType,
                content: <DonationTypeDetails ref={this.detailsComponent} donationType={donationType} />
            }
        });
    }

    deleteDonationType(donationType) {
        this.setState({
            currentDonationType: donationType,
            modal: {
                ...this.state.modal,
                title: "Delete Donation Type",
                closeBtnLabel: "Cancel",
                saveChangesBtnLabel: "Delete",
                saveChangesBtnClass: "btn-danger",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.handleDelete,
                content: <p>Are you sure you want to delete <b>{donationType.kind}</b>?</p>
            }
        });
    }

    handleDelete() {
        if (this.state.currentDonationType !== undefined) {
            BloodComponentService.deleteDonationType(this.state.currentDonationType._id)
                .then(data => {
                    this.setState({
                        currentDonationType: undefined,
                    });

                    this.handleClose();
                    this.getDonationTypes();
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

    saveDonationType() {

        // Close Modal
        const result = this.detailsComponent.current.onSubmit();
        if (result[0]) {
            if (result[1]._id === undefined) {
                BloodComponentService
                    .createDonationType(result[1])
                    .then(data => {
                        //TODO: referesh list
                        this.handleClose();
                        this.getDonationTypes();
                    });
            } else {
                BloodComponentService
                    .updateDonationType(result[1]._id, result[1])
                    .then(data => {
                        //TODO: referesh list
                        this.handleClose();
                        this.getDonationTypes();
                    });
            }
        }

    }

    render() {
        const { donationTypes } = this.state;
        const { backdrop, showModal, handleClose, saveChanges, title, content, classes, closeBtnLabel, closeBtnClass, saveChangesBtnLabel, saveChangesBtnClass } = this.state.modal;

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <h4 className='d-inline-block'>Donation Types</h4>
                        {this.context.user.isAdministrator && (
                            <Button onClick={this.newDonationType} className='float-end'><FontAwesomeIcon icon="circle-plus"></FontAwesomeIcon> New</Button>
                        )}
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
                    {donationTypes && donationTypes.map((donationType, index) => (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                {/* <div className="fw-bold">{donationType.kind}</div>
                                <p>{donationType.description}</p> */}
                                <details>
                                    <summary className="fw-bold">
                                        {donationType.kind}
                                        <div className='d-inline-flex flex-row mx-2'>
                                            <Badge pill bg="secondary" title='Donation frequency'>{donationType.frequency}</Badge>
                                            <Badge pill bg="danger" title='Component expires after in days'>{donationType.expiresAfter}</Badge>
                                        </div>
                                    </summary>
                                    {donationType.description}
                                </details>
                            </div>
                            {this.context.user.isAdministrator && (
                                <div>
                                    <Button onClick={() => this.editDonationType(donationType)} size='sm' variant='outline-secondary' className='mx-1'><FontAwesomeIcon icon="edit"></FontAwesomeIcon></Button>
                                    <Button onClick={() => this.deleteDonationType(donationType)} size='sm' variant='outline-danger'><FontAwesomeIcon icon="trash"></FontAwesomeIcon></Button>
                                </div>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

DonationTypeList.contextType = UserContext;

export default DonationTypeList;