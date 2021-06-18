import Card from "./Card.js";
/* Faites en sorte qu'un bouton cliquable soit ajouté
en haut de chaque colonne. Au click, un formulaire apparaît.
Il permet d'ajouter une carte (question et réponse) dans la bonne colonne */
// Stateless component : c'est à dire que le composant n'a pas de state et qu'il n'a
// donc pas besoin d'hériter de la classe "Component"
// En revanche, il récupère des arguments passés par son composant parent (Table) via
// le paramètre props
export default function Column(props) {
  return (
    <section className="col">
      <div className="d-flex">
        <button
          className="btn btn-success mr-2"
          onClick={()=>{props.onClickButtonAddCard(props.index)}}
        >
          +
        </button>
        <h3>{`${props.col.name}`}</h3>
      </div>
      {props.col.cartes.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </section>
  );
}
