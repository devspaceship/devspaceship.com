use super::models::{Action, State};

pub trait Policy<S, A>
where
    S: State,
    A: Action,
{
    fn get_action(&self, state: &S) -> A;
}
