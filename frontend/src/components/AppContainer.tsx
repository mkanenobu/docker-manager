import type { FC, ReactNode } from "react";
import { Page } from "@geist-ui/core";

import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { SWRConfig } from "swr";

export const AppContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Page id="app">
      <GeistProvider>
        <CssBaseline />
        <SWRConfig value={{ revalidateOnFocus: true, suspense: true }}>
          {children}
        </SWRConfig>
      </GeistProvider>
    </Page>
  );
};
