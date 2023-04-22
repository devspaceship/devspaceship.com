import { ChangeEvent, FC, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import type { Params } from './types'

// TODO Use function of previous value in setter
// TODO Or switch to useReducer
interface ControlProps {
  params: Params
  setParams: (params: Params) => void
}

const Control: FC<ControlProps> = (props) => {
  const { params, setParams } = props
  const [sliderState, setSliderState] = useState({
    slider_d: 300,
    slider_alpha: 10,
    slider_beta: 12,
  })

  const handle_change = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setSliderState({ ...sliderState, [target.id]: parseInt(target.value) })
  }

  const handle_after_change = (e: any) => {
    const value = e.target.value

    switch (e.target.id) {
      case 'slider_d':
        setParams({ ...params, d: parseInt(value) })
        break
      case 'slider_alpha':
        setParams({ ...params, alpha: parseInt(value) })
        break
      case 'slider_beta':
        setParams({ ...params, beta: parseInt(value) })
        break
    }
  }

  return (
    <Row md={2} lg={3} className="justify-content-evenly">
      <div>
        <Form.Label htmlFor="slider_d">d</Form.Label>
        <Form.Range
          min="200"
          max="800"
          value={sliderState.slider_d}
          id="slider_d"
          onChange={handle_change}
          onTouchEnd={handle_after_change}
          onMouseUp={handle_after_change}
        />
        <div>{sliderState.slider_d}</div>
      </div>
      <div>
        <Form.Label htmlFor="slider_alpha">α</Form.Label>
        <Form.Range
          min="1"
          max="15"
          value={sliderState.slider_alpha}
          id="slider_alpha"
          onChange={handle_change}
          onTouchEnd={handle_after_change}
          onMouseUp={handle_after_change}
        />
        <div>{sliderState.slider_alpha}</div>
      </div>
      <div>
        <Form.Label htmlFor="slider_beta">β</Form.Label>
        <Form.Range
          min="1"
          max="15"
          value={sliderState.slider_beta}
          id="slider_beta"
          onChange={handle_change}
          onTouchEnd={handle_after_change}
          onMouseUp={handle_after_change}
        />
        <div>{sliderState.slider_beta}</div>
      </div>
    </Row>
  )
}

export default Control
