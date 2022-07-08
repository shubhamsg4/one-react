import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser } from "../../redux/action";
import { Link } from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            usernameError: false,
            passwordError: false,
            showPassword: false,
            mobileView: false,
            validError: false
        };
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    // componentDidUpdate(prevProps) {
    //     if (
    //         this.props.authUser.loginSuccessData !==
    //         prevProps.authUser.loginSuccessData
    //     ) {
    //         if (this.props.authUser.loginSuccessData.meta.code === 403) {
    //             this.setState({
    //                 validError: true
    //             })
    //         }

    //     }
    //     if (
    //         this.props.authUser.loginSuccessData !==
    //         prevProps.authUser.loginSuccessData
    //     ) {
    //         if (this.props.authUser.loginSuccessData.meta.code === 200) {

    //             this.props.toggleModal();
    //         }

    //     }
    // }

    componentDidUpdate(prevProps) {
        debugger
        console.log(this.props.authUser);
        if (this.props.authUser.loginSuccessData) {

            this.props.toggleModal();
        }
    }

    loginUser = (e) => {

        e.preventDefault();
        const { usernameError, passwordError, username, password } = this.state;
        const user = {
            username: username,
            password: password,
        };

        this.props.loginUser(user, this.props.history);
    }


    render() {
        const { loading } = this.props.authUser;
        const { showPassword, validError } = this.state;
        return (
            <div className={this.props.className}>
                <h5 className="mt-3 font-weight-bolder">Sign in</h5>
                {validError ? <p>Please enter valid details</p> : " "}
                <div className="form-group mb-2">
                    <label className="registerModal_label" htmlFor="exampleInputusername">
                        Username *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-describedby="username"
                        placeholder="username"
                        name="username"
                        required
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group mb-2 passwd">
                    <label className="registerModal_label" htmlFor="InputPassword">
                        Password *
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        onChange={this.handleChange}
                    />
                    <small
                        className={this.state.passwordError ? "d-block error" : "d-none"}
                    >
                        Password should be alpha numeric
                    </small>
                </div>
                <button type="submit" className="continue" onClick={this.loginUser}>
                    <div className={`${loading ? "d-none" : "d-block"}`}>Sign in</div>
                    <div id="wave" className={`${loading ? "d-block" : "d-none"}`}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </button>
                <div className="text-center mt-2 mb-3">
                    <a href="#!" onClick={() => this.props.switchComponent("register")}>
                        Create New Account
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return { authUser };
};

export default connect(
    mapStateToProps,
    {
        loginUser
    }
)(Login);