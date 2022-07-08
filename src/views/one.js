import React, { Fragment, Component } from "react";
import TopNav from "../nav/oneNav";
import Product from "./product";
import * as authService from '../helpers/authService';
class Live extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerModal: false
        }
    }
    toggleRegisterModal = () => {
        debugger
        this.setState({
            registerModal: !this.state.registerModal,
        });
    }
    render() {
        const { registerModal } = this.state;

        return (
            <Fragment>
                <TopNav
                    showModal={registerModal}
                    toggleRegisterModal={this.toggleRegisterModal}
                />
                <main className="wrapper-1">
                    {authService.loggedIn() ?
                        <Product />
                        : <h2 className="text">Please sign in to see the product</h2>}
                </main>
            </Fragment>
        )
    }
}
export default Live;