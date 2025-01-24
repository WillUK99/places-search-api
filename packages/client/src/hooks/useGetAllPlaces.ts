import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../config/apiConfig";
import { Hotel } from "../types/hotel";
import { City } from "../types/city";
import { Country } from "../types/country";

type QueryVariables = {
  query: string;
}

const BASE_QUERY_KEY = "getAllPlaces"
type QueryKey = [typeof BASE_QUERY_KEY, QueryVariables]

type Opts = {
  queryVariables: QueryVariables;
}

export type SearchAllResponse = {
  hotels: Hotel[]
  cities: City[]
  countries: Country[]
}

function useBaseQuery(opts: Opts) {
  return useQuery({
    queryKey: [BASE_QUERY_KEY, opts.queryVariables] satisfies QueryKey,
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/search?q=${opts.queryVariables.query}`)
        .then((res) => res.json() as Promise<SearchAllResponse>);

      return response;
    },
    enabled: Boolean(opts.queryVariables.query),
    initialData: null
  })
}

export const getAllPlaces = {
  useQuery: useBaseQuery,
  makeQueryKey: (queryVariables?: QueryVariables): QueryKey | [QueryKey[0]] =>
    queryVariables !== undefined
      ? [BASE_QUERY_KEY, queryVariables]
      : [BASE_QUERY_KEY]
}

export const queries = {
  places: {
    getAll: getAllPlaces
  }
}
