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
import PhysicalExamsResult from './physical-exam-result.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PhysicalExams extends Component {
  constructor(props) {
    super(props);
    this.getAppointment = this.getAppointment.bind(this);
    this.submitResults =this.submitResults.bind(this);
    this.postPhysicalResults = this.postPhysicalResults.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.detailsComponent = React.createRef();

    this.state = {
      appointments: [],
      questions: [],
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
    this.getQuestions();
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

  getQuestions() {
    DonationManagementService
        .getAllQuestionnaires()
        .then(data => {
            this.setState({
                questions: data.questions,
            });
        });
  }

  submitResults(appointment){
    this.setState({
      currentAppointment: appointment,
      modal: {
          ...this.state.modal,
          title: "Physical Exam",
          classes: "m-0 p-0",
          backdrop: "static",
          closeBtnLabel: "Close",
          saveChangesBtnLabel: "Submit",
          showModal: true,
          showFooter: true,
          handleClose: this.handleClose,
          saveChanges: this.postPhysicalResults,
          content: <PhysicalExamsResult  ref={this.detailsComponent} questions={this.state.questions} />
      }
  });
  }

  postPhysicalResults() {
    const result = this.detailsComponent.current.onSubmit();
    if (result[0]) {
      console.log(result[1]);
      DonationManagementService
      .postExamResults(this.state.currentAppointment._id, result[1])
      .then(()=>{
        this.context.queueNotification({message: "Exam results successfully posted"});
        this.handleClose();
      })
      .catch(()=>{
        this.context.queueNotification({message: "An error occured while posting results"});
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
    const { appointments } = this.state;
    const { backdrop, showModal, showFooter, handleClose, saveChanges, title, content, classes, closeBtnLabel, closeBtnClass, saveChangesBtnLabel, saveChangesBtnClass } = this.state.modal;

    return (
      <Container>
        <Card>
          <Card.Body>
            <h4 className='d-inline-block'>Appointments</h4>
          </Card.Body>
        </Card>
        <Modal show={showModal} onHide={handleClose} backdrop={backdrop} size='lg'>
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
                  <div className='d-flex w-100'>
                    <div className="fw-bold d-flex me-auto">
                      <div className="p-2">
                        <span style={{ color: 'red' }}>{appointment.profile.donorNumber}</span>&nbsp;&#183;&nbsp;{appointment.profile.name}
                      </div>
                      <small className="p-2" style={{ color: 'green', fontSize: '0.75em' }}>{appointment.slot.donationType}</small>
                    </div>
                    <div className='d-flex flex-column'>
                      {/* <Button onClick={() => this.navigateTo(campaign)} size='sm' variant='outline-success' className='mx-1'><FontAwesomeIcon icon={['regular', 'eye']}></FontAwesomeIcon></Button>
                                                    {!campaign.booked && (
                                                        <Button onClick={() => this.editCampaign(campaign)} size='sm' variant='outline-secondary' className='mx-1'><FontAwesomeIcon icon="edit"></FontAwesomeIcon></Button>
                                                    )} */}
                      <Button className='submit-results' title='Submit Results' onClick={() => this.submitResults(appointment)} size='sm' variant='outline-success'>Submit Results</Button>
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

PhysicalExams.contextType = UserContext;

export default PhysicalExams;
