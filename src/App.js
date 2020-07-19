import React, { useState, useRef } from 'react';
import './App.css';
import TowersOfHanoi from './towers-of-hanoi'

const towersOfHanoi = new TowersOfHanoi()

const firstSelection = {}

function App() {
  const slider = useRef()
  const [board, setBoard] = useState([...towersOfHanoi.board])
  const [isWin, setWin] = useState(false)
  const [counter, setCounter] = useState(0)


  const selectTower = (towerIndex) => {
    return (event) => {
      if (firstSelection.index === undefined) {
        firstSelection.index = towerIndex
        firstSelection.element = event.currentTarget
        firstSelection.element.classList.add('selected')

      } else {

        if (towersOfHanoi.move(firstSelection.index, towerIndex)) {
          setBoard([...towersOfHanoi.board])
          setCounter(counter + 1)
          if (towersOfHanoi.checkWin()) {
            setWin(true)
          }
        } 
        firstSelection.index = undefined
        firstSelection.element.classList.remove('selected')
      }
    }
  }

  
  const restart = () => {
    const ringsSelected = slider.current.value
    const numRings = parseInt(ringsSelected)
    
    setWin(false)
    setCounter(0)

    towersOfHanoi.restart(numRings)
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
          <div className='pole'></div>
        </div>
      )
    })
  }

  return (
    <div className="App">
      <h1 className='title'>Towers Of Hanoi</h1>
      {!isWin ?
        <h1 className='counter'>Number of moves: {counter}</h1> 
        :
        <h1>YOU DID IT!      In {counter} moves!</h1>
      }
      <div>
        <label> Number of rings
          <input onChange={restart} ref={slider} type='range' min='3' max='7' defaultValue='3' step='1'></input>
        </label>
      </div>
      <div className='border'>
        {renderTowers()}
      </div>
      <br />
      <button className='restartButton' onClick={restart}>Restart</button>
    </div>
  );
}

export default App;
/**
 * checkWin() should work with any number of rings
 * prevent user from picking up pole if no rings are present
 * picking up ring and putting it down, shouldn't count as a move
 * if you make a first selection then hit restart the first ring is still selected
 * 
 * 
 * write simple directions for the user if they've never played the game
 * favicon redo
 */