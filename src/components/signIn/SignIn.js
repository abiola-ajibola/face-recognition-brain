import React, { Fragment } from 'react';

let allowSigninPW, allowSigninEm;

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
        allowSigninEm = this.props.validateEm(event.target.value);
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
        // console.log(this.state.signInPassword);
        allowSigninPW = this.props.validatePW(event.target.value);
    }

    // On clicking sign in on the sign in page, fetch signin route;
    //using post method with the given headers and body
    signinSubmit = () => {
        fetch('https://murmuring-stream-43663.herokuapp.com/signin', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.comment === "good request") { // compare the server response with an expected string
                    this.props.loadUserData(data);
                    this.props.onRouteChange('home');
                }
            })
    }

    componentDidMount = () => {
        this.props.validatePW(this.state.signInPassword);
        this.props.validateEm(this.state.signInEmail);
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            {(allowSigninPW && allowSigninEm)
                                ? <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"
                                    onClick={this.signinSubmit}
                                />
                                : ((allowSigninPW)
                                    ?
                                    <Fragment>
                                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                            type="submit"
                                            disabled
                                            value="Sign in"
                                        />
                                        <p style={{font: '0.5rem' }}>
                                            Please enter a valid email address
                                        </p>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                            type="submit"
                                            disabled
                                            value="Sign in"
                                        />
                                        <p style={{ font: '0.5rem' }}>
                                            Password must include uppercase, lowwercase, special characters and numbers
                                        </p>
                                    </Fragment>
                                )
                            }
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;
