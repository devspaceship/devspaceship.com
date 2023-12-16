use std::collections::HashMap;

use crate::models::Policy;

#[derive(Debug, PartialEq)]
pub enum Cell {
    Air,
    Wall,
    End,
}

pub type Grid<T> = Vec<Vec<T>>;
pub type ActionValues = HashMap<Policy, f64>;
