import { createTheme, adaptV4Theme } from "@mui/material";

const defaultTheme = createTheme(
  adaptV4Theme({
    typography: {
      fontFamily: ["Poppins", "serif"].join(","),
    },
  })
);

const theme = {
  ...defaultTheme,
  overrides: {
    MuiTab: {
      root: {
        [defaultTheme.breakpoints.down("md")]: {
          fontSize: "0.65rem",
          padding: "0px",
        },
        [defaultTheme.breakpoints.down("sm")]: {
          fontSize: "0.5rem",
          padding: "0px",
        },
      },
      fullWidth: {
        [defaultTheme.breakpoints.down("lg")]: {
          flexBasis: "auto",
        },
      },
    },
    MuiTabPanel: {
      root: {
        [defaultTheme.breakpoints.down("md")]: {
          fontSize: "0.8rem",
          padding: "5px",
        },
        [defaultTheme.breakpoints.down("sm")]: {
          fontSize: "0.8rem",
          padding: "0px",
        },
      },
    },
    MuiTypography: {
      subtitle1: {
        [defaultTheme.breakpoints.down("lg")]: {
          fontSize: "0.8rem",
        },
      },
      body1: {
        [defaultTheme.breakpoints.down("lg")]: {
          fontSize: "0.8rem",
        },
      },
    },
    MuiButton: {
      root: {
        [defaultTheme.breakpoints.down("lg")]: {
          fontSize: "0.67rem",
          lineHeight: 1.5,
        },
      },
    },
    MuiInputBase: {
      root: {
        [defaultTheme.breakpoints.down("lg")]: {
          fontSize: "0.67rem",
          lineHeight: "1rem",
        },
      },
    },
    MuiOutlinedInput: {
      inputMarginDense: {
        [defaultTheme.breakpoints.down("lg")]: {
          paddingTop: "7.5px",
          paddingBottom: "7.5px",
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "12px",
        [defaultTheme.breakpoints.down("lg")]: {
          fontSize: "10px",
        },
      },
    },
    MUIRichTextEditor: {
      root: {
        width: "100%",
      },
      toolbar: {
        border: "0.5px solid #BDBDBD",
      },
      editor: {
        padding: "20px",
        border: "0.5px solid #BDBDBD",
        minHeight: "100px",
      },
    },
  },
};

export default theme;