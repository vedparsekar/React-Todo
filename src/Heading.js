import React from 'react';
import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React</h2>
      </header>
    </div>
  );
}*/

class Heading extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>ToDoApp</h1>
      </div>
    );
  }
}

export default Heading;