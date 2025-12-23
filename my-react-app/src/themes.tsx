import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a11818",
    },
    secondary: {
      main: "#270f0f",
    },
    background: {
      default: "#0f0f1a",
      paper: "rgba(255,255,255,0.04)",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
});

export default theme;
