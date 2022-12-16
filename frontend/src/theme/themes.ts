import { Themes } from "@geist-ui/core";

export const myDarkTheme = Themes.createFromDark({
  type: "myDarkTheme",
  palette: {
    background: "#182736",
    accents_1: "#182736",
    accents_6: "white",
  },
});

export const myLightTheme = Themes.createFromLight({
  type: "myLightTheme",
});
