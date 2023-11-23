use crate::{
    config::MAX_NUM_STEPS,
    types::{Cell, Grid, Policy},
    utils::{
        choose_random_state, epsilon_greedy, get_grid_size, matrix, max_action_value,
        new_action_value_grid, policy_evaluation, policy_improvement, transition,
    },
};

pub fn policy_value_iteration(
    cell_grid: Grid<Cell>,
    gamma: Option<f64>,
    iter_before_improvement: Option<u32>,
) -> (Grid<f64>, Grid<Policy>) {
    let (n, m) = get_grid_size(&cell_grid);
    let mut is_stable = false;
    let mut state_value_grid = matrix(n, m, 0.0);
    let mut policy_grid = matrix(n, m, Policy::Up);
    while !is_stable {
        state_value_grid = policy_evaluation(
            &cell_grid,
            &policy_grid,
            gamma,
            iter_before_improvement,
            Some(&state_value_grid),
        );
        is_stable = policy_improvement(&mut policy_grid, &cell_grid, &state_value_grid, gamma);
    }
    (state_value_grid, policy_grid)
}

// TODO optional num_episodes alhpa gamma epsilon exploration period
// TODO test this and remove dead code line
// #[allow(dead_code)]
fn sarsa_q_learning(
    cell_grid: Grid<Cell>,
    num_episodes: u32,
    alpha: f64,
    gamma: f64,
    epsilon_0: f64,
    exploration_period: u32,
    q_learning: bool,
) {
    let (n, m) = get_grid_size(&cell_grid);
    let mut action_value_grid = new_action_value_grid(n, m);
    for episode in 1..=num_episodes {
        let mut step = 0;
        let (mut i, mut j) = choose_random_state(&cell_grid);
        let action_value = &action_value_grid[i][j];
        let mut action = epsilon_greedy(action_value, epsilon_0, episode, exploration_period);
        while &cell_grid[i][j] != &Cell::End && step < MAX_NUM_STEPS {
            step += 1;
            let (i_, j_, reward) = transition(&cell_grid, i, j, &action);
            let next_action_value = &action_value_grid[i_][j_];
            let next_action =
                epsilon_greedy(next_action_value, epsilon_0, episode, exploration_period);
            let q_value = if q_learning {
                max_action_value(&action_value_grid[i_][j_])
            } else {
                *action_value_grid[i_][j_].get(&next_action).unwrap()
            };
            *action_value_grid[i][j].get_mut(&action).unwrap() += alpha
                * (reward as f64 + gamma * q_value - action_value_grid[i][j].get(&action).unwrap());
            (i, j, action) = (i_, j_, next_action);
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
