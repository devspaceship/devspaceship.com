use std::collections::HashMap;

#[derive(Debug, PartialEq)]
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
pub type ActionValue = HashMap<Policy, f64>;
