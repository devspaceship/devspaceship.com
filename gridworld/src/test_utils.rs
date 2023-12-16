use crate::{
    models::Policy,
    types::{Cell, Grid},
};

pub fn get_test_grid() -> Grid<Cell> {
    vec![vec![Cell::Air, Cell::Air], vec![Cell::Wall, Cell::End]]
}

pub fn get_optimal_policy() -> Grid<Policy> {
    vec![
        vec![Policy::Right, Policy::Down],
        vec![Policy::Up, Policy::Up],
    ]
}

pub fn get_no_gamma_state_value() -> Grid<f64> {
    vec![vec![-1.0, 100.0], vec![-1.0, 0.0]]
}
