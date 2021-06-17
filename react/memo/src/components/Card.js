/* 
Transformer de component stateless en component avec state
Dans le state, vous ajoutez une propriété du type show_answer qui sera 
à false par défaut
Dans la méthode render de ce composant, vous n'afficherez la réponse que si
show_answer est à true
Il faudra donc gérer l'événement click sur la question pour obtenir 
un comportement similaire à celui de memopus.com
*/
export default function Card(props) {
  return (
    <article className="bg-secondary text-light p-3 rounded mb-4">
      <h4>{props.card.question}</h4>
      <p>{props.card.reponse}</p>
    </article>
  );
}
