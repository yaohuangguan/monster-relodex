import React, { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchField: "",
      title: ""
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
  componentDidUpdate() {
    console.log(
      new Date().toLocaleTimeString(),
      "Component rendered for update"
    );
    document.body.style.backgroundColor = `rgba(${Math.floor(
      Math.random() * 100
    )},${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100)})`;
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = "black";
  }
  change = () => {
    document.body.style.backgroundColor = "aliceblue";
    this.setState({ position: null });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className='App'>
        <h1 onClick={this.change}>Monster Rolodex</h1>
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
