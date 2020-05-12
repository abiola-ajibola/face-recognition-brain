import React, { Fragment } from 'react';

let allowLoginEm, allowLoginName, allowLoginPW;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
        allowLoginEm = this.props.validateEm(event.target.value);
        console.log(allowLoginEm);
        console.log(event.target.value);
    }

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value });
        allowLoginPW = this.props.validatePW(event.target.value);
        console.log(allowLoginPW);
        console.log(event.target.value);
    }

    onNameChange = (event) => {
        this.setState({ registerName: event.target.value });
        allowLoginName = this.props.validateName(event.target.value);
        console.log(event.target.value);
        console.log(allowLoginName);
    }

    // On clicking register on the register page, fetch register route;
    //using post method with the given headers and body
    registerSubmit = () => {
        fetch('https://murmuring-stream-43663.herokuapp.com/register', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        })
            .then(response => response.json())
            .then(userData => {
                if (userData.id) { // compare the server response with an expected string
                    this.props.loadUserData(userData);
                    this.props.onRouteChange('home'); // if response === 'Welcome' go to sign in
                }
            })
    }

    componentDidMount = () => {
        this.props.validatePW(this.state.registerPassword);
        this.props.validateEm(this.state.registerEmail);
        this.props.validateName(this.state.registerName);
    }

    render() {
        const { onRouteChange } = this.props;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={ this.onNameChange}
                                />
                                {
                                    (!allowLoginName)
                                        ? < p style={{ font: '0.5rem' }}>
                                            Names can only contain alphabets
                                            </p>
                                        : <p></p>
                                }
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={ this.onEmailChange}
                                />
                                {
                                    (!allowLoginEm)
                                        ? <p style={{ font: '0.5rem' }}>
                                            Please enter a valid email address
                                        </p>
                                        : <p></p>
                                }
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={ this.onPasswordChange}
                                />
                                {
                                    !(allowLoginPW)
                                        ? <p style={{ font: '0.5rem' }}>
                                            Password must include uppercase, lowwercase, special characters and numbers
                                          </p>
                                        : <p></p>
                                }

                            </div>
                        </fieldset>
                        <div className="">
                            {(allowLoginPW && allowLoginName && allowLoginEm)
                                ? <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Register"
                                    onClick={this.registerSubmit}
                                />
                                : <Fragment>
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                        type="submit"
                                        value="Register"
                                        disabled
                                    />
                                </Fragment>
                            }
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={()=>onRouteChange('signin')} className="f6 link dim black db pointer">Sign In</p>
                        </div>
                    </div>
                </main>
            </article >
        )
    }
}

export default Register;