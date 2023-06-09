export const ROW_SIZE = 8
export const COL_SIZE = 15

export const COLOR_MAP = [
  'white', //None
  'pink', //I
  'purple', //T
  'green', //L
  'brown', //J
  'red', //Z
  'orange', //S
  'blue', //O
]

export const SHAPE = [
  /* --------------- */
  [
    [
      // I
      [1, 1, 1, 1],
    ],
    [[1], [1], [1], [1]],
  ],
  [
    /* --------------- */

    [
      // T
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
  ],
  [
    /* --------------- */
    [
      // L
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
  ],
  [
    /* --------------- */
    [
      // J
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  ],
  [
    /* --------------- */
    [
      // Z
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  ],
  [
    /* --------------- */
    [
      // S
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  ],
  [
    /* --------------- */
    [
      // O
      [1, 1],
      [1, 1],
    ],
  ],
]

export const getShape = (
  shapePos: number,
  rotatePos: number,
  xPos: number,
  yPos: number,
) =>
  SHAPE[shapePos][rotatePos].map((row, rowPos) =>
    row.map((col, colPos) =>
      col ? xPos + colPos + ROW_SIZE * (rowPos + yPos) : -1,
    ),
  )

export const getRandomShape = () =>
  Math.round((SHAPE.length - 1) * Math.random())
