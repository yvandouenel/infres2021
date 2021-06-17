// Stateless component : c'est à dire que le composant n'a pas de state et qu'il n'a
// donc pas besoin d'hériter de la classe "Component" 
// En revanche, il récupère des arguments passés par son composant parent (Table) via
// le paramètre props
export default function Term(props) {
    return <button 
    onClick={(e) => {
        props.onClickTerm(e, props.id);
    }}
     className="m-3 btn btn-warning">
         {`${props.name}`}
         </button>;
  }