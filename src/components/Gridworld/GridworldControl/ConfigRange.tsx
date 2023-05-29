import { ChangeEvent, useContext } from "react";
import { GridworldActionType, GridworldConfig } from "../types";
import {
  GridworldDispatchContext,
  GridworldStateContext,
} from "../GridworldContextProvider";

const ConfigRange = ({
  id,
  label,
  min,
  max,
  step,
  integer = false,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number | "any";
  integer?: boolean;
}) => {
  const state = useContext(GridworldStateContext);
  const dispatch = useContext(GridworldDispatchContext);
  const configKey = id.replace(/-(\w)/g, (_, letter: string) =>
    letter.toUpperCase()
  );
  console.log("ConfigRange", id, label, configKey, min, max, step);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = integer
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
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
        step={step}
        value={state.config[configKey as keyof GridworldConfig]}
        onChange={handleChange}
        className="ml-2 mr-4"
      />
    </>
  );
};

export default ConfigRange;
