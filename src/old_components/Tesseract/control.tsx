import {
  ChangeEvent,
  FC,
  MouseEventHandler,
  TouchEventHandler,
  useState,
} from "react";
import type { Params } from "./types";

// TODO Use function of previous value in setter
// TODO Or switch to useReducer
interface ControlProps {
  params: Params;
  setParams: (params: Params) => void;
}

const Control: FC<ControlProps> = (props) => {
  const { params, setParams } = props;
  const [sliderState, setSliderState] = useState({
    slider_d: 300,
    slider_alpha: 10,
    slider_beta: 12,
  });

  const handle_change = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSliderState({ ...sliderState, [target.id]: parseInt(target.value) });
  };

  const handle_after_change_touch: TouchEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    handle_after_change(target);
  };

  const handle_after_change_mouse: MouseEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    handle_after_change(target);
  };

  const handle_after_change = (target: HTMLInputElement) => {
    const value = target.value;
    switch (target.id) {
      case "slider_d":
        setParams({ ...params, d: parseInt(value) });
        break;
      case "slider_alpha":
        setParams({ ...params, alpha: parseInt(value) });
        break;
      case "slider_beta":
        setParams({ ...params, beta: parseInt(value) });
        break;
    }
  };

  return (
    <div className="flex flex-row justify-evenly">
      <div>
        <label className="mr-3" htmlFor="slider_d">
          d
        </label>
        <input
          type="range"
          min="200"
          max="800"
          value={sliderState.slider_d}
          id="slider_d"
          onChange={handle_change}
          onTouchEnd={handle_after_change_touch}
          onMouseUp={handle_after_change_mouse}
        />
        <div>{sliderState.slider_d}</div>
      </div>
      <div>
        <label className="mr-3" htmlFor="slider_alpha">
          α
        </label>
        <input
          type="range"
          min="1"
          max="15"
          value={sliderState.slider_alpha}
          id="slider_alpha"
          onChange={handle_change}
          onTouchEnd={handle_after_change_touch}
          onMouseUp={handle_after_change_mouse}
        />
        <div>{sliderState.slider_alpha}</div>
      </div>
      <div>
        <label className="mr-3" htmlFor="slider_beta">
          β
        </label>
        <input
          type="range"
          min="1"
          max="15"
          value={sliderState.slider_beta}
          id="slider_beta"
          onChange={handle_change}
          onTouchEnd={handle_after_change_touch}
          onMouseUp={handle_after_change_mouse}
        />
        <div>{sliderState.slider_beta}</div>
      </div>
    </div>
  );
};

export default Control;
