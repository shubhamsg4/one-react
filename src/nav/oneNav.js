import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import * as authService from '../helpers/authService';
import AuthModal from "../components/auth";
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    logout = () => {

        authService.logout();
        window.location.reload();
    }

    render() {
        const { showModal, toggleRegisterModal } = this.props;
        console.log()

        return (
            <Fragment>
                {showModal ?
                    < AuthModal
                        {...this.props}
                        isOpen={showModal}
                        toggleModal={toggleRegisterModal}
                    />
                    : null
                }
                <header className={this.props.backgroundcolor ? "fixed-top header1" : "fixed-top"}>
                    <div className="row">
                        <a href="/#" className=" col-10">
                            <img alt="One.com logo" className="logo" src={"data:image/png;base64,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"} />
                        </a>
                        <div className="col-2">
                            {!authService.loggedIn() ? <button className="login-button" onClick={toggleRegisterModal}>Sign in</button>
                                : <button className="login-button" onClick={this.logout}>Sign out</button>}
                        </div>

                    </div>
                </header>
            </Fragment >
        );
    }
}

export default NavBar;