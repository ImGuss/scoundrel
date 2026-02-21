import { motion } from "motion/react"

export default function Header(props) {
  const { toggleModal } = props

  const rules = (
    <div className="rules">
      <span>Rules:</span>

      <p>Scoundrel is played with a standard deck of playing cards. All of the red face cards and red aces are removed, along with jokers</p>

      <p>The 26 <span className="blue">Clubs ♣</span> and <span className="blue">Spades ♠</span> in the deck are Monsters. Their damage is equal to their ordered value. (e.g. 10 is 10, Jack is 11, Queen is 12, King is 13, and Ace is 14)</p>

      <p>The 9 <span className="red">Diamonds ♦</span> in the deck are <span>Weapons</span>. Each weapon does as much damage as its value. All weapons in Scoundrel are binding, meaning if you pick one up, you must equip it, and discard your previous weapon.</p>

      <p>The 9 <span className="red">Hearts ♥</span> in the deck are <span>Health Potions</span>. You may only use one health potion each turn, even if you pull two. The second potion you pull is simply discarded. You may not restore your life beyond your starting 20 health.</p>

      <p>The Game ends when either your life reaches 0 or you make your way through the entire Dungeon.</p>

      <p>For more information, please see the full rules <a target="_blank" href="http://stfj.net/art/2011/Scoundrel.pdf">here</a>.</p>

      <p>Created by Zach Gage and Kurt Bieg</p>
    </div>
  )

  const settings = (
    <span className="settings">Settings</span>
  )

  return (
    <header>
      <h1>Scoundrel</h1>
      <nav className="navbar">
        <motion.button
          aria-label="Settings"
          whileHover={{y:-5}}
          whileFocus={{y:-5}}
          onClick={() => toggleModal(settings)}
        >
          <span>⚙</span>
        </motion.button>
        
        <motion.button
          aria-label="Help"
          whileHover={{y:-5}}
          whileFocus={{y:-5}}
        onClick={() => toggleModal(rules)}
        >
          <span>?</span>
        </motion.button>
      </nav>
    </header>
  )
}