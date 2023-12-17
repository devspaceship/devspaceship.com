use super::{Environment, Policy};

/// Evaluates the policy for a given environment and optional initial state value grid
/// Returns a new state value grid

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
