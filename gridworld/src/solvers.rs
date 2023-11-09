use crate::{
    config::MAX_NUM_STEPS,
    types::{Cell, Grid, Policy},
    utils::{
        choose_random_state, epsilon_greedy, get_grid_size, matrix, max_action_value,
        new_action_value_grid, policy_evaluation, policy_improvement, transition,
    },
};

pub fn policy_value_iteration(
    grid: Grid<Cell>,
    gamma: Option<f64>,
    iter_before_improvement: Option<u32>,
) -> (Grid<f64>, Grid<Policy>) {
    let (n, m) = get_grid_size(&grid);
    let mut is_stable = false;
    let mut state_value_grid = matrix(n, m, 0.0);
    let mut policy_grid = matrix(n, m, Policy::Up);
    while !is_stable {
        state_value_grid = policy_evaluation(
            &grid,
            &policy_grid,
            Some(&state_value_grid),
            gamma,
            iter_before_improvement,
        );
        is_stable = policy_improvement(&mut policy_grid, &grid, &state_value_grid, gamma);
    }
    (state_value_grid, policy_grid)
}

#[allow(dead_code)]
fn sarsa_q_learning(
    grid: Grid<Cell>,
    num_episodes: u32,
    alpha: f64,
    gamma: f64,
    epsilon_0: f64,
    exploration_period: u32,
    q_learning: bool,
) {
    let (n, m) = get_grid_size(&grid);
    let mut t = 0;
    let mut action_value_grid = new_action_value_grid(n, m);
    for _ in 0..num_episodes {
        t += 1;
        let mut step = 0;
        let (mut i, mut j) = choose_random_state(&grid);
        let action_value = &action_value_grid[i][j];
        let mut action = epsilon_greedy(action_value, epsilon_0, t, exploration_period);
        while &grid[i][j] != &Cell::End && step < MAX_NUM_STEPS {
            step += 1;
            let (next_i, next_j, reward) = transition(&grid, i, j, &action);
            let next_action_value = &action_value_grid[next_i][next_j];
            let next_action = epsilon_greedy(next_action_value, epsilon_0, t, exploration_period);
            let q_value = if q_learning {
                max_action_value(&action_value_grid[next_i][next_j])
            } else {
                *action_value_grid[next_i][next_j].get(&next_action).unwrap()
            };
            *action_value_grid[i][j].get_mut(&action).unwrap() += alpha
                * (reward as f64 + gamma * q_value - action_value_grid[i][j].get(&action).unwrap());
            (i, j, action) = (next_i, next_j, next_action);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_utils::{get_optimal_policy, get_test_grid};

    #[test]
    fn test_policy_iteration() {
        let test_grid = get_test_grid();
        let (_state_value_grid, policy_grid) = policy_value_iteration(test_grid, None, None);
        assert!(get_optimal_policy() == policy_grid);
    }

    #[test]
    fn test_value_iteration() {
        let test_grid = get_test_grid();
        let (_state_value_grid, policy_grid) = policy_value_iteration(test_grid, None, Some(5));
        assert!(get_optimal_policy() == policy_grid);
    }
}
