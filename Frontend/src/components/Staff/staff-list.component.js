import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import StaffService from '../../services/staff.service';
import StaffDetails from './staff-details.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.getStaff = this.getStaff.bind(this);
        this.addStaff = this.addStaff.bind(this);
        this.saveStaff = this.saveStaff.bind(this);
        this.deleteStaff = this.deleteStaff.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.detailsComponent = React.createRef();

        this.state = {
            staff: [],
            currentStaff: undefined,
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
        this.getStaff();
    }

    getStaff() {
        StaffService
            .getAllStaff()
            .then(data => {
                this.setState({
                    staff: data,
                    showModal: false,
                });
            });
    }

    addStaff() {
        this.setState({
            modal: {
                ...this.state.modal,
                title: "New Staff",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Add",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.saveStaff,
                content: <StaffDetails ref={this.detailsComponent} />
            }
        });
    }

    saveStaff() {
        // Close Modal
        const result = this.detailsComponent.current.onSubmit();
        if (result[0]) {
            // Check if profile Exists
            StaffService
                .findUser(result[1].ssn)
                .then((data) => {
                    console.log(data);
                    if (data.found) {
                        StaffService
                            .addStaff({
                                profession: result[1].profession,
                                staff: data.user,
                            })
                            .then(data => {
                                //TODO: referesh list
                                this.handleClose();
                                this.getStaff();
                            });
                    }else{
                        // TODO: Notify user that staff was not found
                    }
                })
        }

    }

    deleteStaff(staff) {
        this.setState({
            currentStaff: staff,
            modal: {
                ...this.state.modal,
                title: "Remove Staff",
                closeBtnLabel: "Cancel",
                saveChangesBtnLabel: "Delete",
                saveChangesBtnClass: "btn-danger",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.handleDelete,
                content: <p>Are you sure you want to remove <b>{staff.name}-{staff.ssn}</b> from your staff roll?</p>
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
        if (this.state.currentStaff !== undefined) {
            StaffService.deleteStaff(this.state.currentStaff._id)
                .then(data => {
                    this.setState({
                        currentStaff: undefined,
                    });

                    this.handleClose();
                    this.getStaff();
                });
        }
    }

    render() {
        const { staff } = this.state;
        const { backdrop, showModal, handleClose, saveChanges, title, content, classes, closeBtnLabel, closeBtnClass, saveChangesBtnLabel, saveChangesBtnClass } = this.state.modal;

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <h4 className='d-inline-block'>Staff</h4>
                        <Button onClick={this.addStaff} className='float-end'><FontAwesomeIcon icon="circle-plus"></FontAwesomeIcon> Add</Button>
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
                    {staff && staff.map((member, index) => (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    {member.staff.name} <Badge pill bg={member.profession ==='Physician'? "success": 'primary'} title='Donation frequency'>{member.profession}</Badge>
                                </div>
                            </div>

                            <Button onClick={() => this.deleteStaff(member)} size='sm' variant='outline-danger'><FontAwesomeIcon icon="trash"></FontAwesomeIcon></Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    };
}

export default StaffList;