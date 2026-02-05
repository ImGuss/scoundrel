import { useState } from 'react'
import './App.css'

// assets
import { cardBack } from './assets/cards'

// utils
import { shuffleCards } from './utils'

// components
import Header from './components/Header'
import Card from './components/Card'


function App() {
  // state values
  const [shuffledDeck, setShuffledDeck] = useState(() => shuffleCards())
  const [currentWeapon, setCurrentWeapon] = useState({})
  const [currentMonsters, setCurrentMonsters] = useState([])
  const [currentHealth, setCurrentHealth] = useState(20)

  // derived values
  const topFourCards = shuffledDeck.slice(0, 4)

  // functions
  function reShuffleCards() {
    const newShuffledCards = shuffleCards()
    setShuffledDeck(newShuffledCards)
  }

  function selectWeapon(card) {
    setCurrentWeapon(card)
  }

  function selectMonsterToFight(card) {
    setCurrentMonsters(prevMonsters => [...prevMonsters, card])
  }

  function selectPotion(card) {
    setCurrentHealth(prevHealth => (
      prevHealth + card.value > 20 ? 20 : prevHealth + card.value
    ))
  }

  // elements
  const currentRoomElements = topFourCards.map(card => {
    function handleClick(clickedCard) {
      console.log(`clicked card ${JSON.stringify(clickedCard)}`)
      if (clickedCard.suit === "Spades" || clickedCard.suit === "Clubs") {
        selectMonsterToFight(clickedCard)
      } else if (clickedCard.suit === "Hearts") {
        selectPotion(clickedCard)
      }
      else {
        selectWeapon(clickedCard)
      }
    }

    return (
      <Card
        key={card.code}
        rank={card.rank}
        suit={card.suit}
        value={card.value}
        image={card.image}
        card={card}
        handleClick={handleClick}
      />
    )
  })

  function logCurrentValue(card) {
    console.log(card)
  }

  // writing this down so i don't forget. might update state to remove the cards
  // that are discarded by doing a setShuffledDeck(prevDeck => prevDeck.slice(4))
  // or something like that. have to test

  return (
    <>
      <Header />
      <div className="game-container">
        <section className="dungeon-container">
          <div className="dungeon">
            <button onClick={reShuffleCards} className="card-back">{cardBack}</button>
          </div>

          <div className="room">
            {currentRoomElements}
          </div>
        </section>

        {Object.keys(currentWeapon).length > 0  ?
          <section className="weapon-container">
            <Card
              rank={currentWeapon.rank}
              suit={currentWeapon.suit}
              value={currentWeapon.value}
              image={currentWeapon.image}
              handleClick={() => logCurrentValue(currentWeapon)}
            />
          </section> : null
        }
      </div>
    </>
  )
}

export default App
