use std::collections::HashMap;

use rand::{seq::SliceRandom, Rng};

use crate::types::{ActionValue, Cell, Grid, Policy};

pub fn get_policy_directions() -> Vec<Policy> {
    vec![Policy::Up, Policy::Down, Policy::Left, Policy::Right]
}

pub fn new_action_value() -> ActionValue {
    let mut map = HashMap::new();
    for direction in get_policy_directions() {
        map.insert(direction, 0.0);
    }
    map
}

pub fn new_action_value_grid(n: usize, m: usize) -> Grid<ActionValue> {
    let mut grid = matrix(n, m, new_action_value());
    for i in 0..n {
        for j in 0..m {
            grid[i][j] = new_action_value();
        }
    }
    grid
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
    grid: &Grid<Cell>,
    policy: &Grid<Policy>,
    state_value: Option<&Grid<f64>>,
    gamma: Option<f64>,
    iter_before_improvement: Option<u32>,
) -> Grid<f64> {
    let mut state_value = match state_value {
        Some(state_value) => state_value.clone(),
        None => matrix(grid.len(), grid[0].len(), 0.0),
    };
    let gamma = gamma.unwrap_or(0.97);
    let early_stop = match iter_before_improvement {
        Some(_) => true,
        None => false,
    };
    let mut iter = 0;
    loop {
        iter += 1;
        let mut delta: f64 = 0.0;
        for i in 0..grid.len() {
            for j in 0..grid[i].len() {
                let (i_, j_, reward) = transition(&grid, i, j, &policy[i][j]);
                let new_state_value = reward as f64 + gamma * state_value[i_][j_];
                delta = delta.max((new_state_value - state_value[i][j]).abs());
                state_value[i][j] = new_state_value;
            }
        }
        if delta < 1e-5 || (early_stop && iter == iter_before_improvement.unwrap()) {
            break;
        }
    }
    state_value
}

/// Improves the policy for a given state value and returns a boolean to see if policy is stable
pub fn policy_improvement(
    policy: &mut Grid<Policy>,
    grid: &Grid<Cell>,
    state_value: &Grid<f64>,
    gamma: Option<f64>,
) -> bool {
    let gamma = gamma.unwrap_or(0.97);
    let mut is_stable = true;
    // let mut policy = matrix(grid.len(), grid[0].len(), Policy::Up);
    for i in 0..grid.len() {
        for j in 0..grid[i].len() {
            let mut max_reward = -1.0;
            let mut max_cell_policy = Policy::Up;
            for cell_policy in get_policy_directions() {
                let (i_, j_, reward) = transition(&grid, i, j, &cell_policy);
                let new_reward = reward as f64 + gamma * state_value[i_][j_];
                if new_reward > max_reward {
                    max_reward = new_reward;
                    max_cell_policy = cell_policy;
                }
            }
            if (*policy)[i][j] != max_cell_policy {
                is_stable = false;
            }
            (*policy)[i][j] = max_cell_policy;
        }
    }
    is_stable
}

pub fn choose_random_state(grid: &Grid<Cell>) -> (usize, usize) {
    let mut rng = rand::thread_rng();
    let (n, m) = get_grid_size(&grid);
    let mut i = rng.gen_range(0..n);
    let mut j = rng.gen_range(0..m);
    while grid[i][j] == Cell::Wall || grid[i][j] == Cell::End {
        i = rng.gen_range(0..n);
        j = rng.gen_range(0..m);
    }
    (i, j)
}

fn choose_random_action() -> Policy {
    let mut rng = rand::thread_rng();
    let mut actions = get_policy_directions();
    actions.shuffle(&mut rng);
    actions[0]
}

fn greedy(action_value: &ActionValue) -> Policy {
    let mut max_reward = -999.9;
    let mut max_policy = Policy::Up;
    for (policy, reward) in action_value {
        if *reward > max_reward {
            max_reward = *reward;
            max_policy = *policy;
        }
    }
    max_policy
}

pub fn epsilon_greedy(
    action_value: &ActionValue,
    epsilon_0: f64,
    t: u32,
    exploration_period: u32,
) -> Policy {
    let mut rng = rand::thread_rng();
    let epsilon = epsilon_0 / (1.0 + (t / exploration_period) as f64);
    if rng.gen::<f64>() < epsilon {
        choose_random_action()
    } else {
        greedy(action_value)
    }
}

pub fn get_grid_size(grid: &Grid<Cell>) -> (usize, usize) {
    (grid.len(), grid[0].len())
}

pub fn max_action_value(action_value: &ActionValue) -> f64 {
    let mut max_reward = -999.9;
    for (_, reward) in action_value {
        if *reward > max_reward {
            max_reward = *reward;
        }
    }
    max_reward
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_utils::{get_no_gamma_state_value, get_optimal_policy, get_test_grid};

    #[test]
    fn test_matrix() {
        let mut m = matrix(2, 3, 0);
        m[0][0] = 1;
        assert_eq!(m, vec![vec![1, 0, 0], vec![0, 0, 0]]);
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
    fn test_policy_evaluation() {
        let grid = get_test_grid();
        let policy = get_optimal_policy();
        let state_value = policy_evaluation(&grid, &policy, None, Some(0.0), None);
        assert_eq!(state_value, get_no_gamma_state_value());
    }

    #[test]
    fn test_policy_improvement() {
        let grid = get_test_grid();
        let state_value = get_no_gamma_state_value();
        let mut policy = get_optimal_policy();
        let is_stable = policy_improvement(&mut policy, &grid, &state_value, None);
        assert_eq!(is_stable, true);
    }

    #[test]
    fn test_choose_random_state() {
        let grid = get_test_grid();
        let (i, j) = choose_random_state(&grid);
        assert!(grid[i][j] == Cell::Air);
    }
}
