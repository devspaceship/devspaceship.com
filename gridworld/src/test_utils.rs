use crate::{
    models::GridworldAction as Action,
    types::{Cell, Grid},
};

pub fn get_test_grid() -> Grid<Cell> {
    vec![vec![Cell::Air, Cell::Air], vec![Cell::Wall, Cell::End]]
}

pub fn get_optimal_policy() -> Grid<Action> {
    vec![
        vec![Action::Right, Action::Down],
        vec![Action::Up, Action::Up],
    ]
}

pub fn is_policy_optimal(policy: &Grid<Action>) -> bool {
    policy[0][0] == Action::Right && policy[0][1] == Action::Down
}

pub fn get_no_gamma_state_value() -> Grid<f64> {
    vec![vec![-1.0, 100.0], vec![-1.0, 0.0]]
}
