import math
from pathlib import Path

import pandas as pd
import scipy.constants

PARENT_DIR = Path(__file__).parent.parent
DATA_DIR = PARENT_DIR / "scripts" / "data"
STATIC_DIR = PARENT_DIR / "public" / "static" / "posts" / "elevator"

# MOTION COMPUTATION
T = 12_000
DT = 0.8
SUBSAMPLE_FREQUENCY = 20


def load_raw_df() -> pd.DataFrame:
    """Loads the raw density data"""
    raw_df: pd.DataFrame = pd.read_csv(DATA_DIR / "PREM500.csv")
    raw_df = raw_df[["radius(m)", "density(kg/m^3)"]]
    return raw_df.drop_duplicates(ignore_index=True)


def integrate_mass(raw_df: pd.DataFrame) -> list[float]:
    """Computes the mass of consecutive spheres given the density"""
    n = raw_df.shape[0]
    mass = [0.0]
    for i in range(n - 1):
        r_0, rho_0 = raw_df.iloc[i]
        r_1, rho_1 = raw_df.iloc[i + 1]

        dr = r_1 - r_0
        r_2_avg = (r_1**3 - r_0**3) / (3 * dr) if dr > 0 else 0
        rho = (rho_0 + rho_1) / 2

        mass.append(mass[-1] + 4 * math.pi * r_2_avg * rho * dr)
    return mass


def get_acceleration(radius: float, df: pd.DataFrame) -> float:
    """Gives the gravitational field for a certain radius"""
    g = (
        df["gravity"].iloc[-1]
        if abs(radius) > df["radius"].iloc[-1]
        else df[df["radius"] >= abs(radius)].iloc[0]["gravity"]
    )
    return -g if radius > 0 else g


def integrate_motion(df: pd.DataFrame) -> pd.DataFrame:
    """Computes the motion given the gravitational field"""
    time = [0.0]  # (s)
    radius = [df["radius"].iloc[-1]]  # (km)
    speed = [0.0]  # (km/s)
    acceleration = [get_acceleration(radius[0], df)]  # (m/(s^2))

    for _ in range(T):
        time.append(time[-1] + DT)
        speed.append(speed[-1] + acceleration[-1] / 1e3 * DT)
        radius.append(radius[-1] + (speed[-2] + speed[-1]) / 2 * DT)
        acceleration.append(get_acceleration(radius[-1], df))

    motion = pd.DataFrame()
    motion["time"] = time
    motion["radius"] = radius
    motion["speed"] = speed
    motion["acceleration"] = acceleration
    return motion


def main():
    raw_df = load_raw_df()

    df = pd.DataFrame()
    df["radius"] = raw_df["radius(m)"] / 1e3
    df["density"] = raw_df["density(kg/m^3)"] / 1e3
    df["mass"] = integrate_mass(raw_df)
    df["gravity"] = scipy.constants.G * df["mass"] / (raw_df["radius(m)"] ** 2)
    df["gravity"].fillna(0, inplace=True)
    motion = integrate_motion(df)
    motion = motion[::SUBSAMPLE_FREQUENCY]

    df.to_csv(STATIC_DIR / "density.csv", index=False)
    motion.to_csv(STATIC_DIR / "motion.csv", index=False)


if __name__ == "__main__":
    main()
