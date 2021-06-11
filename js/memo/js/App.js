class DomHandle {
    createDomElement(markup, text, parent, attributes){
        console.log(`parent : `, parent);
        const elt = document.createElement(markup);
        elt.textContent = text;
        parent.appendChild(elt);
        for(let key in attributes) {
            elt.setAttribute(key,attributes[key]);
        }

        return elt;
    }
}

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

class Card extends DomHandle {
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
new App();
/* const card1 = new Card("Qui est l'inventeur du js", "Brendan Eich");
console.log(`card1 : `, card1); */

