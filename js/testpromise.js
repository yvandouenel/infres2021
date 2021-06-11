function getToken() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        const token = "qsdfEDLSoie5d8899;dEDd";

        resolve(token); // renvoie le résultat à la méthode "then()"
      } else
        reject(new Error("Pas de chance, vous n'avez pas pu obtenir de token")); // renvoie le résultat à la méthode "catch"
    }, 500);
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        const user = {login:"zz", id: 123456789};

        resolve(user); // renvoie le résultat à la méthode "then()"
      } else
        reject(new Error("Pas de chance, vous n'avez pas pu obtenir d'utilisateur")); // renvoie le résultat à la méthode "catch"
    }, 500);
  });
}


// Promesses
getToken()
  .then((value) => {
    console.log("token dans le then : ", value);
    return getUser();
  })
  .then((value) => {
    console.log("Utilisateur : ", value);
  })
  .catch((error) => {
    console.error("Erreur: ", error.message);
  });
