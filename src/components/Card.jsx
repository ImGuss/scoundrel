import clsx from "clsx"

export default function Card(props) {
  const { rank, suit, value, image, card, handleClick } = props

  const classes = clsx({
    "card": "card",
    "red" : suit === "Hearts" || suit === "Diamonds",
    "blue": suit === "Spades" || suit === "Clubs"
  })

  return (
    <button
      aria-label={`${rank} of ${suit}`}
      className={classes}
      onClick={() => handleClick(card)}
    >
      {image}
    </button>
  )
}