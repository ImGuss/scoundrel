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
      className="test-card-button"
    >
      <div className="test-card">
        <span className={`test-value ${classes}`}>{rank}</span>
        <div className={`test-name ${classes}`}>{type.toUpperCase()}</div>
        <div className="test-spade-1"></div>
        <img className="test-img" src={image} alt={`${rank} of ${suit}`} />
        <div className="test-card-class">{suit}</div>
        <div className="test-spade-2"></div>
        <div className="test-type">Attack</div>
        <div className={`test-upside-down-value ${classes}`}>{rank}</div>
      </div>
    </button>
  )
}