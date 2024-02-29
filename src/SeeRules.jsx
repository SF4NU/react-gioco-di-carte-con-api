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
      <li>Il tuo <b>obiettivo</b> è accumulare il punteggio più alto possibile.</li>
      <li>Ogni carta ha un numero associato: A, 2, 3, ..., 10, J, Q, K.</li>
      <li>Il <b>punteggio aumenta</b>  di 1 ogni volta che indovini correttamente il <b>valore</b> di una carta e il suo <b>colore</b>.</li>
      <li>Il <b>punteggio diminuisce</b> di 1 ogni volta che sbagli.</li>
    </ul>
    <p className="p2">Come giocare:</p>
    <ul className="second-ul">
      <li>Verranno mostrate <b>4 carte</b> sullo schermo.</li>
      <li><b>Clicca</b> su una carta che corrisponde ad almeno una nella tua mano.</li>
      <li>Le carte verranno mescolate <b>velocemente!</b></li>
    </ul>
    <p className="p3">Ricorda:</p>
    <ul className="third-ul">
      <li>Le carte vengono mostrate solo per un breve periodo, quindi <b>presta attenzione!</b></li>
      <li>Concentrati sui <b>valori e colori</b> delle carte e cerca di <b>ricordarli</b> per migliorare il tuo punteggio.</li>
    </ul>
  </div>
</section>
    </>
  );
}

export default SeeRules