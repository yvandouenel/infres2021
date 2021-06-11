"use strict";
import DomHandle from "./DomHandle.js";
import Card from "./Card.js";
import FetchData from "./services/FetchData.js";

class App extends DomHandle {
  constructor() {
    super();
    this.fd = new FetchData();
    this.token = "";
    this.user = null;
    this.terms = null;
    this.dom_elts = {};

    // Récupération du token, de l'utilisateur et des termes via Fetch
    this.getTokenUserTerms();

    this.updating_card = null;
    // creation du formulaire d'ajout
    this.form_add_card = this.drawForm();

    // creation du formulaire de mise à jour
    this.form_up_card = null;

    // gestion des événements
    this.form_add_card.onsubmit = (event) => {
      // Supprime la gestion par défaut des événements
      event.preventDefault();
      const question = document.getElementById("question").value;
      const answer = document.getElementById("answer").value;

      const card1 = new Card(question, answer, this);
    };
  }
  getTokenUserTerms() {
    this.fd.getToken()
    .then((value) => {
      console.log("token dans le constructeur : ", value);
      this.token = value;
      return this.fd.getUser(this.token, "infres", "12345678");
    })
    .then((value) => {
      console.log("User le constructeur : ", value);
      this.user = {
          uid: value.current_user.uid,
          login: value.name,
          pwd: "12345678"
      } 
      return this.fd.getTerms(this.user, this.token);
    })
    .then(data => {
        console.log(`Termes dans le constructeur d'APP : `, data);
        this.terms = data;
        this.drawTerms();
    })
    .catch((error) => {
      console.error("Erreur: ", error.message);
    });
  }
  handleUpCard() {
    this.form_up_card.onsubmit = (event, card_elt) => {
      console.log(
        `Dans la gestion de la soumission de l'up de la carte !!!!!!!`
      );
      event.preventDefault();
      const input_question =
        this.form_up_card.querySelector("#question-up").value;
      const input_answer = this.form_up_card.querySelector("#answer-up").value;

      this.updating_card.question = input_question;
      this.updating_card.answer = input_answer;
      this.updating_card.dom_elts.question_elt.textContent = input_question;
      this.updating_card.dom_elts.answer_elt.textContent = input_answer;

      // Suppression du formulaire de modification
      this.updating_card = null;
      this.form_up_card.remove();
    };
  }
  addClickTerm() {
      this.dom_elts.dom_terms.forEach(elt => {
          elt.onclick = () => {
              // Récupération de l'id
              console.log(`Click sur term id: `, elt.id);
              this.fd.getCards(this.user, this.token, elt.id)
              .then(data => {
                console.log(`Cartes dans App : `, data);
              })
              .catch(error => {
                  console.error("Erreur dans addClickTerm : ", error)
              })
          }
    });
  }
  drawTerms() {
    const main_header = document.getElementById("main-header");
    const main_nav = this.createDomElement("nav", "", main_header);
    const dom_terms = [];
    // Création de tous les boutons
    this.terms.forEach(elt => {
        dom_terms.push(this.createDomElement("button", elt.name, main_nav,{"id":elt.id}));
    });
    
    this.dom_elts.dom_terms = dom_terms;
    this.addClickTerm();
  }
  drawForm() {
    const main_elt = document.getElementById("main");
    const form_add_card = this.createDomElement("form", "", main_elt, {
      id: "form-add-card",
    });

    const label_question = this.createDomElement(
      "label",
      "Question",
      form_add_card,
      { for: "question" }
    );
    const input_question = this.createDomElement("input", "", form_add_card, {
      id: "question",
      type: "text",
    });

    const label_answer = this.createDomElement(
      "label",
      "Réponse",
      form_add_card,
      { for: "answer" }
    );
    const input_answer = this.createDomElement("input", "", form_add_card, {
      id: "answer",
      type: "text",
    });

    const input_submit = this.createDomElement("input", "", form_add_card, {
      id: "submit-add",
      type: "submit",
      value: "Ajouter",
    });

    return form_add_card;
  }
  drawFormUp(question, answer) {
    const main_elt = document.getElementById("main");
    const form_add_card = this.createDomElement("form", "", main_elt, {
      id: "form-up-card",
      class: "hidden",
    });
    this.createDomElement("h2", "Modification de la carte", form_add_card);
    const label_question = this.createDomElement(
      "label",
      "Question",
      form_add_card,
      { for: "question" }
    );
    const input_question = this.createDomElement("input", "", form_add_card, {
      id: "question-up",
      type: "text",
      value: question,
    });

    const label_answer = this.createDomElement(
      "label",
      "Réponse",
      form_add_card,
      { for: "answer" }
    );
    const input_answer = this.createDomElement("input", "", form_add_card, {
      id: "answer-up",
      type: "text",
      value: answer,
    });

    const input_submit = this.createDomElement("input", "", form_add_card, {
      id: "submit-up",
      type: "submit",
      value: "Modifier",
    });

    return form_add_card;
  }
}

new App();
/* const card1 = new Card("Qui est l'inventeur du js", "Brendan Eich");
console.log(`card1 : `, card1); */
