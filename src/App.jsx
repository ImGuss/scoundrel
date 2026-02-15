import { useEffect, useState, useRef } from 'react'
import './App.css'

import { motion } from 'motion/react'

// utils
import { shuffleCards } from './utils'

// components
import Header from './components/Header'
import Card from './components/Card'
import Modal from './components/Modal'


function App() {
  // state values
  const [shuffledDeck, setShuffledDeck] = useState(() => shuffleCards())
  const [currentWeapon, setCurrentWeapon] = useState({})
  const [currentMonsters, setCurrentMonsters] = useState([])
  const [currentHealth, setCurrentHealth] = useState(20)
  const [roomCards, setRoomCards] = useState([])
  const [canRun, setCanRun] = useState(true)
  const [canHeal, setCanHeal] = useState(true)
  const [resetGame, setResetGame] = useState(false)
  const [modalBody, setModalBody] = useState(null)

  // refs
  const dialogRef = useRef(null)


  useEffect(() => {
    // draw 4 cards on first render and when game is reset
    const prevDeck = shuffledDeck
    setRoomCards(prevDeck.slice(0, 4))
    setShuffledDeck(prevDeck.slice(4))
  }, [resetGame])


  // derived values
  const currentWeaponExists = Object.keys(currentWeapon).length > 0 ? true : false
  const deckIsEmpty = shuffledDeck.length === 0 ? true : false
  const roomIsEmpty = roomCards.length === 0 ? true : false
  const totalCardsLeft =
    currentWeaponExists ?
    shuffledDeck.length + roomCards.length + currentMonsters.length + 1 :
    shuffledDeck.length + roomCards.length + currentMonsters.length
  const discardIsEmpty = totalCardsLeft < 44 ? false : true
  const gameIsLost = currentHealth <= 0 ? true : false
  const gameIsWon =
    !gameIsLost && deckIsEmpty && roomIsEmpty ||
    !gameIsLost && deckIsEmpty && roomCards.every(card => card.suit === "Hearts") ?
    true : false

console.log(totalCardsLeft)

  if (canRun && deckIsEmpty) setCanRun(false)

  if (!deckIsEmpty && roomCards.length === 1) {
    const threeNextCards = shuffledDeck.slice(0, 3)
    setRoomCards(prevCard => [...prevCard, ...threeNextCards])
    setShuffledDeck(prevDeck => prevDeck.slice(3))
    setCanRun(true)
    setCanHeal(true)
  }


  useEffect(() => {
    // calculates score and renders modal if game is won or lost
    let deckMonsterHP = 0
    let totalPotion = 0
    shuffledDeck.forEach(card => {
      if (card.type === "monster") {
        deckMonsterHP+= card.value
      }
    })
    roomCards.forEach(card => {
      if (card.type === "monster") {
        deckMonsterHP+= card.value
      }
    })

    if (currentHealth === 20 && gameIsWon) {
      roomCards.forEach(card => {
        if (card.type === "potion")
          totalPotion += card.value
      })
    }
    const score = currentHealth - deckMonsterHP + totalPotion
    const gameOverBody = gameIsWon ? (
      <div>
        <h1>Congrats! You've won! Your score is {score}</h1>
        <button onClick={playAgain}>Play again</button>
      </div> 
    ) : (
      <div>
        <h1>Sorry! Try again! Your score was {score}</h1>
        <button onClick={playAgain}>Play again</button>
      </div>
    )
    if (gameIsWon || gameIsLost) toggleModal(gameOverBody)
  }, [gameIsWon, gameIsLost])


  // functions
  function removeCardFromRoom(card) {
    setRoomCards(prevRoom => prevRoom.filter(item => item.code !== card.code))
  }
  
  function selectWeapon(card) {
    removeCardFromRoom(card)
    setCurrentWeapon(card)
    setCurrentMonsters([])
    setCanRun(false)
  }

  function dealDamage(value) {
    setCurrentHealth(prevHealth => prevHealth - value)
  }

  function fightWithFists(card) {
    dealDamage(card.value)
    removeCardFromRoom(card)
    setCanRun(false)
    dialogRef.current.close()
  }

  function fightWithWeapon(card) {
    const damageDone = card.value - currentWeapon.value <= 0 ?
      0 : card.value - currentWeapon.value
    dealDamage(damageDone)
    removeCardFromRoom(card)
    setCurrentMonsters(prevMonsters => {
      if (prevMonsters.length === 4) {
        return [...prevMonsters.slice(1), card]
      } else {
        return [...prevMonsters, card]
      }
    })
    setCanRun(false)
    dialogRef.current.close()
  }

  function fistsOrWeapon(card) {
    const body = (
      <div className="weapon-or-fists">
        <button className="weapon-button" onClick={() => fightWithWeapon(card)}>Weapon</button>
        <button className="fists-button" onClick={() => fightWithFists(card)}>Fists</button>
      </div>
    )
    toggleModal(body)
  }

  function selectMonsterToFight(card) {
    const lastFoughtMonster = currentMonsters.at(-1)
    if (!currentWeaponExists || lastFoughtMonster?.value <= card.value) {
      fightWithFists(card)
      setCanRun(false)
    } else {
      fistsOrWeapon(card)
    }
  }

  function selectPotion(card) {
    if (!canHeal) {
      removeCardFromRoom(card)
      setCanRun(false)
      return
    }
    removeCardFromRoom(card)
    setCurrentHealth(prevHealth => (
      prevHealth + card.value > 20 ? 20 : prevHealth + card.value
    ))
    setCanHeal(false)
    setCanRun(false)
  }

  function runFromRoom() {
    setCanRun(false)
    const newRoom = shuffledDeck.slice(0, 4)
    const prevDeck = shuffledDeck.slice(4)
    setShuffledDeck(() => [...prevDeck, ...roomCards])
    setRoomCards(newRoom)
  }

  function toggleModal(body) {
    setModalBody(body)
    dialogRef.current.showModal()
  }

  function playAgain() {
    setCurrentWeapon({})
    setRoomCards([])
    setCurrentMonsters([])
    setCurrentHealth(20)
    setCanRun(true)
    setCanHeal(true)
    setShuffledDeck(shuffleCards())
    setResetGame(prevResetGame => !prevResetGame)
    dialogRef.current.close()
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
        icon={card.icon}
        suit={card.suit}
        value={card.value}
        image={card.image}
        type={card.type}
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
          icon={card.icon}
          suit={card.suit}
          value={card.value}
          image={card.image}
          type={card.type}
          card={card}
          handleClick={null}
        />
      </div>
    )
  })

  return (
    <>
      <Header
        toggleModal={toggleModal}
      />
      <Modal dialogRef={dialogRef}>
        {modalBody}
      </Modal>
      <div className="game-container">

        <section className="dungeon-container">
          <div className="game-info-container">
            <div className="cards-left">
              <span className="game-info" aria-label="Cards left in deck">Cards Left: {shuffledDeck.length}</span>
              </div>
            <div className="health">
              <span className="game-info">❤️ {currentHealth < 0 ? 0 : currentHealth}</span>
            </div>
          </div>
            { deckIsEmpty ? <div className="empty-pile">EMPTY</div> :
              <div className="card-back">SCOUNDREL</div>
            }
            <div className="room">
              {currentRoomElements}
            </div>
          { discardIsEmpty ? <div className="empty-pile discard">EMPTY</div> :
            <div className="card-back discard">SCOUNDREL</div>
          }
        </section>

        <section className="battle-container">
          {currentWeaponExists ?
            <div className="weapon">
              <Card
                rank={currentWeapon.rank}
                icon={currentWeapon.icon}
                suit={currentWeapon.suit}
                value={currentWeapon.value}
                image={currentWeapon.image}
                type={currentWeapon.type}
                handleClick={null}
              />
            </div> : <div className="empty-weapon"> </div>
          }
          {currentMonsters.length > 0 ?
              currentMonsterElements : null
          }
          <motion.button
            whileHover={{y: canRun? -5 : 0}}
            whileFocus={{y: canRun? -5 : 0}}
            className="run-button"
            disabled={canRun ? false : true}
            aria-disabled={canRun ? false : true}
            onClick={runFromRoom}
          >
            Run
          </motion.button>
        </section>
      </div>
    </>
  )
}

export default App
