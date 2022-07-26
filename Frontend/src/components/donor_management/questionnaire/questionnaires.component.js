import React, { Component } from 'react';
import DonationManagementService from '../../../services/donor.management.service';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../../../UserContext';
import {uniq, map, groupBy, chain} from 'lodash';

import Question from './question.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCirclePlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';

library.add(faTrash, faEdit, faCirclePlus,faSave);

class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.getQuestionnaire = this.getQuestionnaire.bind(this);
        this.newQuestion = this.newQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.updateQuestionnaire = this.updateQuestionnaire.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.detailsComponent = React.createRef();

        this.state = {
            questionnaire: {
                _id: undefined,
                questions:[]
            },
            currentQuestion: undefined,
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
                handleClose: () => { },
                saveChanges: () => { }
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getQuestionnaire();
    }

    getQuestionnaire() {
        DonationManagementService
            .getAllQuestionnaires()
            .then(data => {
                this.setState({
                    questionnaire: data,
                    showModal: false,
                });
            });
    }

    newQuestion() {
        let question = {
            category: "",
            question: ""
        };
        let categories = uniq(map(this.state.questionnaire.questions,'category')); //this.state.questionnaire.questions.map(a=>a.category)
        console.log(categories);
        this.setState({
            currentQuestion: undefined,
            modal: {
                ...this.state.modal,
                title: "New Question",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Add Question",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.saveQuestion,
                content: <Question ref={this.detailsComponent} categories={categories} question={question} />
            }
        });
    }

    editQuestion(question) {
        let categories = uniq(map(this.state.questionnaire.questions));
        this.setState({
            currentDonationType: undefined,
            modal: {
                ...this.state.modal,
                title: "Edit Donation Type",
                classes: "m-0 p-0",
                backdrop: "static",
                closeBtnLabel: "Close",
                saveChangesBtnLabel: "Update Changes",
                saveChangesBtnClass: "btn-success",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.saveDonationType,
                content:  <Question ref={this.detailsComponent} categories={categories} question={question} />
            }
        });
    }

    deleteQuestion(question) {
        this.setState({
            currentQuestion: question,
            modal: {
                ...this.state.modal,
                title: "Delete Question",
                closeBtnLabel: "Cancel",
                saveChangesBtnLabel: "Delete",
                saveChangesBtnClass: "btn-danger",
                showModal: true,
                handleClose: this.handleClose,
                saveChanges: this.handleDelete,
                content: <p>Are you sure you want to delete this question?</p>
            }
        });
    }

    updateQuestionnaire(){
        console.log(this.state.questionnaire);
        DonationManagementService
        .updateQuestionnaire(this.state.questionnaire._id, this.state.questionnaire)
        .then(data => {
            this.getQuestionnaire();
        });
    }

    handleDelete() {
        if (this.state.currentQuestion !== undefined) {
            const index = this.state.questionnaire.questions.indexOf(this.state.currentQuestion);
            if (index > -1) { // only splice array when item is found
                this.state.questionnaire.questions.splice(index, 1); // 2nd parameter means remove one item only
            }
            this.state.currentQuestion = undefined;
            this.handleClose();
        }
    }

    handleClose() {
        this.setState({
            modal: {
                showModal: false
            }
        });
    }

    saveQuestion() {
        // Close Modal
        const result = this.detailsComponent.current.onSubmit();
        console.log(this.state.questionnaire);
        if (result[0]) {
            this.state.questionnaire.questions.push(result[1])
            this.handleClose();
        }
    }

    render() {
        let counter =1;
        const { questions } = this.state.questionnaire;
        const { backdrop, showModal, handleClose, saveChanges, title, content, classes, closeBtnLabel, closeBtnClass, saveChangesBtnLabel, saveChangesBtnClass } = this.state.modal;

        return (
            <Container>
                <Card>
                    <Card.Body>
                    <h4 className='d-inline-block'>Questionnaire</h4>
                        {this.context.user.isAdministrator && (
                            <div>
                                <Button onClick={this.updateQuestionnaire} className='float-end' variant='success'><FontAwesomeIcon icon="save"></FontAwesomeIcon> Update Questionnaire</Button>
                                <Button onClick={this.newQuestion} className='float-end me-2'><FontAwesomeIcon icon="circle-plus"></FontAwesomeIcon> New Question</Button>
                            </div>)}
                    </Card.Body>
                </Card>
                <Modal show={showModal} onHide={handleClose} backdrop={backdrop}>
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
                <ListGroup>
                    {questions &&  chain(questions).groupBy(q=>q.category).map((questions, category)=>({category, questions})).value().map((item,index)=> (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 w-100">
                                <details>
                                    <summary className="fw-bold">
                                        {item.category} 
                                    </summary>
                                        {item.questions && item.questions.map((question, qnIndex) => (
                                            <div key={qnIndex}>
                                                {counter++}. {question.question}
                                                {this.context.user.isAdministrator && (
                                                        <Button onClick={() => this.deleteQuestion(question)} className="ms-2" size='sm' variant='danger'><FontAwesomeIcon icon="trash"></FontAwesomeIcon></Button>
                                                )}
                                            </div>
                                        ))}
                                </details>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

Questionnaire.contextType = UserContext;

export default Questionnaire;