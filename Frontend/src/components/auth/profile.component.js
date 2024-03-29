import React, { Component } from 'react';
import ProfileService from '../../services/profile.service';
import UserContext from '../../UserContext';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import MapService from '../../services/map.service';

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


class Profile extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSsn = this.onChangeSsn.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
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
            dob: "" ,
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

    onChangeDob(e) {
        this.setState({
            dob: e.target.value
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
            // Get Cordinates
            MapService
            .geoCodeAddress(this.state.address)
            .then((data)=>{
                if(data){
                    ProfileService.updateProfile({
                        name: this.state.name,
                        ssn: this.state.ssn,
                        dob: this.state.dob,
                        contact: this.state.contact,
                        address: this.state.address,
                        coordinates: [data.longitude, data.lattitude]
                    })
                        .then(data => {
                            this.context.updateUsername(data.name);
                            this.context.updateDonorNumber(data.donorNumber);
                            this.context.queueNotification({message: "Successfully updated profile", info:'dark'});

                            this.setState({
                                formValidated: false
                            });
                        });
                }else{
                    this.setState({
                        message: "The location provided cannot be geocoded"
                    })
                }
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
                    <Form.Group controlId='name'>
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
                    <Row  className="mb-3">
                        <Form.Group as={Col} md="6" controlId='ssn'>
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
                        <Form.Group as={Col} md="6" controlId='dob'>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                value={ formatDate(this.state.dob)}
                                onChange={this.onChangeDob}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide a valid date of birth
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
                            <Form.Control required
                                value={this.state.address.street}
                                onChange={this.onChangeStreet}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide the street
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={this.state.address.city}
                                onChange={this.onChangeCity}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide the city
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId='state'>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                maxLength="2"
                                value={this.state.address.state}
                                onChange={this.onChangeState}
                            />
                            <Form.Control.Feedback type="invalid">
                                Must provide the state
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId='zipcode'>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                max='99999'
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
