use std::collections::HashMap;

#[derive(Debug)]
pub enum Cell {
    Air,
    Wall,
    End,
}

#[derive(Eq, Hash, PartialEq, Debug, Clone, Copy)]
pub enum Policy {
    Up,
    Down,
    Left,
    Right,
}

pub type Grid<T> = Vec<Vec<T>>;
pub type CellGrid = Grid<Cell>;
pub type PolicyGrid = Grid<Policy>;
pub type StateValueGrid = Grid<f64>;
pub type ActionValue = HashMap<Policy, f64>;
pub type ActionValueGrid = Grid<ActionValue>;
