import React, { Component } from 'react';
import ProfileService from '../../services/profile.service';
import UserContext from '../../UserContext';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSsn = this.onChangeSsn.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: "",
            ssn: "",
            contact: {
                phoneNumber: "",
                email: ""
            },
            address: {
                street: "",
                city: "",
                state: "",
                zipCode: 0
            },
            message: "",
            formValidated: false,
        };
    }

    componentDidMount() {
        ProfileService
            .getProfile()
            .then(profile => {
                console.log(profile);
                this.setState(profile);
            });

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSsn(e) {
        this.setState({
            ssn: e.target.value
        });
    }

    onChangePhoneNumber(e) {
        this.setState(prevState => ({
            contact: {
                ...prevState.contact,
                phoneNumber: e.target.value
            }
        }));
    }

    onChangeEmail(e) {
        this.setState(prevState => ({
            contact: {
                ...prevState.contact,
                email: e.target.value
            }
        }));
    }

    onChangeStreet(e) {
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                street: e.target.value
            }
        }));
    }

    onChangeCity(e) {
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                city: e.target.value
            }
        }));
    }

    onChangeState(e) {
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                state: e.target.value
            }
        }));
    }

    onChangeZipcode(e) {
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                zipCode: e.target.value
            }
        }));
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        if (form.checkValidity() !== false) {
            ProfileService.updateProfile({
                name: this.state.name,
                ssn: this.state.ssn,
                contact: this.state.contact,
                address: this.state.address
            })
                .then(data => {
                    this.context.updateUsername(data.name);

                    this.setState({
                        formValidated: false
                    });
                });
        } else {

            this.setState({
                formValidated: true
            });
        }
    }

    render() {
        return (
            <Container>
                <Form noValidate validated={this.state.formValidated} onSubmit={this.onSubmit} className="mx-auto shadow-lg p-3 mb-5 bg-white rounded" id="profile">
                    <h3 className='mb-3'>Profile</h3>
                    <Row  className="mb-3">
                        <Form.Group as={Col} md="8" controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={this.state.name}
                                onChange={this.onChangeName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide full names
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId='ssn'>
                            <Form.Label>SSN</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={this.state.ssn}
                                onChange={this.onChangeSsn}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide a Social Security Number
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId='phone'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={this.state.contact.phoneNumber}
                                onChange={this.onChangePhoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide a phone number
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                value={this.state.contact.email}
                                onChange={this.onChangeEmail}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide an email
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId='street'>
                            <Form.Label>Street</Form.Label>
                            <Form.Control as="textarea" rows="3" cols="10"
                                value={this.state.address.street}
                                onChange={this.onChangeStreet}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.address.city}
                                onChange={this.onChangeCity}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId='state'>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.address.state}
                                onChange={this.onChangeState}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId='zipcode'>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={this.state.address.zipCode}
                                onChange={this.onChangeZipcode}
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid Zip Code
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Button className="float-end" variant="primary" type="submit">Save Changes</Button>
                    </Row>
                </Form>
            </Container>
        );
    }
}

Profile.contextType = UserContext;

export default Profile;
