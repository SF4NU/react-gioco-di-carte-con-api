import "./styles/seeRules.css"

function SeeRules({setRules}) {

  function returnToMenu() {
    setRules(false);
  }

  return(
    <>
      <section className="rules-section">
  <button className="return-button button" onClick={() => {
    returnToMenu();
  }}>Indietro</button>

  <div className="rules-content">
    <p className="p1">Scopo del gioco:</p>
    <ul className="first-ul">
      <li>Il tuo obiettivo è accumulare il punteggio più alto possibile.</li>
      <li>Ogni carta ha un numero associato: A, 2, 3, ..., 10, J, Q, K.</li>
      <li>Il punteggio aumenta di 1 ogni volta che indovini correttamente il numero di una carta.</li>
      <li>Il punteggio diminuisce di 1 ogni volta che sbagli.</li>
    </ul>
    <p className="p2">Come giocare:</p>
    <ul className="second-ul">
      <li>Verranno mostrate delle carte sullo schermo.</li>
      <li>Clicca su una carta che corrisponde ad almeno una nella tua mano.</li>
      <li>Le carte verranno mescolate ogni 3 secondi, quindi sii veloce!</li>
    </ul>
    <p className="p3">Ricorda:</p>
    <ul className="third-ul">
      <li>Le carte vengono mostrate solo per un breve periodo, quindi presta attenzione!</li>
      <li>Concentrati sui numeri delle carte e cerca di ricordarli per migliorare il tuo punteggio.</li>
      <li>Il seme della carta non è rilevante</li>
    </ul>
  </div>
</section>
    </>
  );
}

export default SeeRules