export function swapPlayingCards(index, newCard, cards) {
  const newCards = [...cards];
  newCards[index] = newCard;
  return newCards;
}
