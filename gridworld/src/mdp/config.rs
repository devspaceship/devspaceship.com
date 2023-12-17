use super::defaults::{
    DISCOUNT_RATE, EXPLORATION_PERIOD, INITIAL_EXPLORATION_RATE, LEARNING_RATE, MAX_NUM_STEPS,
    NUM_EPISODES,
};

pub struct Config {
    pub discount_rate: f64,
    pub max_num_steps: u32,
    pub num_episodes: u32,
    pub learning_rate: f64,
    pub initial_exploration_rate: f64,
    pub exploration_period: u32,
}

impl Config {
    pub fn new() -> Self {
        Self {
            discount_rate: DISCOUNT_RATE,
            max_num_steps: MAX_NUM_STEPS,
            num_episodes: NUM_EPISODES,
            learning_rate: LEARNING_RATE,
            initial_exploration_rate: INITIAL_EXPLORATION_RATE,
            exploration_period: EXPLORATION_PERIOD,
        }
    }

    pub fn discount_rate(mut self, discount_rate: f64) -> Self {
        self.discount_rate = discount_rate;
        self
    }

    pub fn max_num_steps(mut self, max_num_steps: u32) -> Self {
        self.max_num_steps = max_num_steps;
        self
    }

    pub fn num_episodes(mut self, num_episodes: u32) -> Self {
        self.num_episodes = num_episodes;
        self
    }

    pub fn learning_rate(mut self, learning_rate: f64) -> Self {
        self.learning_rate = learning_rate;
        self
    }

    pub fn initial_exploration_rate(mut self, initial_exploration_rate: f64) -> Self {
        self.initial_exploration_rate = initial_exploration_rate;
        self
    }

    pub fn exploration_period(mut self, exploration_period: u32) -> Self {
        self.exploration_period = exploration_period;
        self
    }
}
