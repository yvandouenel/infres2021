import React, { Component } from "react";
import Term from "./Term.js";
import FetchData from "../services/FetchData.js";

/* Faites en sorte que Table n'affiche pas par défaut les Termes mais plutôt un formulaire d'authentification. Une fois le formulaire renseigné, les termes pourront apparaître */
class Table extends Component {
  constructor(props) {
    super(props);
    this.fd = new FetchData();
    this.state = {
      terms: [
        { id: 1, name: "js" },
        { id: 2, name: "React" },
        { id: 3, name: "test" },
      ],
      token: ""
    };
  }
  componentDidMount() {
    // Une fois que le component est monté, je fais appel aux web services
    console.log(`fd dans componentDidMount :`, this.fd);
    this.fd.getToken()
    .then(token => {
      const state = {...this.state};
      state.token = token;
      this.setState(state);
    })
    .catch((error) => {
      console.error("Erreur attrapée dans getToken : ", error.message);
    })

  }
  handleSubmitFormLogin(event){
    event.preventDefault();
    console.log(`Formulaire soumis`);
    const state = {...this.state};//Copie par valeur du state
    state.display_form = false;
    // Si le state local est différent du stage du composant et que cela a un 
    // impact sur le rendu, alors la méthode render est rappelée
    this.setState(state);
  }
  render() {
    return (
      <>
        <header className="container">
          <h1 className="text-center">Memo</h1>

          {!this.state.token && (
            <nav className="d-flex justify-content-center">
            {this.state.terms.map((term) => (
              <Term key={term.id} name={term.name} />
            ))}
          </nav>
          )}
        </header>
        <main className="container">
        {this.state.token && (
            <form action="" onSubmit={(event) => {this.handleSubmitFormLogin(event);}}>
              <label htmlFor="login">Login</label>
              <input type="text" id="login"/>
              <label htmlFor="pwd">Mot de passe</label>
              <input type="password" id="pwd"/>
              <input type="submit" value="Se connecter" />
            </form>
          )}
          {!this.state.token && (
            <p className="text-danger">L'application n'a pu récupérer communiquer avec le serveur</p>
          )}
        </main>

        <footer className="container">Footer</footer>
      </>
    );
  }
}

export default Table;
