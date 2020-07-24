import React, { Fragment, Component } from 'react';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';

const initialState = {
  input: '',
  imageURL: '',
  box: [],
  visibility: 'visible',
  numberOfFaces: 0,
  route: 'signin',
  isSignedIn: false,
  user: {
    name: '',
    email: '',
    id: '',
    pictures: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // Calculate the bounding box for the face(s)
  calculateFaceLocation = (data) => {
    let temp_results = data.outputs.map(items => {
      if (items.data.regions) {
        this.setState({
          visibility: 'visible',
          numberOfFaces: items.data.regions.length
        });
        console.log('Number of faces: ', items.data.regions.length);
        return items.data.regions.map(items2 => {
          return Object.assign(items2.region_info.bounding_box, { visibility: this.state.visibility, numberOfFaces: items.data.regions.length })
        })
      } else {
        this.setState({
          visibility: 'hidden',
          numberOfFaces: 0
        })
        return [{
          visibility: this.state.visibility,
          top_row: 0,
          bottom_row: 0,
          left_col: 0,
          right_col: 0,
          numberOfFaces: 0
        }]
      }
    });
    let boxes = temp_results[0].map(temp_result => {
      return {
        top: temp_result.top_row * 100 + '%',
        bottom: (1 - temp_result.bottom_row) * 100 + '%',
        left: temp_result.left_col * 100 + '%',
        right: (1 - temp_result.right_col) * 100 + '%',
        visibility: this.state.visibility
      }
    })
    return boxes
  }

  displayFaceBox = (box => {
    this.setState({ box: box })
  })

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  loadUserData = (userData) => {
    this.setState({
      user: {
        name: userData.name,
        email: userData.email,
        id: userData.id,
        pictures: userData.pictures,
        joined: userData.joined
      }
    })
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input })
    fetch('https://smartbrain-backend-api.herokuapp.com/imgApi', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        imgUrl: this.state.input
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response) {
          this.displayFaceBox(this.calculateFaceLocation(response));
          fetch('https://smartbrain-backend-api.herokuapp.com/image', {
            method: 'put',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id,
              imgUrl: this.state.imageURL,
              numberOfFaces: this.state.numberOfFaces
            })
          })
            .then(response => response.json())
            .then(data => {
              this.setState({ user: data[0] })
            })
            .catch(e => console.log(e));
        }
        // this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.error(err));
  }
  
  onRouteChange = (route) => {
    if (route === 'signin' || route === 'register') {
      this.setState(initialState);
    } else {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  validatePW = (pw) => {
    return (/[0-9]/.test(pw) && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\W/.test(pw))
  }

  validateEm = (mail) => {
    if (mail.match(/@/g)) {
      return (!(mail.match(/@/g).length > 1) && /\./.test(mail))
    }
  }

  validateName = (nm) => {
    return (!(/[\W0-9]/.test(nm)) && /[a-zA-Z]/.test(nm))
  }

  render() {
    const { isSignedIn, imageURL, box, route, user } = this.state;

    return (
      <div className="App">
        <Particles className='particle'
          params={{
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  value_area: 300
                }
              }
            }
          }
          } />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home'
            ?
            <Fragment>
              <Logo />
              <Rank userName={user.name} userEntries={this.state.user.pictures} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageURL={imageURL} boxes={box} />
            </Fragment>
            : (
              route === 'signin'
                ? <SignIn
                  loadUserData={this.loadUserData}
                  onRouteChange={this.onRouteChange}
                  validatePW={this.validatePW}
                  validateEm={this.validateEm}
                />
                : (
                  route === 'register'
                    ? <Register
                      validateEm={this.validateEm}
                      validateName={this.validateName}
                      validatePW={this.validatePW}
                      loadUserData={this.loadUserData}
                      onRouteChange={this.onRouteChange}
                    />
                    : <h1>Sorry page not found :(</h1>
                )
            )
        }
      </div>
    );
  }
}

export default App;
