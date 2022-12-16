import { type FC, type ReactNode, useState } from "react";
import { Page, GeistProvider, CssBaseline } from "@geist-ui/core";
import { SWRConfig } from "swr";
import { myDarkTheme, myLightTheme } from "../theme/themes";

export const AppContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeType, setThemeType] = useState<"myLightTheme" | "myDarkTheme">(
    "myLightTheme"
  );

  return (
    <GeistProvider themes={[myLightTheme, myDarkTheme]} themeType={themeType}>
      <CssBaseline />
      <SWRConfig value={{ revalidateOnFocus: true, suspense: true }}>
        <Page id="app" render="effect">
          {children}
        </Page>
      </SWRConfig>
    </GeistProvider>
  );
};
