export function QuoteDisplay(props) {
  if (props.name === null || props.dialogText === null) {
    return null;
  }

  return (
    <div className="QuoteDisplay">
      <h2 className="CharacterName">{props.name}</h2>
      <p className="DialogText">"{props.dialogText}"</p>
    </div>
  );
}
