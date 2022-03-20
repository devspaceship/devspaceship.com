export type State = 'S' | 'A' | 'T' | 'E';
export type Action = 'N' | 'E' | 'S' | 'W';
export type GridState = State[][];
export type Policy = Action[][];
export interface PolicyWrapper {
  visible: boolean;
  grid: Policy;
}
export type QTable = { [key in Action]: number }[][];
