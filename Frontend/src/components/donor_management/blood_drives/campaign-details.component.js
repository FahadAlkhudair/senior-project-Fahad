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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

class CampaignDetails extends Component {
    constructor(props) {
        super(props);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZipCode = this.onChangeZipCode.bind(this);
        this.form = React.createRef();

        const campaign = props.campaign ?? {};
        this.state = {
            _id: campaign._id,
            date: formatDate(campaign.date),
            location: campaign.location,
            street: campaign.street,
            city: campaign.city,
            state: campaign.state,
            zipCode: campaign.zipCode,
            message: "",
            formValidated: false,
        };
    }

    componentDidMount() {
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeLocation(e) { 
        this.setState({
            location: e.target.value
        });
    }

    onChangeStreet(e) {
        this.setState({
            street: e.target.value
        });
    }

    onChangeCity(e) { 
        this.setState({
            city: e.target.value
        });
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }

    onChangeZipCode(e) { 
        this.setState({
            zipCode: e.target.value
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
                    date: this.state.date,
                    location: this.state.location,
                    street: this.state.street,
                    city: this.state.city,
                    state: this.state.state,
                    zipCode: this.state.zipCode
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
                <Form.Group controlId='date'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control required
                        type="date"
                        value={this.state.date}
                        onChange={this.onChangeDate}
                    />
                    <Form.Control.Feedback type="invalid">
                        Must Provide a valid date
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='location'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={this.state.location}
                        onChange={this.onChangeLocation}
                    />
                    <Form.Control.Feedback type="invalid">
                        Must Provide a location for the campaign
                    </Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId='street'>
                            <Form.Label>Street</Form.Label>
                            <Form.Control required rows="3" cols="10"
                                type="text"
                                value={this.state.street}
                                onChange={this.onChangeStreet}
                            />
                            <Form.Control.Feedback type="invalid">
                                Provide a street
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={this.state.city}
                                onChange={this.onChangeCity}
                            />
                            <Form.Control.Feedback type="invalid">
                                Provide a City
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId='state'>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                maxLength={2}
                                value={this.state.state}
                                onChange={this.onChangeState}
                            />
                            <Form.Control.Feedback type="invalid">
                                Provide a state
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId='zipcode'>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={this.state.zipCode}
                                onChange={this.onChangeZipCode}
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid Zip Code
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
            </Form>
        );
    }
}

export default CampaignDetails;
