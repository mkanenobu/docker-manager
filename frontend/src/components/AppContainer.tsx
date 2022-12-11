import type { FC, ReactNode } from "react";
import { SWRConfig } from "swr";

export const AppContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div id="app">
      <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
    </div>
  );
};
