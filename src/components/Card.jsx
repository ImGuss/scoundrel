import { motion } from "motion/react"
import clsx from "clsx"

export default function Card(props) {
  const { rank, icon, suit, value, image, type, card, handleClick } = props

  const classes = clsx({
    "red" : type === "weapon" || type === "potion",
    "black": type === "monster"
  })

  return (
    <motion.button
      className="card-button"
      whileHover={{y:-5}}
      whileFocus={{y:-5}}
      aria-live="polite"
      aria-label={`${rank} of ${suit}`}
      onClick={() => handleClick(card)}
    >
      <div className="card">
        <span className={`rank ${classes}`}>{rank}</span>
        <div className={`name ${classes}`}>{type.toUpperCase()}</div>
        <div className={`suit-1 ${classes}`}>{icon}</div>
        <img className="card-img" src={image} alt={`${rank} of ${suit}`} />
        <div className="card-class">{suit}</div>
        <div className="suit-2">{icon}</div>
        <div className="card-type">Attack</div>
        <div className={`upside-down-rank ${classes}`}>{rank}</div>
      </div>
    </motion.button>
  )
}