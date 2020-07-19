class TowersOfHanoi {
  constructor() {
    this.board = [
      [1, 2, 3],
      [],
      [],
    ]
    this.numRings = 3
  } 
  

  move(from, to) {
    if (from === to) return 

    const fromStack = this.board[from]
    const toStack = this.board[to]
    if (fromStack.length === 0) {
      return false
    } else if (fromStack[0] > toStack[0]) {
      return false

    }
    

    
    const ring = fromStack.shift()
    toStack.unshift(ring)
    return true
  }

  checkWin() {
    if (this.board[1].length === this.numRings || this.board[2].length === this.numRings) {
      return true
    }
  }
  
  restart(numRings = 3) {
    const newArray = []
    for (let i = 1; i <= numRings; i += 1) {
      newArray.push(i)
    }

    this.board = [newArray, [], []]
    this.numRings = numRings
  }
}

export default TowersOfHanoi
// module.exports = TowersOfHanoi

