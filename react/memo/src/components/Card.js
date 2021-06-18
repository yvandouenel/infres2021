/* 
Transformer ce component stateless en component avec state
Dans le state, vous ajoutez une propriété du type show_answer qui sera 
à false par défaut
Dans la méthode render de ce composant, vous n'afficherez la réponse que si
show_answer est à true
Il faudra donc gérer l'événement click sur la question pour obtenir 
un comportement similaire à celui de memopus.com
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
      <article className="bg-secondary text-light p-3 rounded mb-4">
        <h4
        role="button"
        onClick={this.handleClickAnswer}
        >{this.props.card.question}</h4>
        {this.state.show_answer && <p>{this.props.card.reponse}</p>}
      </article>
    );
  }
}
