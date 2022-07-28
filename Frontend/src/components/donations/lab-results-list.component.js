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
import DonationManagementService from '../../services/donor.management.service';
import UserContext from '../../UserContext';
import ProfileService from '../../services/profile.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LabResults extends Component {
  constructor(props) {
    super(props);
    this.getAppointment = this.getAppointment.bind(this);
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
    };
  }

  componentDidMount() {
    this.getAppointment();
  }

  getAppointment() {
    ProfileService
      .getInstitution()
      .then(hp => {
        DonationManagementService
          .getProviderAppointments({ healthProvider: hp })
          .then(data => {
            this.setState({
              appointments: data
            });
          });
      });
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
    const { appointments } = this.state;

    return (
      <Container>
        <Card>
          <Card.Body>
            <h4 className='d-inline-block'>Donations</h4>
          </Card.Body>
        </Card>
        {/* <Modal show={showModal} onHide={handleClose} backdrop={backdrop}>
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
                </Modal> */}

        {appointments[0] === undefined ? (
          <>
            <p>There are no scheduled appointments</p>
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
                        {appointment.profile.name }
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
      </Container>
    );
  }
}

LabResults.contextType = UserContext;

export default LabResults;
