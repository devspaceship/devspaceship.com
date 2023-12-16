use std::collections::HashMap;

use crate::models::Action;

#[derive(Debug, PartialEq)]
pub enum Cell {
    Air,
    Wall,
    End,
}

pub type Grid<T> = Vec<Vec<T>>;
pub type ActionValueMap = HashMap<Action, f64>;
