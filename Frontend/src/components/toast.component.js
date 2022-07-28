import React, { Component } from 'react';
import  Toast from 'react-bootstrap/Toast';

class Toaster extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='notification-container'>
                {this.props.notifications.map((notification, index) => (
                    <Toast key={index} onClose={() => this.props.clearMessage(notification)} delay={3000} autohide bg={notification.info?.toLowerCase()}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                        </Toast.Header>
                        <Toast.Body className={notification.info?.toLowerCase() === 'dark' && 'text-white'}>{notification.message}</Toast.Body>
                    </Toast>
                ))}
            </div>
        )
    }
}

export default Toaster;