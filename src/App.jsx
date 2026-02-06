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
  const [roomCards, setRoomCards] = useState(shuffledDeck.slice(0, 4))

  // derived values
  const currentWeaponExists =
    Object.keys(currentWeapon).length > 0 ? true : false

  // functions
  function reShuffleCards() {
    const newShuffledCards = shuffleCards()
    setShuffledDeck(newShuffledCards)
  }

  function removeCardFromRoom(card) {
    setRoomCards(prevRoom => prevRoom.filter(item => item.code !== card.code))
  }
  
  function selectWeapon(card) {
    removeCardFromRoom(card)
    setCurrentWeapon(card)
    setCurrentMonsters([])
  }

  function selectMonsterToFight(card) {
    if (!currentWeaponExists) { return }
    const lastFoughtMonster = currentMonsters.at(-1)
     if (currentMonsters.length === 0 || card.value <= lastFoughtMonster.value) {
      removeCardFromRoom(card)
      setCurrentMonsters(prevMonsters => [...prevMonsters, card])
    }
  }

  function selectPotion(card) {
    removeCardFromRoom(card)
    setCurrentHealth(prevHealth => (
      prevHealth + card.value > 20 ? 20 : prevHealth + card.value
    ))
  }

  // elements
  const currentRoomElements = roomCards.map(card => {
    function handleClick(clickedCard) {
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

  const currentMonsterElements = currentMonsters.map(card => {
    return (
      <div key={card.code} className="monsters">
        <Card
          rank={card.rank}
          suit={card.suit}
          value={card.value}
          image={card.image}
          card={card}
          handleClick={null}
        />
      </div>
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
        <section className="battle-container">
          {currentWeaponExists ?
            <div className="weapon">
              <Card
                rank={currentWeapon.rank}
                suit={currentWeapon.suit}
                value={currentWeapon.value}
                image={currentWeapon.image}
                handleClick={null}
              />
            </div> : null
          }
          {currentMonsters.length > 0 ?
              currentMonsterElements : null
          }
        </section>
      </div>
    </>
  )
}

export default App
