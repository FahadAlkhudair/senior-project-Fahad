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

const professions = [];
['Physician', 'Nurse'].forEach((value, idx) => {
    professions.push(<option key={idx} value={value}>{value}</option>);
});

class StaffDetails extends Component {
    constructor(props) {
        super(props);
        this.onChangeProfession = this.onChangeProfession.bind(this);
        this.onChangeSsn = this.onChangeSsn.bind(this);
        this.form = React.createRef();

        this.state = {
            profession: "",
            ssn: "",
            message: "",
            formValidated: false,
        };
    }

    componentDidMount() {
    }

    onChangeProfession(e) {
        this.setState({
            profession: e.target.value
        });
    }

    onChangeSsn(e) { 
        this.setState({
            ssn: e.target.value
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
                    profession: this.state.profession,
                    ssn: this.state.ssn
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
                <Form.Group controlId='profession'>
                    <Form.Label>Profession</Form.Label>
                    <Form.Control required as="select"
                        value={this.state.kind}
                        onChange={this.onChangeProfession}
                    >
                        <option value=''>Please Select</option>
                        {professions}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Must Provide a profession
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='ssn'>
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={this.state.ssn}
                        onChange={this.onChangeSsn}
                    />
                    <Form.Control.Feedback type="invalid">
                        Must Provide a Social Security Number
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
        );
    }
}

export default StaffDetails;