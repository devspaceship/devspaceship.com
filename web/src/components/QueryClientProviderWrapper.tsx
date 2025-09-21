"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/queryClient";
import type { ReactNode } from "react";

const queryClient = getQueryClient();

const QueryClientProviderWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default QueryClientProviderWrapper;
