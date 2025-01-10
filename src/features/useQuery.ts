import { useQuery } from "@tanstack/react-query";

export const useQueryFunction = (query: string[], fn: () => Promise<any>) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: query,
    queryFn: fn,
  });

  return { data, isLoading, isError };
};

export const useQueryFunctionWithId = (
  query: string[],
  id: string,
  fn: (id: string) => Promise<any>
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: query,
    queryFn: () => fn(id),
  });

  return { data, isLoading, isError };
};
