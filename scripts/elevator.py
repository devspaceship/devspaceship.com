from pathlib import Path

import pandas as pd

PARENT_DIR = Path(__file__).parent.parent
DATA_DIR = PARENT_DIR / "scripts" / "data"
STATIC_DIR = PARENT_DIR / "public" / "static" / "posts" / "elevator"


def main():
    raw_df = pd.read_csv(DATA_DIR / "PREM500.csv")
    df = pd.DataFrame()
    df["radius"] = raw_df["radius(m)"]
    df["density"] = raw_df["density(kg/m^3)"] / 1e3
    df.to_csv(STATIC_DIR / "density.csv", index=False)


if __name__ == "__main__":
    main()
