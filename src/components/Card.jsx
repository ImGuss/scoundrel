import clsx from "clsx"

export default function Card(props) {
  const { rank, suit, value, image, type, card, handleClick } = props

  const classes = clsx({
    "red" : type === "weapon" || type === "potion",
    "black": type === "monster"
  })

  return (
    <button
      aria-live="polite"
      aria-label={`${rank} of ${suit}`}
      onClick={() => handleClick(card)}
      className="card-button"
    >
      <div className="card">
        <span className={`value ${classes}`}>{rank}</span>
        <div className={`name ${classes}`}>{type.toUpperCase()}</div>
        <div className="spade-1"></div>
        <img className="card-img" src={image} alt={`${rank} of ${suit}`} />
        <div className="card-class">{suit}</div>
        <div className="spade-2"></div>
        <div className="card-type">Attack</div>
        <div className={`upside-down-value ${classes}`}>{rank}</div>
      </div>
    </button>
  )
}