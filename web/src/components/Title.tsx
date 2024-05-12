import { Box } from "@mui/material";
import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <Box component="h1" sx={{ color: "primary.main", textAlign: "center" }}>
      {children}
    </Box>
  );
};

export default Title;
