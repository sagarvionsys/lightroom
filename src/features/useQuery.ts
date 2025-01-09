import { useQuery } from "@tanstack/react-query";

const useQueryFunction = (query: string[], fn: () => Promise<any>) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: query,
    queryFn: fn,
  });

  return { data, isLoading, isError };
};

export default useQueryFunction;
