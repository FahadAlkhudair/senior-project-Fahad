import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const bloodComponentTypes = [];
['Whole Blood', 'Power Red', 'Platelet', 'Plasma'].forEach((value, idx) => {
    bloodComponentTypes.push(<option key={idx} value={value}>{value}</option>);
});

class CampaignSlotDetails extends Component {
    constructor(props) {
        super(props);
        this.onChangeBloodDrive = this.onChangeBloodDrive.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.onChangeDonationType = this.onChangeDonationType.bind(this);
        this.onChangeSeats = this.onChangeSeats.bind(this);
        this.form = React.createRef();

        const slot = props.slot ?? {};
        this.state = {
            _id: slot._id,
            bloodDrive: slot.bloodDrive,
            startTime:slot.startTime ,
            endTime: slot.endTime,
            donationType: slot.donationType,
            seats: slot.seats,
            message: "",
            formValidated: false,
        };
    }

    componentDidMount() {
    }

    onChangeBloodDrive(e) {
        this.setState({
            bloodDrive: e.target.value
        });
    }

    onChangeStartTime(e) { 
        this.setState({
            startTime: e.target.value
        });
    }

    onChangeEndTime(e) {
        this.setState({
            endTime: e.target.value
        });
    }

    onChangeDonationType(e) { 
        this.setState({
            donationType: e.target.value
        });
    }

    onChangeSeats(e) {
        this.setState({
            seats: e.target.value
        });
    }

    onSubmit() {
        if (this.form.current.checkValidity() !== false) {
            this.setState({
                formValidated: false
            });
            return [
                true,
                {
                    _id: this.state._id,
                    bloodDrive: this.state.bloodDrive,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    donationType: this.state.donationType,
                    seats: this.state.seats
                }];
        } else {
            this.setState({
                formValidated: true
            });

            return [false, {}];
        }
    }

    render() {
        return (
            <Form ref={this.form} noValidate validated={this.state.formValidated} onSubmit={this.onSubmit} className="mx-auto shadow-lg p-3 bg-white rounded" id="profile">
               
               <Row className="mb-3">
                 <Form.Group as={Col} md="6" controlId='start-time'>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        required
                        type="time"
                        value={this.state.startTime}
                        onChange={this.onChangeStartTime}
                    />
                    <Form.Control.Feedback type="invalid">
                        Must Provide a starting time
                    </Form.Control.Feedback>
                </Form.Group>
                        <Form.Group as={Col} md="6" controlId='end-time'>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control required rows="3" cols="10"
                                type="time"
                                value={this.state.endTime}
                                onChange={this.onChangeEndTime}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide an ending time
                            </Form.Control.Feedback>
                        </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId='donation-type'>
                        <Form.Label>Donation Type</Form.Label>
                        <Form.Control required as="select"
                            value={this.state.donationType}
                            onChange={this.onChangeDonationType}
                        >
                            <option value=''>Please Select</option>
                            {bloodComponentTypes}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Must provide a donation type
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId='state'>
                        <Form.Label>Seats</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            min="1"
                            value={this.state.seats}
                                onChange={this.onChangeSeats}
                            />
                            <Form.Control.Feedback type="invalid">
                                Provide number of seats
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
            </Form>
        );
    }
}

export default CampaignSlotDetails;
