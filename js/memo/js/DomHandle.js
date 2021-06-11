"use strict";
export default class DomHandle {
    createDomElement(markup, text, parent, attributes){
        const elt = document.createElement(markup);
        elt.textContent = text;
        parent.appendChild(elt);
        for(let key in attributes) {
            elt.setAttribute(key,attributes[key]);
        }

        return elt;
    }
}