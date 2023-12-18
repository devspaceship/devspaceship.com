// / Evaluates the policy for a given environment and optional initial state value grid
// / Returns a new state value grid
// pub fn policy_evaluation(
//     cell_grid: &Grid<Cell>,
//     policy_grid: &Grid<Action>,
//     gamma: Option<f64>,
//     iter_before_improvement: Option<u32>,
//     state_value_grid: Option<&Grid<f64>>,
// ) -> Grid<f64> {
//     let (n, m) = get_grid_size(&cell_grid);
//     let mut state_value = match state_value_grid {
//         Some(state_value) => state_value.clone(),
//         None => create_grid(n, m, 0.0),
//     };
//     let gamma = gamma.unwrap_or(DEFAULT_GAMMA);
//     let early_stop = match iter_before_improvement {
//         Some(_) => true,
//         None => false,
//     };

//     let mut iteration = 0;
//     loop {
//         iteration += 1;
//         let mut delta: f64 = 0.0;
//         for i in 0..n {
//             for j in 0..m {
//                 let (i_, j_, reward) = transition(&cell_grid, i, j, &policy_grid[i][j]);
//                 let new_state_value = reward as f64 + gamma * state_value[i_][j_];
//                 delta = delta.max((new_state_value - state_value[i][j]).abs());
//                 state_value[i][j] = new_state_value;
//             }
//         }
//         if delta < 1e-5 || (early_stop && iteration == iter_before_improvement.unwrap()) {
//             break;
//         }
//     }
//     state_value
// }

// use crate::{
//     models::Action,
//     types::{Cell, Grid},
//     // utils::{create_grid, get_grid_size, policy_evaluation, policy_improvement},
// };

// pub fn policy_value_iteration(
//     cell_grid: Grid<Cell>,
//     gamma: Option<f64>,
//     iter_before_improvement: Option<u32>,
// ) -> (Grid<f64>, Grid<Action>) {
//     let (n, m) = get_grid_size(&cell_grid);
//     let mut is_stable = false;
//     let mut state_value_grid = create_grid(n, m, 0.0);
//     let mut policy_grid = create_grid(n, m, Action::Up);
//     while !is_stable {
//         state_value_grid = policy_evaluation(
//             &cell_grid,
//             &policy_grid,
//             gamma,
//             iter_before_improvement,
//             Some(&state_value_grid),
//         );
//         is_stable = policy_improvement(&mut policy_grid, &cell_grid, &state_value_grid, gamma);
//     }
//     (state_value_grid, policy_grid)
// }

// pub fn sarsa_q_learning(
//     cell_grid: Grid<Cell>,
//     q_learning: bool,
//     num_episodes: Option<u32>,
//     alpha: Option<f64>,
//     gamma: Option<f64>,
//     epsilon_0: Option<f64>,
//     exploration_period: Option<u32>,
// ) -> Grid<ActionValueMap> {
//     // Default values
//     let num_episodes = num_episodes.unwrap_or(DEFAULT_NUM_EPISODES);
//     let alpha = alpha.unwrap_or(DEFAULT_ALPHA);
//     let gamma = gamma.unwrap_or(DEFAULT_GAMMA);
//     let epsilon_0 = epsilon_0.unwrap_or(DEFAULT_EPSILON_0);
//     let exploration_period = exploration_period.unwrap_or(DEFAULT_EXPLORATION_PERIOD);

//     let (n, m) = get_grid_size(&cell_grid);
//     let mut action_value_grid = new_action_value_grid(n, m);

//     for episode in 0..num_episodes {
//         let (mut i, mut j) = choose_random_state(&cell_grid);
//         let action_value = &action_value_grid[i][j];
//         let mut action = epsilon_greedy(action_value, epsilon_0, episode, exploration_period);
//         let mut step = 0;

//         while &cell_grid[i][j] != &Cell::End && step < MAX_NUM_STEPS {
//             step += 1;
//             let (i_, j_, reward) = transition(&cell_grid, i, j, &action);
//             let next_action_value = &action_value_grid[i_][j_];
//             let next_action =
//                 epsilon_greedy(next_action_value, epsilon_0, episode, exploration_period);
//             let q_value = if q_learning {
//                 max_action_value(&action_value_grid[i_][j_])
//             } else {
//                 action_value_grid[i_][j_].get(&next_action)
//             };
//             let action_value = action_value_grid[i][j].get_mut(&action);
//             *action_value += alpha * (reward as f64 + gamma * q_value - *action_value);
//             (i, j, action) = (i_, j_, next_action);
//         }
//     }

//     action_value_grid
// }

// #[cfg(test)]
// mod tests {
// use super::*;
// use crate::{
//     test_utils::{get_test_grid, is_policy_optimal},
//     utils::action_value_grid_to_policy_grid,
// };

// #[test]
// fn test_policy_iteration() {
//     let test_grid = get_test_grid();
//     let (_state_value_grid, policy_grid) = policy_value_iteration(test_grid, None, None);
//     assert!(is_policy_optimal(&policy_grid));
// }

// #[test]
// fn test_value_iteration() {
//     let test_grid = get_test_grid();
//     let (_state_value_grid, policy_grid) = policy_value_iteration(test_grid, None, Some(5));
//     assert!(is_policy_optimal(&policy_grid));
// }

// #[test]
// fn test_sarsa() {
//     let test_grid = get_test_grid();
//     let action_value_grid = sarsa_q_learning(test_grid, false, None, None, None, None, None);
//     let policy_grid = action_value_grid_to_policy_grid(&action_value_grid);
//     assert_eq!(policy_grid[0][0], Action::Right);
//     assert_eq!(policy_grid[0][1], Action::Down);
// }

// #[test]
// fn test_q_learning() {
//     let test_grid = get_test_grid();
//     let action_value_grid = sarsa_q_learning(test_grid, true, None, None, None, None, None);
//     let policy_grid = action_value_grid_to_policy_grid(&action_value_grid);
//     assert_eq!(policy_grid[0][0], Action::Right);
//     assert_eq!(policy_grid[0][1], Action::Down);
// }
// }
