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
        if (towersOfHanoi.board[towerIndex].length === 0) return
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
    firstSelection.element.classList.remove('selected')
    delete firstSelection.index 
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
      
      const sequence = ['left', 'center', 'right'][i]
      
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
      <p>Move the stack of rings to a new tower. Larger rings can't be placed on smaller rings</p>
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


