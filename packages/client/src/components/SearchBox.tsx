import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { SearchResults } from "./SearchResults";
import { Hotel, City, Country } from "../types";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../config/apiConfig";

export type SearchAllResponse = {
  hotels: Hotel[]
  cities: City[]
  countries: Country[]
}

export const SearchBox = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllPlaces", debouncedSearch],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/search?q=${debouncedSearch}`)
        .then((res) => res.json() as Promise<SearchAllResponse>);

      return response;
    },
    enabled: Boolean(debouncedSearch),
    initialData: null
  })


  return (
    <div className="dropdown">
      <div className="form">
        <i className="fa fa-search"></i>
        <input
          value={search}
          type="text"
          className="form-control form-input"
          placeholder="Search accommodation..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        {Boolean(search) &&
          <button className="left-pan" onClick={() => setSearch('')}>
            <i className="fa fa-close" />
          </button>
        }
      </div>
      {search && (
        <>
          {isLoading ? (
            <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
              <h2>Error</h2>
              <p>{error.message}</p>
            </div>
          ) : data ? (
            <SearchResults data={data} />
          ) : null}
        </>
      )}
    </div>
  )
}