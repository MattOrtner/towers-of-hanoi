import React, { useState } from 'react';
import './App.css';
import TowersOfHanoi from './towers-of-hanoi'

const towersOfHanoi = new TowersOfHanoi()
let firstSelection

function App() {
  const [board, setBoard] = useState([...towersOfHanoi.board])
  const [isWin, setWin] = useState(false)

  const selectTower = (index) => {
    return (event) => {
      if (firstSelection === undefined) {
        firstSelection = index
        event.currentTarget.classList.add('selected')

      } else {

        if (towersOfHanoi.move(firstSelection, index)) {
          setBoard([...towersOfHanoi.board])
          
          if (towersOfHanoi.checkWin()) {
            setWin(true)
          }
        }
        firstSelection = undefined
        event.currentTarget.classList.remove('selected')
        
      }
    }

  }
  const restart = () => {
    setWin(false)
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
      {isWin &&
        <h1>YOU DID IT! YOU WON! GREAT JOB!</h1>
      }
      <div className='border'>
        {renderTowers()}
      </div>
      <br />
      {isWin &&
        <button className='restartButton' onClick={restart}>Restart?</button>
      }
    </div>
  );
}

export default App;
/**
 * adding some sort of indicator for ring selection
 * adding posts for each tower to live on
 * adding a move counter
 * let the user choose the number of ring input type='range'
 */