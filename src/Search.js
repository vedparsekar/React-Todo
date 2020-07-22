import React from 'react';
import './App.css';

class Search extends React.Component {
	
	 onChange = (event) => {
	console.log(event.target.value);
  }
  render() {
  return (
    <div className="App">
        <form>
        <h1>Hello</h1>
        <p>Enter your name:</p>
        <input
          type="text"
		  onChange={this.onChange}
        />
      </form>
    </div>
  );
}
}

export default Search;