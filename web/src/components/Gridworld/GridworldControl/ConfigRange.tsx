import { ChangeEvent, useContext } from "react";
import { GridworldConfig } from "../types";
import {
  GridworldDispatchContext,
  GridworldStateContext,
} from "../GridworldContextProvider";
import { GridworldActionType } from "../actions";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type SliderProps = React.ComponentProps<typeof Slider>;

const ConfigRange = ({
  id,
  label,
  min,
  max,
  step,
  isLog = false,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  isLog?: boolean;
}) => {
  const state = useContext(GridworldStateContext);
  const dispatch = useContext(GridworldDispatchContext);
  const configKey = id.replace(/-(\w)/g, (_, letter: string) =>
    letter.toUpperCase()
  );

  const handleChange = (value: number[]) => {
    dispatch({
      type: GridworldActionType.SET_CONFIG,
      config: {
        ...state.config,
        [configKey]: value[0],
      },
    });
  };

  const value = state.config[configKey as keyof GridworldConfig];
  return (
    <div className="m-3">
      <Label htmlFor={id}>{label}</Label>
      <Slider
        id={id}
        name={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={handleChange}
        className="mx-auto my-2 w-32"
      />
      <div>{isLog ? `10^${value}` : value}</div>
    </div>
  );
};

export default ConfigRange;
