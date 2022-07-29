import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
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
          .getProviderInventory({ healthProvider: hp })
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
    let counter = 1;

    return (
      <Container className='px-0'>
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
            <p className='px-3'>There are no inventories</p>
          </>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>DIN</th>
                <th>Blood Type</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{counter++}</td>
                  <td>{appointment?.examResult?.din}</td>
                  <td>{appointment.slot.donationType}</td>
                  <td>{ new Date( appointment.slot.bloodDrive.date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</td>
                  <td>Dispatch</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    );
  }
}

LabResults.contextType = UserContext;

export default LabResults;
