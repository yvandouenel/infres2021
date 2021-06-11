"use strict";
import DomHandle from './DomHandle.js';
import Card from './Card.js';

class App extends DomHandle {
    constructor() {
        super();
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

        }

    }
    handleUpCard() {
        this.form_up_card.onsubmit = (event, card_elt) => {
            console.log(`Dans la gestion de la soumission de l'up de la carte !!!!!!!`);
            event.preventDefault();
            const input_question = this.form_up_card.querySelector("#question-up").value;
            const input_answer = this.form_up_card.querySelector("#answer-up").value;
            
            this.updating_card.question = input_question;
            this.updating_card.answer = input_answer;
            this.updating_card.dom_elts.question_elt.textContent = input_question;
            this.updating_card.dom_elts.answer_elt.textContent = input_answer;

            // Suppression du formulaire de modification
            this.updating_card = null;
            this.form_up_card.remove();
        }
    }
    drawForm() {
        const main_elt = document.getElementById("main");
        const form_add_card = this.createDomElement("form","",main_elt,{"id": "form-add-card"});
        
        const label_question = this.createDomElement("label","Question",form_add_card,{"for": "question"});
        const input_question = this.createDomElement("input","",form_add_card,{"id":"question", type: "text"});

        const label_answer = this.createDomElement("label","Réponse",form_add_card,{"for": "answer"});
        const input_answer = this.createDomElement("input","",form_add_card,{"id":"answer", type: "text"});

        const input_submit = this.createDomElement("input","",form_add_card,{"id":"submit-add", type: "submit", value:"Ajouter"});

        return form_add_card;
        
    }
    drawFormUp(question, answer) {
        const main_elt = document.getElementById("main");
        const form_add_card = this.createDomElement(
            "form",
            "",
            main_elt,
            {"id": "form-up-card", "class": "hidden"});
        this.createDomElement("h2","Modification de la carte",form_add_card);
        const label_question = this.createDomElement("label","Question",form_add_card,{"for": "question"});
        const input_question = this.createDomElement("input","",form_add_card,{"id":"question-up", type: "text", "value": question});

        const label_answer = this.createDomElement("label","Réponse",form_add_card,{"for": "answer"});
        const input_answer = this.createDomElement("input","",form_add_card,{"id":"answer-up", type: "text", "value": answer});

        const input_submit = this.createDomElement("input","",form_add_card,{"id":"submit-up", type: "submit", value:"Modifier"});

        return form_add_card;
        
    }
}

new App();
/* const card1 = new Card("Qui est l'inventeur du js", "Brendan Eich");
console.log(`card1 : `, card1); */

