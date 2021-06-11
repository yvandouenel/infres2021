export default class FetchData {
    
    /**
     * Récupère le token sur le serveur
     * Le token sera indispensable pour toute future communication avec le serveur
     * 
     * @returns promise 
     */
    getToken () {
      // Récupération du token via un fetch. Ici le point d'entrée (endpoint) est
      // https://www.coopernet.fr/rest/session/token/
      // Ma requête utilise le "verbe" par défaut qui est "GET"
      return fetch("https://www.coopernet.fr/rest/session/token/")
        .then(function (response) {
          if (response.status !== 200) { // Si c'est différent de 200, c'est qu'il y a un pb
            throw new Error("Le serveur n'a pas répondu correctement : " + response.status);
          } else return response.text(); // Test si la réponse est bien un "string"
        })
        .then(function (data) { // data correspond au retour du résolve (ici deux lignes au dessus)
          console.log("Token récupéré : ", data);
          return data;
        })
    }
  
    /**
     * Récupère les données de l'utilisateur
     * @param {string} token 
     * @param {string} login 
     * @param {string} pwd 
     * 
     * @returns promise
     */
    getUser(token, login, pwd) {
      // création de la requête
      console.log("Dans getUser de FetchData");
      // Va chercher sur le point d'entrée :
      // https://www.coopernet.fr/user/login?_format=json 
      return fetch("https://www.coopernet.fr/user/login?_format=json", {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token
        },
        body: JSON.stringify({
          name: login,
          pass: pwd
        })
      })
        .then(response => response.json()) // Teste si la réponse est bien du json
        .then(data => {
          //console.log("success", data);
          if (data.current_user === undefined) {
            throw new Error("Erreur de login");
          } else {
            return data;
          }
        })
    };
  
    /**
     * Récupère les termes (rubriques) d'un utilisateur donné
     * @param {object} user 
     * @param {string} token 
     * 
     * @returns promise
     */
    getTerms(user, token) {
      // création de la requête
      console.log("Dans getTerms -  User = ", user);
      return fetch("https://www.coopernet.fr/memo/themes/" + user.uid, {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/hal+json",
          "X-CSRF-Token": token,
          Authorization: "Basic " + btoa(user.login + ":" + user.pwd), // btoa = encodage en base 64
        },
      })
        .then((response) => {
          console.log("data reçues dans getTerms avant json() :", response);
          if (response.status === 200) return response.json();
          else throw new Error("Problème de réponse ", response);
        })
        .then((data) => {
          console.log("data reçues dans getTerms :", data);
          if (data) {
            console.log("termes : ", data);
            return data;
          } else {
            throw new Error("Problème de data " + data.message);
          }
        });
    }
  /**
   * Va chercher les colonnes (à apprendre, ...) sous forme de tableau et les cartes correspondantes également sous forme de tableau
   * @param {object} user 
   * @param {string} token 
   * @param {number} term_number 
   * @returns promise - dans le cas favorable, retourne les données 
   */
    getCards(user, token, term_number) {
      return fetch("https://www.coopernet.fr" +
        "/memo/list_cartes_term/" +
        user.uid +
        "/" +
        term_number +
        "&_format=json&time=" +
        Math.floor(Math.random() * 10000), {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/hal+json",
          "X-CSRF-Token": token,
          "Authorization": "Basic " + btoa(user.uid + ":" + user.pwd) // btoa = encodage en base 64
        }
      })
      .then(response => {
        if (response.status === 200) return response.json(); // vérifie que le format json est respecté
        else throw new Error("Problème de réponse ", response);
      })
      .then(data => {
        console.log("data reçues dans getCards :", data);
        if (data) {
          return data;
        } else {
          throw new Error("Problème de data ", data);
        }
      });
    }
  /**
   * Ajoute une carte sur le serveur
   * @param {object} user 
   * @param {object} card 
   * @param {number} termid 
   * @returns 
   */
    addCard(user, card, termid) {
      console.log("Dans addCard de FetchData");
      
      return fetch("https://www.coopernet.fr/node?_format=hal_json", {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/hal+json",
          "X-CSRF-Token": this.token,
          Authorization: "Basic " + btoa(user.login + ":" + user.pwd) // btoa = encodage en base 64
        },
        body: JSON.stringify({
          _links: {
            type: {
              href: "https://www.coopernet.fr/rest/type/node/carte"
            }
          },
          title: [
            {
              value: card.question
            }
          ],
          field_carte_question: [
            {
              value: card.question
            }
          ],
          field_carte_reponse: [
            {
              value: card.reponse
            }
          ],
          field_carte_explication: [
            {
              value: card.explication
            }
          ],
          field_carte_colonne: [
            {
              target_id: card.colonne,
              url: "/taxonomy/term/" + card.colonne
            }
          ],
          field_carte_thematique: [
            {
              target_id: termid,
              url: "/taxonomy/term/" + termid
            }
          ],
          type: [
            {
              target_id: "carte"
            }
          ]
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.hasOwnProperty("created") && data.created[0].value) {
            return data;
          } else {
            throw new Error("Problème de données dans addCard  : ", data.message);
          }
        });
    };
    
  }
  
  