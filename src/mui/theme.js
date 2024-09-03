import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    type: "light",
    primary: {
      main: "#25432C",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        "&:-webkit-autofill": {
          transitionDelay: "9999s",
          transitionProperty: "background-color, color",
        },
      },
    },
  },
  typography: {
    fontFamily: ["SourceSansPro Regular", "sans-serif"].join(","),
    button: {
      // textTransform: "none",
    },
  },
  //   component: {
  //     MuiButton: {
  //       styleOverrides: {
  //         root: {
  //           padding: "4px 16px", // Converts px-4 py-1 to MUI padding units
  //         },
  //       },
  //     },
  //   },
});
