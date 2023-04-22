import React, { useState } from 'react'
import GridCell from './gridcell'
import { Action, GridState, PolicyWrapper } from './types'

interface GridWorldSVGProps {
  gridstate: GridState
  setGridstate: (gridstate: GridState) => void
  policy: PolicyWrapper
}

const GridWorldSVG = (props: GridWorldSVGProps) => {
  const { gridstate, setGridstate, policy } = props
  // ['NONE', 'MOVING_START', 'MOVING_END', 'ADDING_TRAPS', 'REMOVING_TRAPS']
  const [mouseState, setMouseState] = useState('NONE')

  const rows = gridstate.length
  const columns = gridstate[0].length

  const getMousePosition = (e: React.MouseEvent) => {
    const svg = document.querySelector('#gridworld-svg')
    if (!svg) {
      return [0, 0]
    }
    const width = svg.clientWidth
    const height = svg.clientHeight
    const i = Math.floor((e.nativeEvent.offsetY / height) * rows)
    const j = Math.floor((e.nativeEvent.offsetX / width) * columns)
    return [i, j]
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const [i, j] = getMousePosition(e)
    if (i < 0 || i >= rows || j < 0 || j >= columns) {
      return
    }

    const stateToMouseState = {
      S: 'MOVING_START',
      E: 'MOVING_END',
      T: 'REMOVING_TRAPS',
      A: 'ADDING_TRAPS',
    }
    const state = gridstate[i][j]
    setMouseState(stateToMouseState[state])

    if (state === 'A' || state === 'T') {
      let newGridstate = [...gridstate]
      newGridstate[i][j] = state === 'A' ? 'T' : 'A'
      setGridstate(newGridstate)
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    setMouseState('NONE')
  }

  const handleMouseOut = (e: React.MouseEvent) => {
    const [i, j] = getMousePosition(e)
    if (i < 0 || i >= rows || j < 0 || j >= columns) {
      setMouseState('NONE')
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseState === 'NONE') {
      return
    }

    const [i, j] = getMousePosition(e)
    if (i < 0 || i >= rows || j < 0 || j >= columns) {
      return
    }
    const state = gridstate[i][j]

    if (state === 'T' || state === 'A') {
      if (mouseState === 'MOVING_START') {
        let newGridstate: GridState = [...gridstate].map((row) =>
          row.map((s) => (s === 'S' ? 'A' : s)),
        )
        newGridstate[i][j] = 'S'
        setGridstate(newGridstate)
        return
      } else if (mouseState === 'MOVING_END') {
        let newGridstate: GridState = [...gridstate].map((row) =>
          row.map((s) => (s === 'E' ? 'A' : s)),
        )
        newGridstate[i][j] = 'E'
        setGridstate(newGridstate)
        return
      }
    }

    if (
      (mouseState === 'ADDING_TRAPS' && state === 'A') ||
      (mouseState === 'REMOVING_TRAPS' && state === 'T')
    ) {
      let newGridstate = [...gridstate]
      newGridstate[i][j] = state === 'A' ? 'T' : 'A'
      setGridstate(newGridstate)
    }
  }

  return (
    <svg
      width="60vw"
      height="40vw"
      viewBox="0 0 1.5 1"
      id="gridworld-svg"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMove}
    >
      {props.gridstate.map((row, i) =>
        row.map((state, j) => (
          <GridCell
            key={i * columns + j}
            rows={rows}
            columns={columns}
            i={i}
            j={j}
            state={state}
            policy={[policy.visible, policy.grid[i][j]]}
          />
        )),
      )}
    </svg>
  )
}

export default GridWorldSVG
