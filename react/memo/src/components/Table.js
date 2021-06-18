import React, { Component } from "react";
import Term from "./Term.js";
import Column from "./Column.js";
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
      user: null,
      columns: [],
      addingCardInCol: -1,
      addingTerm: false
    };
  }
  /**
   * Automatiquement appelée aprés le premier render (hook)
   * Habituellement utilisée pour aller chercher des données via des services
   * Ici, on va chercher le token
   */
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
  /**
   * Affiche le formulaire d'ajout de terme 
   */
  handleClickAddTerm = () => {
    console.log(`Dans handleClickAddTerm`);
    const state = {...this.state};
    state.addingTerm = true;
    this.setState(state);
  }

  /**
   * Modifie le state (addingCardInCol) pour afficher le formulaire
   * @param {number} col_index 
   */
  handleClickButtonAddCard = (col_index) => {
    console.log(`Dans handleClickButtonAddCard - col : `, col_index);
    // Apparition du formulaire
    const state = { ...this.state };
    state.addingCardInCol = col_index;
    this.setState(state);
  };
  /**
   * Va chercher les infos (colonnes et cartes) concernant un terme cliqué
   * Utilise les promesses
   * L'utilisation de la fonction fléchée permet de s'assurer que 
  this correspond bien à l'instance d'APP. En effet, le this est alors
  fonction de l'endroit (ici la classe Table) où la méthode est déclarée
   * @param {Event} event 
   * @param {number} tid 
   */
  handleClickTerm = (event, tid) => {
    console.log(`dans handleClickTerm`, tid);
    // Maintenant que l'on a tout ce qu'il faut pour aller chercher
    // les cartes, on va appeler la méthod getCards
    console.log(`this : `, this);
    this.fd
      .getCards(this.state.user, this.state.token, tid)
      .then((data) => {
        console.log(`Data dans handleClickTerm : `, data);
        // Affichage des colonnes
        const state = { ...this.state };
        state.columns = data;
        this.setState(state);
      })
      .catch((error) => {
        console.error("Pb dans handleClickTerm : ", error.message);
      });
  };

  /**
   * Ajoute une carte dans la bonne colonne
   * @param {Event} event 
   */
  handleSubmitFormAddCard = (event) => {
    console.log(`Dans handleSubmitFormAddCard`);
    event.preventDefault();
    const form = event.target;
    const question = form.querySelector("#add-question").value;
    const answer = form.querySelector("#add-answer").value;
    //console.log(`question et réponse à ajouter : `, question, answer);

    const state = { ...this.state };
    state.columns[this.state.addingCardInCol].cartes.push({
      id: 999999,
      question: question,
      reponse: answer,
    });
    state.addingCardInCol = -1;
    this.setState(state);
  };
  handleSubmitFormAddTerm = (event) => {
    event.preventDefault();
    const form = event.target;
    const term = form.querySelector("#add-term").value;

    const state = { ...this.state };
    state.terms.push({
      id: 999999,
      name: term
    });
    state.addingTerm = false;
    this.setState(state);
  }
  /**
   * Vérifie si l'utilisateur est reconnu (login et pwd)
   * Dans l'affirmative, va chercher les termes de cet utilisateur
   * @param {Event} event 
   */
  handleSubmitFormLogin(event) {
    event.preventDefault();
    const form = event.target;
    console.log(`Formulaire soumis : `, form);
    const login = form.querySelector("#login").value;
    const pwd = form.querySelector("#pwd").value;

    // Récupération de l'utilisateur
    this.fd
      .getUser(this.state.token, login, pwd)
      .then((data) => {
        console.log(`Donnée dans handleSubmitFormLogin : `, data);
        const user = {
          uid: data.current_user.uid,
          login: login,
          pwd: pwd,
        };
        const state = { ...this.state };
        state.user = user;
        this.setState(state);
        return this.fd.getTerms(user, this.state.token);
      })
      .then((data) => {
        // Ici on a récupéré les termes
        console.log(`Donnée dans handleSubmitFormLogin : `, data);
        const state = { ...this.state };
        state.terms = data;
        this.setState(state);
      })
      .catch((error) => {
        console.error("Problème dans handleSubmitFormLogin ", error.message);
      });

    const state = { ...this.state }; //Copie par valeur du state
    state.display_form = false;
    // Si le state local est différent du stage du composant et que cela a un
    // impact sur le rendu, alors la méthode render est rappelée
    this.setState(state);
  }
  /**
   * Afficher le formulaire d'ajout de carte
   * @returns JSX
   */
  renderFormAddCard() {
    if (this.state.addingCardInCol != -1) {
      return (
        <form
          action=""
          onSubmit={(event) => {
            this.handleSubmitFormAddCard(event);
          }}
        >
          <div className="form-group">
            <label htmlFor="add-question">Question</label>
            <input className="form-control" type="text" id="add-question" />
          </div>
          <div className="form-group">
            <label htmlFor="add-answer">Réponse</label>
            <input className="form-control" type="text" id="add-answer" />
          </div>
          <input type="submit" value="Ajouter la carte" />
        </form>
      );
    }
  }
  /**
   * Afficher le formulaire d'ajout de terme
   * @returns JSX
   */
   renderFormAddTerm() {
    if (this.state.addingTerm) {
      return (
        <form
          action=""
          onSubmit={(event) => {
            this.handleSubmitFormAddTerm(event);
          }}
        >
          <div className="form-group">
            <label htmlFor="add-term">Terme</label>
            <input className="form-control" type="text" id="add-term" />
          </div>
          <input type="submit" value="Ajouter un terme" />
        </form>
      );
    }
  }
  /**
   * Affiche les colonnes 
   * @returns JSX
   */
  renderColumns() {
    if (this.state.columns.length) {
      return (
        <section className="row">
          {this.state.columns.map((col, index) => (
            <Column
              key={col.id}
              col={col}
              onClickButtonAddCard={this.handleClickButtonAddCard}
              index={index}
            />
          ))}
        </section>
      );
    }
  }
  renderTerms() {
    if(this.state.user) {
      return (
        <nav className="d-flex justify-content-center">
          <button onClick={this.handleClickAddTerm} className="m-3 btn btn-success">+</button>
        {this.state.terms.map((term) => (
          <Term
            key={term.id}
            name={term.name}
            id={term.id}
            onClickTerm={this.handleClickTerm}
          />
        ))}
      </nav>
      );
    }
  }

  /**
   * Affiche la structure globale de l'application
   * @returns JSX
   */
  render() {
    return (
      <>
        <header className="container">
          <h1 className="text-center">Memo</h1>
          {this.renderTerms()}
        </header>
        <main className="container">
          {this.renderFormAddCard()}
          {this.renderFormAddTerm()}
          {this.renderColumns()}
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
