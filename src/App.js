import React from 'react';
import './App.css';


class App extends React.Component {
	state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
	 change = () => {
    this.setState({brand: "BMW"});
  }
  render() {
    return (
      <div className="App">
        <h1 onClick={this.change}>{this.state.brand}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

export default App;
