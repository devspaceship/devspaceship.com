#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
pub enum GridworldAction {
    Down,
    Left,
    Right,
    Up,
}

#[derive(Debug, PartialEq)]
pub enum Cell {
    Air,
    Wall,
    End,
}

pub type Grid<T> = Vec<Vec<T>>;
