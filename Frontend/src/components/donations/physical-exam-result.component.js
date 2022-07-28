import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {uniq, map, groupBy, chain} from 'lodash';

const statuses = [];
['Passed', 'Failed', 'Ineligible'].forEach((value, idx) => {
  statuses.push(<option key={idx} value={value}>{value}</option>);
});

class PhysicalExamsResult extends Component {
  constructor(props) {
    super(props);
    this.onChangeHaemoglobin = this.onChangeHaemoglobin.bind(this);
    this.onChangePressure = this.onChangePressure.bind(this);
    this.onChangePulse = this.onChangePulse.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.form = React.createRef();

    this.state = {
      examResult: {
        questions: this.props.questions,
        answers: [],
        haemoglobin: '',
        pressure: '',
        pulse: '',
        status: '',
        remarks: '',
      },
      message: "",
      formValidated: false,
    };
  }

  componentDidMount() {
  }

  onChangeHaemoglobin(e) {
    this.setState({
      examResult: {
        ...this.state.examResult,
        haemoglobin: e.target.value
      }
    });
  }
  onChangePressure(e) {
    this.setState({
      examResult: {
        ...this.state.examResult,
        pressure: e.target.value
      }
    });
  }
  onChangePulse(e) {
    this.setState({
      examResult: {
        ...this.state.examResult,
        pulse: e.target.value
      }
    });
  }

  onChangeStatus(e) {
    this.setState({
      examResult: {
        ...this.state.examResult,
        status: e.target.value
      }
    });
  }

  onChangeRemarks(e) {
    this.setState({
      examResult: {
        ...this.state.examResult,
        remarks: e.target.value
      }
    });
  }

  onChangeAnswer(index, value){
    let answers = this.state.examResult.answers;
    answers[index] = value;
    this.setState({
      examResult:{
        ...this.state.examResult,
        answers: answers
      }
    });
  }

  onSubmit() {
    if (this.form.current.checkValidity() !== false) {
      this.setState({
        formValidated: false
      });
      return [
        true,
        this.state.examResult];
    } else {
      this.setState({
        formValidated: true
      });

      return [false, {}];
    }
  }

  getAnswer(key){
    if(this.state.examResult.answers.hasOwnProperty(key)){
      return this.state.examResult.answers[key];
    }
    
    return null;
  }

  render() {
    let counter =0;
    const {questions } = this.props
    return (
      <Form ref={this.form} noValidate validated={this.state.formValidated} onSubmit={this.onSubmit} className="p-3 bg-white rounded" style={{maxWidth:'100%'}} id="profile">
                    {questions &&  chain(questions).groupBy(q=>q.category).map((questions, category)=>({category, questions})).value().map((item,index)=> (
                        <div
                            key={index}
                            className="d-flex justify-content-between align-items-start mb-3"
                        >
                            <div className="ms-2 w-100">
                              <h6>{item.category} </h6>
                                        {item.questions && item.questions.map((question, qnIndex) => (
                                            <div key={qnIndex} className='d-flex mb-1'>
                                               <div className='me-auto'>{++counter}. {question.question}</div>
                                            <Form.Check required inline label="True" name={`group-${counter}`} type='radio' id={`radio-${counter}`} checked={this.getAnswer(`q-${index}-${qnIndex}`)===true} onChange={()=>this.onChangeAnswer(`q-${index}-${qnIndex}`,true)} />
                                            <Form.Check required inline label="False" name={`group-${counter}`} type='radio' id={`radio-${counter}`} checked={this.getAnswer(`q-${index}-${qnIndex}`)===false}  onChange={()=>this.onChangeAnswer(`q-${index}-${qnIndex}`,false)} />
                                            </div>
                                        ))}
                            </div>
                        </div>
                    ))}

        <Form.Group controlId='pressure'>
          <Form.Label>Blood Pressure</Form.Label>
          <Form.Control
            required
            type="text"
            maxLength='7'
            value={this.state.pressure}
            onChange={this.onChangePressure}
          />
          <Form.Control.Feedback type="invalid">
            Provide readings for blood pressure
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='haemoglobin'>
          <Form.Label>haemoglobin</Form.Label>
          <Form.Control
            required
            type="text"
            max='99'
            value={this.state.haemoglobin}
            onChange={this.onChangeHaemoglobin}
          />
          <Form.Control.Feedback type="invalid">
            Provide a haemoglbin reading
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='pulse'>
          <Form.Label>Pulse Rate</Form.Label>
          <Form.Control
            required
            type="number"
            max='200'
            value={this.state.pulse}
            onChange={this.onChangePulse}
          />
          <Form.Control.Feedback type="invalid">
            Provide a heart beat rate
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='remarks'>
          <Form.Label>Remarks</Form.Label>
          <Form.Control as='textarea'
            required
            type="text"
            value={this.state.remarks}
            onChange={this.onChangeRemarks}
          />
          <Form.Control.Feedback type="invalid">
            Must Provide some remarks
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='status'>
          <Form.Label>Status</Form.Label>
          <Form.Control required as="select"
            value={this.state.status}
            onChange={this.onChangeStatus}
          >
            <option value=''>Please Select</option>
            {statuses}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Must Provide a valid status
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    );
  }
}

export default PhysicalExamsResult;
