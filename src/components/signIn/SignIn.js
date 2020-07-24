import React, { Fragment } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

let allowSigninPW, allowSigninEm;

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isEnabled: false
        }
    }

    onChange = (x) => {
        if (x !== null) {
            console.log('done')
            this.setState({ isEnabled: true })
        } else {
            console.log('Retry')
            this.setState({ isEnabled: false })
        }
    }

    onErrored = () => {
        console.log('error');
        this.setState({ isEnabled: false })
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

    // preventSubmit = (e) => {
    //     console.log(e.target.value);
    //     // console.log(Array.from(new FormData(e.taget).entries()))
    //     // e.preventDefault();
    // }

    // On clicking sign in on the sign in page, fetch signin route;
    //using post method with the given headers and body
    signinSubmit = (e) => {
        fetch('https://smartbrain-backend-api.herokuapp.com/signin', {
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
        console.log(e.target.value);
    }

    componentDidMount = () => {
        this.props.validatePW(this.state.signInPassword);
        this.props.validateEm(this.state.signInEmail);
    }

    render() {
        const { onRouteChange } = this.props;
        const {isEnabled} = this.state;
        return (
            <form name="sign-in" className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center" onSubmit={this.signinSubmit}>
                <input type="hidden" name="form-name" value="sign-in" />
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
                                <input className="b pa2 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="captcha-wrapper">
                            <ReCAPTCHA
                                sitekey='6LdjSrIZAAAAALvRiEfRjOD9kcwBVs4c_LpTTJvq'
                                onChange={this.onChange}
                                onErrored={this.onErrored}
                                size='normal'
                                theme='dark'
                            />
                        </div>
                        <div className="">
                            {(allowSigninPW && allowSigninEm && isEnabled)
                                ? <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    // onClick={this.signinSubmit}
                                > Sign in </button>
                                : ((allowSigninPW)
                                    ?
                                    <Fragment>
                                        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                            type="submit"
                                            disabled
                                        >Sign in</button>
                                        <p style={{font: '0.5rem' }}>
                                            Please enter a valid email address
                                        </p>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                            type="submit"
                                            disabled
                                        >Sign in</button>
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
            </form>


            // <form method="POST" name="sign-in" className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center" onSubmit={this.preventSubmit}>
            //     <input type="hidden" name="form-name" value="sign-in" />
            //     {/* <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label> */}
            //     <input className="pa2 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100"
            //         type="email"
            //         name="email-address"
            //         // onChange={this.onEmailChange}
            //     />
            //     {/* <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label> */}
            //     <input className="b pa2 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100"
            //         type="password"
            //         name="password"
            //         // onChange={this.onPasswordChange}
            //     />

            //     <ReCAPTCHA
            //         sitekey='6LdjSrIZAAAAALvRiEfRjOD9kcwBVs4c_LpTTJvq'
            //         onChange={this.onChange}
            //         onErrored={this.onErrored}
            //         size='normal'
            //     />

            //     <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            //         type="submit"
            //         value="Sign in"
            //         // onClick={this.signinSubmit}
            //     />
            // </form>

        )
    }
}

export default SignIn;
