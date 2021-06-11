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

        // creation du formulaire
        this.form_add_card = this.drawForm();

        // gestion des événements
        this.form_add_card.onsubmit = function(event) {
            // Supprime la gestion par défaut des événements
            event.preventDefault();
            const question = document.getElementById("question").value;
            const answer = document.getElementById("answer").value;

            const card1 = new Card(question, answer);

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
}

class Card extends DomHandle {
    constructor(question, answer){
        super();
        this.question = question;
        this.answer = answer;

        this.dom_elts = this.drawCard();

        // Gestion des événements
        this.dom_elts.delete_button.onclick = function() {
            console.log(`Dans handle delete Card, this : `, this);
            console.log(`Click pour supprimer la carte`);
            this.deleteCard();
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

            return {
                "card_article": card_article,
                "delete_button": delete_button
            }
    }
    deleteCard() {
        this.dom_elts.card_article.remove();
    }
    
}
new App();
/* const card1 = new Card("Qui est l'inventeur du js", "Brendan Eich");
console.log(`card1 : `, card1); */

