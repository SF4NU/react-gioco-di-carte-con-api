export function handleCardsIcons(card) {
  const namedCards = ["QUEEN", "KING", "JACK", "ACE"];
  if (namedCards.includes(card)) {
    const newValue = card.charAt(0);
    return newValue;
  } else {
    return card;
  }
}