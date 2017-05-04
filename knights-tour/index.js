(() => {
  const data = []
  var app = new Vue({
    el: '#app',

    data: {
      moves: [],
      board: [],
      DIRECTIONS: {
        UP: { row: 0, col: 3, L: [] },
        DOWN: { row: 0, col: -3, L: [] },
        LEFT: { row: -3, col: 0, L: [] },
        RIGHT: { row: 3, col: 0, L: [] }
      },
    },

    created () {
      // create chess board
      this.board = this.createBoard()

      // add L shape to directions
      for (let direction in this.DIRECTIONS) {
        if (this.DIRECTIONS[direction].row === 0) {
          this.DIRECTIONS[direction].L.push({ row: 1, col: 0 })
          this.DIRECTIONS[direction].L.push({ row: -1, col: 0 })
          // move rows
        } else {
          // move cols
          this.DIRECTIONS[direction].L.push({ row: 0, col: -1 })
          this.DIRECTIONS[direction].L.push({ row: 0, col: 1 })
        }
      }

      // this.board[3][0] = 3
      // const chess = this.clone(this.board)
      // console.log(this.board)
      // console.log(chess)
      console.log(this.getMoveList({row:0, col:0}))
    },

    computed: {
    },

    mounted () {
    },

    methods: {

      clone (board) {
        const clone = []

        for (let r = 0; r < 8; r++) {
          const row = []
          for (let c = 0; c < 8; c++) {
            row.push(board[r][c])
          }
          clone.push(row)
        }

        return clone
      },

      createBoard () {
        const board = []

        for (let r = 0; r < 8; r++) {
          const row = []
          for (let c = 0; c < 8; c++) {
            row.push(0)
          }

          board.push(row)
        }

        return board
      },

      isInBounds (position) {
        return position.row >= 0 && position.row <= 7 
          && position.col >= 0 && position.col <= 7;
      },

      isAvailable (board, position) {
        return board[position.row][position.col] === 0
      }

      getMoveList (board, position) {
        const availableMoves = []
        for (let direction in this.DIRECTIONS) {
          let directions = this.DIRECTIONS[direction]
          
          // clone current position
          let newPosition = {
            row: position.row,
            col: position.col
          }

          newPosition.row += directions.row
          newPosition.col += directions.col

          directions.L.forEach( (delta) => {
            let testPos = {
              row: newPosition.row + delta.row,
              col: newPosition.col + delta.col
            }

            if (this.isInBounds(testPos) && this.isAvailable(board, testPos)) {
              availableMoves.push(testPos)
            }
          })
        }

        return availableMoves
      },

      dfs (board, position) {

        const moves = this.getMoveList(board, position)

        moves.forEach((move) => {
          const newBoard = this.clone(board)

          // place move
          newBord[move.row][move.col] = 1
          this.dfs (newBoard, {row: move.row, col: move.col })
        })
      },


    }
  })
})()