use std::collections::HashMap;

use crate::types::{ActionValue, Cell, CellGrid, Grid, Policy, PolicyGrid, StateValueGrid};

pub fn policy_directions() -> Vec<Policy> {
    vec![Policy::Up, Policy::Down, Policy::Left, Policy::Right]
}

pub fn new_action_value() -> ActionValue {
    let mut map = HashMap::new();
    for direction in policy_directions() {
        map.insert(direction, 0.0);
    }
    map
}

/// Takes n, m and value and returns a matrix of n rows and m columns filled with value
pub fn matrix<T: Clone>(n: usize, m: usize, value: T) -> Grid<T> {
    vec![vec![value; m]; n]
}

/// Returns the next state and reward given the current state and action
pub fn transition(grid: &Grid<Cell>, i: usize, j: usize, action: &Policy) -> (usize, usize, i32) {
    let cell = &grid[i][j];
    let (i, j) = (i as i32, j as i32);
    let (i_, j_) = match action {
        Policy::Up => (i - 1, j),
        Policy::Down => (i + 1, j),
        Policy::Left => (i, j - 1),
        Policy::Right => (i, j + 1),
    };
    let (i, j) = (i as usize, j as usize);
    let grid_len = grid.len().try_into().unwrap();
    if i_ < 0 || i_ >= grid_len || j_ < 0 || j_ >= grid_len {
        return (i, j, -1);
    }
    let (i_, j_) = (i_ as usize, j_ as usize);
    let cell_ = &grid[i_][j_];
    match cell {
        Cell::End => (i, j, 0),
        Cell::Wall => (i, j, -1),
        Cell::Air => match cell_ {
            Cell::End => (i_, j_, 100),
            Cell::Wall => (i, j, -1),
            Cell::Air => (i_, j_, -1),
        },
    }
}

/// Evaluates the policy for a given state and returns the state value
pub fn policy_evaluation(
    grid: &CellGrid,
    policy: &PolicyGrid,
    state_value: Option<&StateValueGrid>,
    gamma: Option<f64>,
) -> StateValueGrid {
    let mut state_value = match state_value {
        Some(state_value) => state_value.clone(),
        None => matrix(grid.len(), grid[0].len(), 0.0),
    };
    let gamma = gamma.unwrap_or(0.97);
    loop {
        let mut delta: f64 = 0.0;
        for i in 0..grid.len() {
            for j in 0..grid[i].len() {
                let (i_, j_, reward) = transition(&grid, i, j, &policy[i][j]);
                let new_state_value = reward as f64 + gamma * state_value[i_][j_];
                delta = delta.max((new_state_value - state_value[i][j]).abs());
                state_value[i][j] = new_state_value;
            }
        }
        if delta < 1e-5 {
            break;
        }
    }
    state_value
}

/// Returns the policy that maximizes the discounted reward for a given state value
pub fn policy_improvement(
    grid: &CellGrid,
    state_value: &StateValueGrid,
    gamma: Option<f64>,
) -> PolicyGrid{
    let gamma = gamma.unwrap_or(0.97);
    let mut policy = matrix(grid.len(), grid[0].len(), Policy::Up);
    for i in 0..grid.len() {
        for j in 0..grid[i].len() {
            let mut max_reward = -1.0;
            let mut max_policy = Policy::Up;
            for cell_policy in policy_directions() {
                let (i_, j_, reward) = transition(&grid, i, j, &cell_policy);
                let new_reward = reward as f64 + gamma * state_value[i_][j_];
                if new_reward > max_reward {
                    max_reward = new_reward;
                    max_policy = cell_policy;
                }
            }
            policy[i][j] = max_policy;
        }
    }
    policy
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_matrix() {
        let mut m = matrix(2, 3, 0);
        m[0][0] = 1;
        assert_eq!(m, vec![vec![1, 0, 0], vec![0, 0, 0]]);
    }

    fn get_test_grid() -> Grid<Cell> {
        vec![vec![Cell::Air, Cell::Air], vec![Cell::Wall, Cell::End]]
    }

    fn get_optimal_policy() -> PolicyGrid {
        vec![vec![Policy::Right, Policy::Down], vec![Policy::Right, Policy::Right]]
    }

    #[test]
    fn test_transition_to_boundaries() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, &Policy::Left), (0, 0, -1));
        assert_eq!(transition(&grid, 0, 0, &Policy::Up), (0, 0, -1));
        assert_eq!(transition(&grid, 0, 1, &Policy::Right), (0, 1, -1));
    }

    #[test]
    fn test_transition_to_air() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, &Policy::Right), (0, 1, -1));
    }

    #[test]
    fn test_transition_to_wall() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, &Policy::Down), (0, 0, -1));
    }

    #[test]
    fn test_transition_to_end() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 1, &Policy::Down), (1, 1, 100));
    }

    #[test]
    fn test_transition_to_end_from_end() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 1, 1, &Policy::Up), (1, 1, 0));
    }

    #[test]
    fn test_policy_evaluation_and_improvement() {
        let grid = get_test_grid();
        let policy = get_optimal_policy();
        let state_value = policy_evaluation(&grid, &policy, None, None);
        let policy = policy_improvement(&grid, &state_value, None);
        assert_eq!(policy[0][0], Policy::Right);
        assert_eq!(policy[0][1], Policy::Down);
    }
}
