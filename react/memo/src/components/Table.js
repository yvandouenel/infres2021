import React, { Component } from "react";
import Term from "./Term.js";
class Table extends Component {
  state = {
    terms: [
      {id: 1, name: "js"},
      {id: 2, name: "React"},
      {id: 3, name: "test"},
    ]
  };
  render() {
    return (
      <>
        <header className="container">
          <h1 className="text-center">Memo</h1>
          <nav className="d-flex justify-content-center">
            {this.state.terms.map(term => <Term name={term.name} />)}
          </nav>
        </header>
        <main className="container">Main</main>
        <footer className="container">Footer</footer>
      </>
    );
  }
}

export default Table;
