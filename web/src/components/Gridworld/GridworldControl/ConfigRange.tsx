import { ChangeEvent, useContext } from "react";
import { GridworldConfig } from "../types";
import {
  GridworldDispatchContext,
  GridworldStateContext,
} from "../GridworldContextProvider";
import { GridworldActionType } from "../actions";

const ConfigRange = ({
  id,
  label,
  min,
  max,
  step,
  isInteger = false,
  isLog = false,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number | "any";
  isInteger?: boolean;
  isLog?: boolean;
}) => {
  const state = useContext(GridworldStateContext);
  const dispatch = useContext(GridworldDispatchContext);
  const configKey = id.replace(/-(\w)/g, (_, letter: string) =>
    letter.toUpperCase()
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = isInteger
      ? parseInt(event.target.value)
      : parseFloat(event.target.value);
    dispatch({
      type: GridworldActionType.SET_CONFIG,
      config: {
        ...state.config,
        [configKey]: value,
      },
    });
  };
  const value = state.config[configKey as keyof GridworldConfig];
  return (
    <div className="my-3">
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="ml-2 mr-4"
      />
      <div>{isLog ? `10^${value}` : value}</div>
    </div>
  );
};

export default ConfigRange;
