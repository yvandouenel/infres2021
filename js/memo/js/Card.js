"use strict";
import DomHandle from './DomHandle.js';

export default class Card extends DomHandle {
    constructor(question, answer, app){
        super();
        this.app = app;
        this.question = question;
        this.answer = answer;

        this.dom_elts = this.drawCard();

        // Gestion des événements
        this.handleEvents();
    }
    handleEvents() {
        // click sur bouton d'ajout de la carte
        this.dom_elts.delete_button.onclick = function() {
            console.log(`Dans handle delete Card, this : `, this);
            console.log(`Click pour supprimer la carte`);
            this.deleteCard();
        }.bind(this);

        // click sur le bouton de modification de la carte
        this.dom_elts.up_button.onclick = function() {
            console.log(`Dans handle up Card, this : `, this);
            console.log(`Click pour up la carte`);
            this.app.updating_card = this;
            this.app.form_up_card = this.app.drawFormUp(this.question, this.answer);
            this.app.form_up_card.classList.toggle("hidden");
            this.app.handleUpCard(this.dom_elts.question_elt, this.dom_elts.answer_elt);
        }.bind(this);
    }
    drawCard() {
        const main_elt = document.getElementById("main");
        const card_article = this.createDomElement(
            "article",
            "",
            main_elt,
            {
                "class": "card"
            }
            );
        const question_elt = this.createDomElement(
            "h3",
            this.question,
            card_article,
            {
                "class": "card-question"
            }
            ); 
            const answer_elt = this.createDomElement(
            "p",
            this.answer,
            card_article,
            {
                "class": "card-answer"
            }
            );
            const button_elt = this.createDomElement(
            "button",
            "Proposer une réponse",
            card_article,
            
            );
            const delete_button = this.createDomElement(
                "button",
                "supprimer la carte",
                card_article,
                {
                    "class": "delete-card"
                }
                );
                const update_button = this.createDomElement(
                "button",
                "Modifier la carte",
                card_article,
                {
                    "class": "up-card"
                }
                );

            return {
                "card_article": card_article,
                "question_elt": question_elt,
                "answer_elt": answer_elt,
                "delete_button": delete_button,
                "up_button": update_button
            }
    }
    deleteCard() {
        this.dom_elts.card_article.remove();
    }
    
}