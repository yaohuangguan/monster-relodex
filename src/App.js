import React, { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchField: ""
    };
  }
  handleError = response => {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response.json();
  };
  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(this.handleError)
      .then(users => this.setState({ monsters: users }))
      .catch(console.log);
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className='App'>
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder='Search Monster'
          handleChange={this.handleChange}
        ></SearchBox>
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
