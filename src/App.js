import React, { useState } from 'react';
import './App.css';
import TowersOfHanoi from './towers-of-hanoi'

const towersOfHanoi = new TowersOfHanoi()

const firstSelection = {}

function App() {
  const [board, setBoard] = useState([...towersOfHanoi.board])
  const [isWin, setWin] = useState(false)
  const [counter, setCounter] = useState(0)



  const selectTower = (index) => {
    return (event) => {
      if (firstSelection.index === undefined) {
        firstSelection.index = index
        firstSelection.element = event.currentTarget
        firstSelection.element.classList.add('selected')

      } else {

        if (towersOfHanoi.move(firstSelection.index, index)) {
          setBoard([...towersOfHanoi.board])
          firstSelection.element.classList.remove('selected')
          setCounter(counter + 1)
          if (towersOfHanoi.checkWin()) {
            setWin(true)
          }
        }
        firstSelection.index = undefined
      }
    }
  }

  const createNumRings = (event) => {
    const ringsSelected = event.currentTarget.value
    const numRings = parseInt(ringsSelected)

    
    const newArray = []
    for (let i = 1; i <= numRings; i += 1) {
      newArray.push(i)
    }
    
    towersOfHanoi.board = [newArray, [], []]
    setBoard([...towersOfHanoi.board])
    
  }
    
    const restart = () => {
      
    setWin(false)
    setCounter(0)
    towersOfHanoi.restart()
    setBoard([...towersOfHanoi.board])
  }

  const renderRings = (tower) => {
    return tower.map((ringSize) => {
      return (
        <div key={ringSize} className={`ring size-${ringSize}`}></div>
      )
    })
  }

  const renderTowers = () => {
    return board.map((tower, i) => {
      let sequence
      if (i === 0) {
        sequence = 'left'
      } else if (i === 1) {
        sequence = 'center'
      } else {
        sequence = 'right'
      }
      return (
        <div
          key={sequence}
          onClick={selectTower(i)}
          className={`tower ${sequence}`}
        >
          {renderRings(tower)}
        </div>
      )
    })
  }

  return (
    <div className="App">
      <h1 className='title'>Towers Of Hanoi</h1>
      {!isWin && 
      <h1 className='counter'>Number of moves: {counter}</h1>
      }
      {isWin &&
        <h1>YOU DID IT!      In {counter} moves!</h1>
      }
      <div>
        <label> Number of rings
          <input onChange={createNumRings} type='range' min='3' max='7' defaultValue='3' step='1'></input>
        </label>
      </div>
      <div className='border'>
        {renderTowers()}
      </div>
      <br />
      <button className='restartButton' onClick={restart}>Restart?</button>
    </div>
  );
}

export default App;
/**
 * fix winning towers number on instance of win function
 * adding posts for each tower to live on
 * have the restart function reset the whole-
 * board w/ correct number of rings
 */