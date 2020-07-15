class TowersOfHanoi {
  constructor() {
    this.board = [
      [1, 2, 3],
      [],
      [],
    ]
  } 
  
  getBoard() {
    return [...this.board]
  }

  move(from, to) {
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
    if (this.board[1].length === 3 || this.board[2].length === 3) {
      return true
    }
  }
  
  restart() {
    this.board = [
      [1, 2, 3],
      [],
      [],
    ]
  }
}

export default TowersOfHanoi
// module.exports = TowersOfHanoi

