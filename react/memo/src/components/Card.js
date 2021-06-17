// Stateless component : c'est à dire que le composant n'a pas de state et qu'il n'a
// donc pas besoin d'hériter de la classe "Component"
// En revanche, il récupère des arguments passés par son composant parent (Table) via
// le paramètre props
export default function Card(props) {
  return (
    <article className="bg-secondary text-light p-3 rounded mb-4">
      <h4>{props.card.question}</h4>
      <p>{props.card.reponse}</p>
    </article>
  );
}
