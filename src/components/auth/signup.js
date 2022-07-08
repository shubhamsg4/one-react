import React, { Component } from 'react';
import { connect } from "react-redux";
import { registerUser } from "../../redux/action";
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            roleId: 1,
            usernameError: false,
            nameError: false,
            passwordError: false,
        }
        this.registerUser = this.registerUser.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        this.validateInput(e);
    }
    handleRoleChange = (e) => {

        this.setState({
            roleId: e
        })
    }

    componentDidUpdate() {
        if (this.props.authUser.registerSuccess) {
            this.props.toggleModal();
        }
    }

    registerUser() {
        const { usernameError, nameError, passwordError, name, username, password, roleId } = this.state;
        if (usernameError || nameError || passwordError) {
            return true;
        }
        else if (name.length < 3 || username.length === 0 || password.length < 4) {
            if (name.length < 3 || !isNaN(name)) {
                this.setState({ nameError: true });
            }
            else if (username.length === 0) {
                this.setState({ usernameError: true });
            }
            else if (password.length < 4) {
                this.setState({ passwordError: true });
            }
        }
        else {

            const user = {
                name: name,
                username: username,
                password: password,
                role_id: roleId
            }
            this.props.registerUser(user, this.props.history);
        }
    }

    validateInput(e) {
        if (e.target.name === "username") {
            if (e.target.value.length < 3) {
                this.setState({ usernameError: true });
            }
            else {
                this.setState({ usernameError: false });
            }
        }
        else if (e.target.name === "name") {
            if (e.target.value.length < 3) {
                this.setState({ nameError: true });
            }
            else {
                this.setState({ nameError: false });
            }
        }
        else if (e.target.name === "password") {
            if (e.target.value.length < 8) {
                this.setState({ passwordError: true });
            }
            else {
                this.setState({ passwordError: false });
            }
        }
    }

    render() {
        const { loading, rolesArray } = this.props.authUser;
        const { showPassword } = this.state;
        return (
            <div className={this.props.className}>
                <h5 className="mt-3 font-weight-bolder">Sign up</h5>
                <div className="form-group mb-2">
                    <label className="registerModal_label" htmlFor="Inputname">Full name *</label>
                    <input type="text" className="form-control" name="name" id="Inputname" aria-describedby="name" placeholder="Full name" required onChange={this.handleChange} />
                    <small className={this.state.nameError ? "d-block error" : "d-none"}>Enter a valid name</small>
                </div>
                <div className="form-group mb-2">
                    <label className="registerModal_label" htmlFor="exampleInputusername">Username *</label>
                    <input type="username" className="form-control" aria-describedby="username" placeholder="username" name="username" required onChange={this.handleChange} />
                    <small className={this.state.usernameError ? "d-block error" : "d-none"}>Enter a valid username</small>
                </div>
                <div className="form-group mb-2 passwd">
                    <label className="registerModal_label" htmlFor="InputPassword">Password</label>
                    <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Password" required onChange={this.handleChange} />
                    <small className={this.state.passwordError ? "d-block error" : "d-none"} >Password must be of atleast 8 character</small>
                </div>
                <div className="form-group mb-2 passwd">
                    <label className="registerModal_label" htmlFor="Role">Role *</label>
                    <select className="form-control" name="role-names" id="role-names" onChange={e => this.handleRoleChange(e.target.value)}>
                        {rolesArray.map(role =>
                            <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                        )};
                    </select>
                </div>
                <button type="submit" className="continue" onClick={this.registerUser}>
                    <div className={`${loading ? 'd-none' : 'd-block'}`}>Continue</div>
                    <div id="wave" className={`${loading ? 'd-block' : 'd-none'}`}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </button>
                <div className="text-center mt-2">
                    <p className="registerModal_label">Already have an account?
                        <a href="#!" onClick={() => this.props.switchComponent("login")}>
                            Login
                        </a>
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authUser }) => {
    return { authUser };
};

export default connect(
    mapStateToProps,
    {
        registerUser,

    }
)(SignUp);