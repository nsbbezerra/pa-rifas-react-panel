import useSWR from "swr";
import { api } from "../configs/axios";

const useFetch = (url: string, refresh: number) => {
  const { data, error, mutate } = useSWR(
    [url],
    async (url) => {
      const response = await api.get(url);
      return response.data;
    },
    {
      refreshInterval: refresh,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
    }
  );

  return { data, error, mutate };
};

export { useFetch };
