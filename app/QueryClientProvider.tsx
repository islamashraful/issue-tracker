"use client";

import {
  QueryClientProvider as ReactQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const client = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={client}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
