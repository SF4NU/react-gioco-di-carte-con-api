# [Demo](https://sf4nu.github.io/react-gioco-di-carte-con-api/)

## Finito e funzionante 👍, quando avrò capito meglio node.js farò un'altra versione del gioco che includerà anche la classifica collegata a un database 

# Gioco del 4

Questo repository contiene il codice sorgente per un'applicazione web del "Gioco del 4", l'ho chiamato così perché si basa sull'avere 4 carte in mano e 4 sul tavolo. Implementato utilizzando React.js.

## Funzionalità Principali
- **Fetch delle Carte**: Utilizza l'API di Deck of Cards per ottenere le carte necessarie per il gioco.
- **Gioco**: Le 4 carte che cambiano ogni 3 secondi sono visualizzate sul tavolo, con la possibilità di selezionare una carta facendo clic su di essa, se corrisponde ad una delle carte in mano si guadagna un punto.
- **Menu**: Un menu iniziale con 3 pulsanti.
- **Game Over**: Sezione Game Over che dà la possibilità di tornare al menu principale o di giocare un'altra partita.
  

## Dipendenze
- React: Utilizzato per la creazione dell'interfaccia utente.
- Axios: Libreria per effettuare richieste HTTP per ottenere le carte dall'API di Deck of Cards.

## API Utilizzate
Il gioco del 4 utilizza l'API di [Deck of Cards](https://deckofcardsapi.com/) per ottenere le carte necessarie per il gioco. L'API fornisce un set di endpoint che consentono di interagire con un mazzo di carte, incluso il mescolamento e la distribuzione delle carte.

---
