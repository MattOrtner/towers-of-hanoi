const ConnectFour = require('./towers-of-hanoi')


const conFour = new ConnectFour()
//Array Functions
// //forEach handles side affects
// conFour.board.forEach((row, i) => {
//   console.log(i);
//   console.log('i');

//   row.forEach((cell, j) => {
//     console.log(j);
//     console.log(cell);
    
//   })
// })

//Map
const mapped = conFour.board.map((row) => {
  return row.map((_, j) => {    
    if (j % 2 === 0) {
      return 'red'
    } else {
      return 'black'
    }
  })
})

console.log(mapped.map((row, i) => {
  //all even rows are black
  //all the odd rows are red
  return row.filter((color, j) => {
    if (i % 2 === 0) {
      return color === 'black'
    } else {
      return color === 'red'
    }

    // return i % 2 === 0 ? color === 'black' : color === 'red'
  })
}))

