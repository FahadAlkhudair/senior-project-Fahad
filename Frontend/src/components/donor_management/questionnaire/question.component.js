import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class Question extends Component {
    constructor(props) {
        super(props);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.form = React.createRef();

        const question = props.question ?? {};
        this.state = {
            category: question.category,
            question: question.question,
            message: "",
            formValidated: false,
        };
    }

    componentDidMount() {
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeQuestion(e) { 
        this.setState({
            question: e.target.value
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
                    category: this.state.category,
                    question: this.state.question
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
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required
                        list="categories"
                        value={this.state.category}
                        onChange={this.onChangeCategory}/>
                        <datalist id="categories">
                           {this.props.categories && this.props.categories.map((category,index)=>(
                            <option key={index}>{category}</option>
                           ))}
                        </datalist>
                    <Form.Control.Feedback type="invalid">
                        Must Provide a Category
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='question'>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={this.state.question}
                        onChange={this.onChangeQuestion}
                    />
                    <Form.Control.Feedback type="invalid">
                        Must Provide a question
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
        );
    }
}

export default Question;