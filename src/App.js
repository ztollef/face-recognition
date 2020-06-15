import React, {Component} from 'react';
import './App.css';
// import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
// import Rank from './Components/Rank/Rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
// import Signin from "./Components/Signin/Signin"
// import Register from "./Components/Register/Register"

const app = new Clarifai.App({
  apiKey:'90f599b5943941f99ab2d3877b873695'
});


const particlesOptions = {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  // loadUser = data => {
  //   this.setState({user: {
  //     id: data.id,
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //     entries: data.entries,
  //     joined: data.joined
  //   }})
  // }

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = box => {this.setState({box: box})}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
        this.displayFaceBox(this.calculateFaceLocation(response))
      .catch(err => console.log(err));
  }
})
  }

  render() {
    const { imageUrl,  box } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <div>
            <br/>
            <Logo />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition 
              box={box} 
              imageUrl={imageUrl} 
            />
        </div>
        }
      </div>
    );
  }
}

export default App;
