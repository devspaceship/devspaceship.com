use std::collections::HashMap;

pub type Matrix<T> = Vec<Vec<T>>;
pub type Grid = Matrix<Cell>;
pub type Policy = Matrix<PolicyDirection>;
pub type StateValue = Matrix<f64>;
pub type CellActionValue = HashMap<PolicyDirection, f64>;
pub type ActionValue = Matrix<CellActionValue>;

#[derive(Debug)]
pub enum CellType {
    Air,
    Wall,
    End,
}

#[derive(Eq, Hash, PartialEq, Debug)]
pub enum PolicyDirection {
    Up,
    Down,
    Left,
    Right,
}

fn policy_directions() -> Vec<PolicyDirection> {
    vec![
        PolicyDirection::Up,
        PolicyDirection::Down,
        PolicyDirection::Left,
        PolicyDirection::Right,
    ]
}

#[allow(dead_code)]
#[derive(Debug)]
pub struct Cell {
    pub cell_type: CellType,
    policy: PolicyDirection,
    state_value: f64,
    action_value: CellActionValue,
}

fn new_cell_action_value() -> CellActionValue {
    let mut map = HashMap::new();
    for direction in policy_directions() {
        map.insert(direction, 0.0);
    }
    map
}

impl Cell {
    pub fn new(state: CellType) -> Cell {
        Cell {
            cell_type: state,
            policy: PolicyDirection::Up,
            state_value: 0.0,
            action_value: new_cell_action_value(),
        }
    }
}
