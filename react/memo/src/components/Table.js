import React, { Component } from "react";
import Term from "./Term.js";
import FetchData from "../services/FetchData.js";

/* Faites en sorte que le click sur un terme permette d'afficher les 4 
colonnes en utilisant un composant "Column" qui affichera à minima
une section avec un titre (A apprendre, je sais un peu ...) */
class Table extends Component {
  constructor(props) {
    super(props);
    this.fd = new FetchData();
    this.state = {
      terms: [],
      token: "",
      user: null
    };
  }
  componentDidMount() {
    // Une fois que le component est monté, je fais appel aux web services
    console.log(`fd dans componentDidMount :`, this.fd);
    this.fd
      .getToken()
      .then((token) => {
        const state = { ...this.state };
        state.token = token;
        this.setState(state);
      })
      .catch((error) => {
        console.error("Erreur attrapée dans getToken : ", error.message);
      });
  }
  /* L'utilisation de la fonction fléchée permet de s'assurer que 
  this correspond bien à l'instance d'APP. En effet, le this est alors
  fonction de l'endroit (ici la classe Table) où la méthode est déclarée  */
  handleClickTerm = (event, tid) => {
    console.log(`dans handleClickTerm`, tid);
    // Maintenant que l'on a tout ce qu'il faut pour aller chercher
    // les cartes, on va appeler la méthod getCards
    console.log(`this : `, this);
    this.fd.getCards(this.state.user, this.state.token, tid)
    .then((data) => {
      console.log(`Data dans handleClickTerm : `, data);
    })
    .catch(error => {
      console.error("Pb dans handleClickTerm : ", error.message)
    })
  };

  handleSubmitFormLogin(event) {
    event.preventDefault();
    const form = event.target;
    console.log(`Formulaire soumis : `, form);
    const login = form.querySelector("#login").value;
    const pwd = form.querySelector("#pwd").value;

    // Récupération de l'utilisateur
    this.fd.getUser(this.state.token, login, pwd)
    .then((data) => {
      console.log(`Donnée dans handleSubmitFormLogin : `, data);
      const user = {
        uid: data.current_user.uid,
        login: login,
        pwd: pwd
      }
      const state = {...this.state};
      state.user = user;
      this.setState(state);
      return this.fd.getTerms(user, this.state.token);
    })
    .then((data) => {
      // Ici on a récupéré les termes
      console.log(`Donnée dans handleSubmitFormLogin : `, data);
      const state = {...this.state};
      state.terms = data;
      this.setState(state);
    })
    .catch((error) => {
      console.error("Problème dans handleSubmitFormLogin ", error.message);
    })

    const state = { ...this.state }; //Copie par valeur du state
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

          {this.state.user && (
            <nav className="d-flex justify-content-center">
              {this.state.terms.map((term) => (
                <Term 
                key={term.id} 
                name={term.name}
                id={term.id} 
                onClickTerm={this.handleClickTerm}

                />
              ))}
            </nav>
          )}
        </header>
        <main className="container">
          {!this.state.user && (
            <form
              action=""
              onSubmit={(event) => {
                this.handleSubmitFormLogin(event);
              }}
            >
              <div className="form-group">
                <label htmlFor="login">Login</label>
                <input className="form-control" type="text" id="login" />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Mot de passe</label>
                <input className="form-control" type="password" id="pwd" />
              </div>
              <input type="submit" value="Se connecter" />
            </form>
          )}
          {!this.state.token && (
            <p className="text-danger">
              L'application n'a pu récupérer communiquer avec le serveur
            </p>
          )}
        </main>

        <footer className="container">Footer</footer>
      </>
    );
  }
}

export default Table;
