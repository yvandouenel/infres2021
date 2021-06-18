/* 
Ajouter un bouton "modifier". Ce dernier va afficher un formulaire de modification.
Regardez la documentation des formulaires react pour comprendre comment "alimenter" les 
champs question et réponse (value).
A la validation de ce formulaire, la carte sera modifiée
Vous pouvez soit utiliser l'événement "onChange" sur chaque input, soit au contraire, ignorer 
l'événement "onChange" pour tout gérer via l'événement "onSubmit" du formulaire. Il faudra alors
utiliser l'attribut "defaultValue" pour que les champs soient tout de même déjà renseignés.
*/
import React, { Component } from "react";
export default class Card extends Component {
  state = {
    show_answer: false,
  };
  handleClickAnswer = () => {
    const state = {...this.state}
    state.show_answer = !state.show_answer;
    this.setState(state);
  }
  render() {
    return (
      <article className="mt-3 bg-secondary text-light p-3 rounded mb-4">
        <h4
        role="button"
        onClick={this.handleClickAnswer}
        >{this.props.card.question}</h4>
        {this.state.show_answer && <p>{this.props.card.reponse}</p>}
      </article>
    );
  }
}
