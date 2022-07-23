import React, { Component } from 'react';
import BloodComponentService from '../../services/blood.component.service';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const bloodComponentTypes = [];
['Whole Blood', 'Power Red', 'Platelet', 'Plasma'].forEach((value, idx) => {
    bloodComponentTypes.push(<option key={idx} value={value}>{value}</option>);
});

class DonationTypeDetails extends Component {
    constructor(props) {
        super(props);
        this.onChangeKind = this.onChangeKind.bind(this);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
        this.onChangeExpiresAfter = this.onChangeExpiresAfter.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.form = React.createRef();

        const donationType = props.donationType ?? {};
        this.state = {
            _id: donationType._id,
            kind: donationType.kind,
            frequency: donationType.frequency,
            expiresAfter: donationType.expiresAfter,
            description: donationType.description,
            message: "",
            formValidated: false,
        };
    }

    componentDidMount() {
    }

    onChangeKind(e) {
        this.setState({
            kind: e.target.value
        });
    }

    onChangeFrequency(e) { 
        this.setState({
            frequency: e.target.value
        });
    }

    onChangeExpiresAfter(e) { 
        this.setState({
            expiresAfter: e.target.value
        });
    }

    onChangeDescription(e) { 
        this.setState({
            description: e.target.value
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
                    kind: this.state.kind,
                    frequency: this.state.frequency,
                    expiresAfter: this.state.expiresAfter,
                    description: this.state.description
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
                <Form.Group controlId='kind'>
                    <Form.Label>Kind</Form.Label>
                    <Form.Control required as="select"
                        value={this.state.kind}
                        onChange={this.onChangeKind}
                    >
                        <option value=''>Please Select</option>
                        {bloodComponentTypes}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Must Provide a Donation Kind
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='frequency'>
                    <Form.Label>Frequency</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={this.state.frequency}
                        onChange={this.onChangeFrequency}
                    />
                    <Form.Control.Feedback type="invalid">
                        Must Provide frequency for donation
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='expires-after'>
                    <Form.Label>Expires After</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={this.state.expiresAfter}
                        onChange={this.onChangeExpiresAfter}
                    />
                    <Form.Control.Feedback type="invalid">
                        Must provide number of days after which the blood component goes bad
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" cols="10"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </Form.Group>
            </Form>
        );
    }
}

export default DonationTypeDetails;