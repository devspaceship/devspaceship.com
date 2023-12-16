use rand::Rng;

use crate::{
    config::DEFAULT_GAMMA,
    models::{Action, ActionValueMap},
    types::{Cell, Grid},
};

pub fn new_action_value_grid(n: usize, m: usize) -> Grid<ActionValueMap> {
    let mut grid = create_grid(n, m, ActionValueMap::new());
    for i in 0..n {
        for j in 0..m {
            grid[i][j] = ActionValueMap::new();
        }
    }
    grid
}

pub fn action_value_grid_to_policy_grid(action_value_grid: &Grid<ActionValueMap>) -> Grid<Action> {
    let (n, m) = get_grid_size(&action_value_grid);
    let mut policy_grid = create_grid(n, m, Action::Up);
    for i in 0..n {
        for j in 0..m {
            policy_grid[i][j] = greedy(&action_value_grid[i][j]);
        }
    }
    policy_grid
}

/// Takes n, m and value
/// Returns a grid of n rows and m columns filled with value
pub fn create_grid<T: Clone>(n: usize, m: usize, value: T) -> Grid<T> {
    vec![vec![value; m]; n]
}

/// Returns the next state and reward given the current state and action
pub fn transition(
    cell_grid: &Grid<Cell>,
    i: usize,
    j: usize,
    action: &Action,
) -> (usize, usize, i32) {
    let cell = &cell_grid[i][j];

    // Edge cases
    if (*cell) == Cell::End {
        return (i, j, 0);
    } else if (*cell) == Cell::Wall {
        return (i, j, -1);
    }

    // Tentative position
    let (i_i32, j_i32) = (i as i32, j as i32);
    let (i_, j_) = match action {
        Action::Up => (i_i32 - 1, j_i32),
        Action::Down => (i_i32 + 1, j_i32),
        Action::Left => (i_i32, j_i32 - 1),
        Action::Right => (i_i32, j_i32 + 1),
    };

    // Check out of bounds
    let (n, m) = get_grid_size(&cell_grid);
    let (n, m) = (n as i32, m as i32);
    if i_ < 0 || i_ >= n || j_ < 0 || j_ >= m {
        return (i, j, -1);
    }

    // Result
    let (i_, j_) = (i_ as usize, j_ as usize);
    let cell_ = &cell_grid[i_][j_];
    match cell_ {
        Cell::End => (i_, j_, 100),
        Cell::Wall => (i, j, -1),
        Cell::Air => (i_, j_, -1),
    }
}

/// Evaluates the policy for a given state and optional initial state value grid
/// Returns a new state value grid
pub fn policy_evaluation(
    cell_grid: &Grid<Cell>,
    policy_grid: &Grid<Action>,
    gamma: Option<f64>,
    iter_before_improvement: Option<u32>,
    state_value_grid: Option<&Grid<f64>>,
) -> Grid<f64> {
    let (n, m) = get_grid_size(&cell_grid);
    let mut state_value = match state_value_grid {
        Some(state_value) => state_value.clone(),
        None => create_grid(n, m, 0.0),
    };
    let gamma = gamma.unwrap_or(DEFAULT_GAMMA);
    let early_stop = match iter_before_improvement {
        Some(_) => true,
        None => false,
    };

    let mut iteration = 0;
    loop {
        iteration += 1;
        let mut delta: f64 = 0.0;
        for i in 0..n {
            for j in 0..m {
                let (i_, j_, reward) = transition(&cell_grid, i, j, &policy_grid[i][j]);
                let new_state_value = reward as f64 + gamma * state_value[i_][j_];
                delta = delta.max((new_state_value - state_value[i][j]).abs());
                state_value[i][j] = new_state_value;
            }
        }
        if delta < 1e-5 || (early_stop && iteration == iter_before_improvement.unwrap()) {
            break;
        }
    }
    state_value
}

/// Improves the policy in place for a given state value grid
/// Returns a boolean to see if policy is stable
pub fn policy_improvement(
    policy: &mut Grid<Action>,
    cell_grid: &Grid<Cell>,
    state_value_grid: &Grid<f64>,
    gamma: Option<f64>,
) -> bool {
    let (n, m) = get_grid_size(state_value_grid);
    let gamma = gamma.unwrap_or(DEFAULT_GAMMA);

    let mut is_stable = true;
    for i in 0..n {
        for j in 0..m {
            let mut max_reward = -1.0;
            let mut max_cell_policy = Action::Up;
            for cell_policy in Action::get_all() {
                let (i_, j_, r) = transition(&cell_grid, i, j, &cell_policy);
                let reward = r as f64 + gamma * state_value_grid[i_][j_];
                if reward > max_reward {
                    max_reward = reward;
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
    let mut valid_states = vec![];
    let (n, m) = get_grid_size(&grid);
    for i in 0..n {
        for j in 0..m {
            if grid[i][j] == Cell::Air {
                valid_states.push((i, j));
            }
        }
    }

    if valid_states.len() == 0 {
        panic!("No valid states found");
    }

    let mut rng = rand::thread_rng();
    let random_index = rng.gen_range(0..valid_states.len());
    valid_states[random_index]
}

fn greedy(action_value: &ActionValueMap) -> Action {
    let mut max_reward = f64::NEG_INFINITY;
    let mut max_policy = Action::Up;
    for (policy, reward) in action_value.iter() {
        if *reward > max_reward {
            max_reward = *reward;
            max_policy = *policy;
        }
    }
    max_policy
}

pub fn epsilon_greedy(
    action_value: &ActionValueMap,
    epsilon_0: f64,
    t: u32,
    exploration_period: u32,
) -> Action {
    let epsilon = epsilon_0 / (1.0 + (t / exploration_period + 1) as f64);
    if rand::random::<f64>() < epsilon {
        Action::get_random()
    } else {
        greedy(action_value)
    }
}

pub fn get_grid_size<T>(grid: &Grid<T>) -> (usize, usize) {
    (grid.len(), grid[0].len())
}

pub fn max_action_value(action_value: &ActionValueMap) -> f64 {
    let mut max_reward = -999.9;
    for (_, reward) in action_value.iter() {
        if *reward > max_reward {
            max_reward = *reward;
        }
    }
    max_reward
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_utils::{
        get_no_gamma_state_value, get_optimal_policy, get_test_grid, is_policy_optimal,
    };

    #[test]
    fn test_matrix() {
        let mut m = create_grid(2, 3, 0);
        m[0][0] = 1;
        assert_eq!(m, vec![vec![1, 0, 0], vec![0, 0, 0]]);
    }

    #[test]
    fn test_transition_to_boundaries() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, &Action::Left), (0, 0, -1));
        assert_eq!(transition(&grid, 0, 0, &Action::Up), (0, 0, -1));
        assert_eq!(transition(&grid, 0, 1, &Action::Right), (0, 1, -1));
    }

    #[test]
    fn test_transition_to_air() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, &Action::Right), (0, 1, -1));
    }

    #[test]
    fn test_transition_to_wall() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, &Action::Down), (0, 0, -1));
    }

    #[test]
    fn test_transition_to_end() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 1, &Action::Down), (1, 1, 100));
    }

    #[test]
    fn test_transition_to_end_from_end() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 1, 1, &Action::Up), (1, 1, 0));
    }

    #[test]
    fn test_policy_evaluation() {
        let grid = get_test_grid();
        let policy = get_optimal_policy();
        let state_value = policy_evaluation(&grid, &policy, Some(0.0), None, None);
        assert_eq!(state_value, get_no_gamma_state_value());
    }

    #[test]
    fn test_policy_improvement() {
        let grid = get_test_grid();
        let state_value = get_no_gamma_state_value();
        let mut policy = get_optimal_policy();
        policy_improvement(&mut policy, &grid, &state_value, None);
        assert!(is_policy_optimal(&policy));
        let is_stable = policy_improvement(&mut policy, &grid, &state_value, None);
        assert!(is_stable);
    }

    #[test]
    fn test_choose_random_state() {
        let grid = get_test_grid();
        let (i, j) = choose_random_state(&grid);
        assert!(grid[i][j] == Cell::Air);
    }
}
