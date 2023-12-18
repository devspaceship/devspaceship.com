pub type DynamicIntoIter<T> = dyn IntoIterator<Item = T, IntoIter = dyn Iterator<Item = T>>;
