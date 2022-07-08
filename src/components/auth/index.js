import React, { Component, Fragment } from "react";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import Login from "./login";
import SignUp from "./signup";
import { getRoles } from "../../redux/action";

class AuthModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewComponent: this.props.viewComp ? this.props.viewComp : "login",
            countryCode: "+91",
        };
    }
    switchFormComponent(val) {
        this.setState({
            viewComponent: val,
        });
    }
    componentDidMount() {
        this.props.getRoles();
    }

    renderSwitch = () => {
        switch (this.state.viewComponent) {
            case 'login':
                return (<Login
                    className={"auth-design col-12  plr-0"}
                    switchComponent={(val) => this.switchFormComponent(val)}
                    {...this.props} />);
            case 'register':
                return (<SignUp
                    className={"auth-design col-12   plr-0"}
                    switchComponent={(val) => this.switchFormComponent(val)}
                    {...this.props} />
                );
            default:
                return (<Login
                    className={"auth-design col-12  plr-0"}
                    switchComponent={(val) => this.switchFormComponent(val)}
                    {...this.props} />);
        }
    }
    render() {
        const { isOpen, toggleModal } = this.props;

        return (
            <Fragment>
                <Modal
                    isOpen={isOpen}
                    toggle={toggleModal}
                    backdrop="static"
                    className="dashBoardModal modal-dialog-centered auth-modal"
                >
                    <ModalBody className="loginModal plr-0 pt-0 pb-0">
                        <span onClick={toggleModal}>
                            <div className="closeModal plr-1" style={{ float: "right" }}>
                                <img alt="close" src={require('../../assets/images/close.png')} />
                            </div>
                        </span>
                        <div className="container" style={{ overflow: 'auto' }}>
                            <div className="main-content">
                                <div className="container-fluid" id="loginSection">
                                    <div className="row align-items-center">
                                        {this.renderSwitch(this.props)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return { authUser };
};

export default connect(mapStateToProps, {
    getRoles
})(AuthModal);
