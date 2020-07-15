import TowersOfHanoi from "./towers-of-hanoi"

describe('TowersOfHanoi', () => {
  let sut
  beforeAll(() => {
    sut = new TowersOfHanoi()
  })

  afterEach(() => {
    sut = new TowersOfHanoi()
  })
  
  it('#constructor', () => {
    
    expect(sut).toBeInstanceOf(TowersOfHanoi)
    expect(sut.board[0]).toEqual([1, 2, 3])
  })

  describe('#move', () => {
  
    it('returns true and moves top ring to new stack', () => {
      const isValid = sut.move(0, 1)
      
      expect(isValid).toBe(true)
      expect(sut.board).toEqual([[2, 3], [1], []])
    })

    it('returns false if the "from" array is empty', () => {
      const output = sut.move(1, 2)

      expect(output).toEqual(false)
    })

    it('returns false when larger ring is placed on smaller ring', () => {      
      const mockBoard = [
        [2, 3],
        [1],
        []
      ]
      sut.board = mockBoard
      
      const output = sut.move(0, 1)

      expect(output).toBe(false)
      expect(sut.board).toEqual(mockBoard)
    })
  })

  describe('#checkWin', () => {
    it('returns true if stack two is complete', () => {
      sut.board[1] = [3, 2, 1]
      const isWin = sut.checkWin()
      expect(isWin).toBe(true)
    })
    
    it('returns true if stack three is complete', () => {

      sut.board[2] = [3, 2, 1]
      const thirdStackWin = sut.checkWin()
      expect(thirdStackWin).toBe(true)
    })
  })

  describe('#restart', () => {
    it('re-initializes the rings to the left stack', () => {
      sut.board = [
        [],
        [],
        [1, 2, 3],
      ]
      
      sut.restart()

      expect(sut.board[0]).toEqual(expect.arrayContaining([1, 2, 3]))
      expect(sut.board[1]).toEqual(expect.arrayContaining([]))
      expect(sut.board[2]).toEqual(expect.arrayContaining([]))
    })
  })
})
