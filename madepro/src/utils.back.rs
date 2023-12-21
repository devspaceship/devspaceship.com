// pub fn action_value_grid_to_policy_grid(action_value_grid: &Grid<ActionValueMap>) -> Grid<Action> {
//     let (n, m) = get_grid_size(&action_value_grid);
//     let mut policy_grid = create_grid(n, m, Action::Up);
//     for i in 0..n {
//         for j in 0..m {
//             policy_grid[i][j] = greedy(&action_value_grid[i][j]);
//         }
//     }
//     policy_grid
// }

// fn greedy(action_value: &ActionValueMap) -> Action {
//     let mut max_reward = f64::NEG_INFINITY;
//     let mut max_policy = Action::Up;
//     for (policy, reward) in action_value.iter() {
//         if *reward > max_reward {
//             max_reward = *reward;
//             max_policy = *policy;
//         }
//     }
//     max_policy
// }

// pub fn epsilon_greedy(
//     action_value: &ActionValueMap,
//     epsilon_0: f64,
//     t: u32,
//     exploration_period: u32,
// ) -> Action {
//     let epsilon = epsilon_0 / (1.0 + (t / exploration_period + 1) as f64);
//     if rand::random::<f64>() < epsilon {
//         Action::get_random()
//     } else {
//         greedy(action_value)
//     }
// }

// pub fn max_action_value(action_value: &ActionValueMap) -> f64 {
//     let mut max_reward = -999.9;
//     for (_, reward) in action_value.iter() {
//         if *reward > max_reward {
//             max_reward = *reward;
//         }
//     }
//     max_reward
// }
