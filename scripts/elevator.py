from pathlib import Path

import pandas as pd

PARENT_DIR = Path(__file__).parent.parent
DATA_DIR = PARENT_DIR / "scripts" / "data"
STATIC_DIR = PARENT_DIR / "public" / "static" / "posts" / "elevator"


def main():
    raw_df = pd.read_csv(DATA_DIR / "PREM500.csv")
    raw_df = raw_df[["radius(m)", "density(kg/m^3)"]]
    raw_df.drop_duplicates(inplace=True, ignore_index=True)

    df = pd.DataFrame()
    df["radius"] = raw_df["radius(m)"] / 1e3
    df["density"] = raw_df["density(kg/m^3)"] / 1e3

    n = df.shape[0]
    mass = [0]
    for i in range(n - 1):
        r_0, rho_0 = raw_df.iloc[i]
        r_1, rho_1 = raw_df.iloc[i + 1]

        dr = r_1 - r_0
        r_2_avg = (r_1**3 - r_0**3) / (3 * dr) if dr > 0 else 0
        rho = (rho_0 + rho_1) / 2

        mass.append(mass[-1] + r_2_avg * rho * dr)
    df["mass"] = mass

    df.to_csv(STATIC_DIR / "density.csv", index=False)


if __name__ == "__main__":
    main()
