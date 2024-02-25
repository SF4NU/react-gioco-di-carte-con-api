export function handleCardsImages(card) {
  if (card === "SPADES") {
    return 0;
  } else if (card === "HEARTS") {
    return 1;
  } else if (card === "CLUBS") {
    return 2;
  } else {
    return 3;
  }
}