// // use madepro::models::{Action, State};

// #[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
// pub enum GridworldAction {
//     Down,
//     Left,
//     Right,
//     Up,
// }

// impl Action for GridworldAction {}

// impl GridworldAction {
//     pub fn get_all() -> Vec<GridworldAction> {
//         vec![
//             GridworldAction::Down,
//             GridworldAction::Left,
//             GridworldAction::Right,
//             GridworldAction::Up,
//         ]
//     }
// }

// #[derive(Clone, Copy, PartialEq, Eq, Hash)]
// pub struct GridworldState {
//     i: usize,
//     j: usize,
// }

// impl State for GridworldState {}

// impl GridworldState {
//     pub fn get_all() -> Vec<GridworldState> {
//         vec![
//             GridworldState { i: 0, j: 0 },
//             GridworldState { i: 0, j: 1 },
//             GridworldState { i: 1, j: 0 },
//             GridworldState { i: 1, j: 1 },
//         ]
//     }
// }

// #[derive(Debug, PartialEq)]
// enum Cell {
//     Air,
//     Wall,
//     End,
// }

// // pub fn transition(
// //     cell_grid: &Grid<Cell>,
// //     i: usize,
// //     j: usize,
// //     action: &Action,
// // ) -> (usize, usize, i32) {
// //     let cell = &cell_grid[i][j];

// //     // Edge cases
// //     if (*cell) == Cell::End {
// //         return (i, j, 0);
// //     } else if (*cell) == Cell::Wall {
// //         return (i, j, -1);
// //     }

// //     // Tentative position
// //     let (i_i32, j_i32) = (i as i32, j as i32);
// //     let (i_, j_) = match action {
// //         Action::Up => (i_i32 - 1, j_i32),
// //         Action::Down => (i_i32 + 1, j_i32),
// //         Action::Left => (i_i32, j_i32 - 1),
// //         Action::Right => (i_i32, j_i32 + 1),
// //     };

// //     // Check out of bounds
// //     let (n, m) = get_grid_size(&cell_grid);
// //     let (n, m) = (n as i32, m as i32);
// //     if i_ < 0 || i_ >= n || j_ < 0 || j_ >= m {
// //         return (i, j, -1);
// //     }

// //     // Result
// //     let (i_, j_) = (i_ as usize, j_ as usize);
// //     let cell_ = &cell_grid[i_][j_];
// //     match cell_ {
// //         Cell::End => (i_, j_, 100),
// //         Cell::Wall => (i, j, -1),
// //         Cell::Air => (i_, j_, -1),
// //     }
// // }

// // use crate::types::{Cell, Grid};

// // use super::models::GridworldAction;

// // pub fn get_test_grid() -> Grid<Cell> {
// //     vec![vec![Cell::Air, Cell::Air], vec![Cell::Wall, Cell::End]]
// // }

// // pub fn get_optimal_policy() -> Grid<GridworldAction> {
// //     vec![
// //         vec![Action::Right, Action::Down],
// //         vec![Action::Up, Action::Up],
// //     ]
// // }

// // pub fn is_policy_optimal(policy: &Grid<Action>) -> bool {
// //     policy[0][0] == Action::Right && policy[0][1] == Action::Down
// // }

// // pub fn get_no_gamma_state_value() -> Grid<f64> {
// //     vec![vec![-1.0, 100.0], vec![-1.0, 0.0]]
// // }
