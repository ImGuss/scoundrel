import { cards } from "./assets/cards";

export function shuffleCards() {
  const shuffledCards = cards
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const randomNum = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[randomNum]] =
    [shuffledCards[randomNum], shuffledCards[i]]
  }
  return shuffledCards
}