use std::vec;

use madepro::models::{Action, Model, State, MDP};

#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub enum GridworldAction {
    Down,
    Left,
    Right,
    Up,
}

impl Model for GridworldAction {
    type IntoIter = vec::IntoIter<Self>;

    fn get_all() -> Self::IntoIter {
        vec![Self::Down, Self::Left, Self::Right, Self::Up].into_iter()
    }
}

impl Action for GridworldAction {}

#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub struct GridworldState {
    i: usize,
    j: usize,
}

impl GridworldState {
    pub fn new(i: usize, j: usize) -> Self {
        Self { i, j }
    }
}

impl Model for GridworldState {
    type IntoIter = vec::IntoIter<Self>;

    fn get_all() -> Self::IntoIter {
        vec![
            Self::new(0, 0),
            Self::new(0, 1),
            Self::new(1, 0),
            Self::new(1, 1),
        ]
        .into_iter()
    }
}

impl State for GridworldState {}

#[derive(Debug, PartialEq)]
enum Cell {
    Air,
    Wall,
    End,
}

pub struct Gridworld {
    cell_grid: Vec<Vec<Cell>>,
}

impl Gridworld {
    fn get_grid_size(&self) -> (usize, usize) {
        (self.cell_grid.len(), self.cell_grid[0].len())
    }
}

impl MDP for Gridworld {
    type State = GridworldState;
    type Action = GridworldAction;

    fn is_state_terminal(&self, state: &Self::State) -> bool {
        let cell = &self.cell_grid[state.i][state.j];
        *cell == Cell::End
    }

    fn transition(&self, state: &Self::State, action: &Self::Action) -> (Self::State, f64) {
        let cell = &self.cell_grid[state.i][state.j];

        // Edge cases
        // In theory the Cell::Wall case should never happen
        if (*cell) == Cell::End || (*cell) == Cell::Wall {
            return (*state, 0.0);
        }

        // Tentative position
        let (i, j) = (state.i as i32, state.j as i32);
        let (i_, j_) = match action {
            Self::Action::Up => (i - 1, j),
            Self::Action::Down => (i + 1, j),
            Self::Action::Left => (i, j - 1),
            Self::Action::Right => (i, j + 1),
        };

        // Check out of bounds
        let (n, m) = self.get_grid_size();
        let (n, m) = (n as i32, m as i32);
        if i_ < 0 || i_ >= n || j_ < 0 || j_ >= m {
            return (*state, -1.0);
        }

        // Result
        let (i_, j_) = (i_ as usize, j_ as usize);
        let cell_ = &self.cell_grid[i_][j_];
        match cell_ {
            Cell::Air => (Self::State::new(i_, j_), -1.0),
            Cell::Wall => (*state, -1.0),
            Cell::End => (Self::State::new(i_, j_), 100.0),
        }
    }
}

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
