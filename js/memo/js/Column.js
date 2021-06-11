"use strict";
import DomHandle from './DomHandle.js';

export default class Column extends DomHandle {
    constructor(id, name){
        super();
        this.id = id;
        this.name = name;
        // Création de la colonne
        const column_elt = this.drawColumn();

        // création des cartes en itérant sur le tableau (cartes)
        // et en créant (new) des instances de Card

    }
    drawColumn() {
        // Ici il faut créer des éléments du dom 
        // avec la méthode createDomElement
        // Cela retournera les éléments du dom (section)


    }
}