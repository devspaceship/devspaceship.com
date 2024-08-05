import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient;

// Some client components need the query client provider but are scattered through server components.
// Wrapping the MDX pages in a provider would make all the components of the pages be client components
// which would be inefficient.
// A solution is thus to have the different client components have their own provider.
// This singleton ensures that the providers share the same query client.
export function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
}
