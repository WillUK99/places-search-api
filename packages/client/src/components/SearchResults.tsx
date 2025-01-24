import { SearchAllResponse } from "../hooks/useGetAllPlaces"
import { Link } from '@tanstack/react-router'


type Props = {
  data: SearchAllResponse | null
}

export const SearchResults = ({ data }: Props) => {
  if (!data) {
    return (
      <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
        <SearchCategory title="Hotels" items={[]} basePath="/hotels" />
        <SearchCategory title="Countries" items={[]} basePath="/countries" />
        <SearchCategory title="Cities" items={[]} basePath="/cities" />
      </div>
    );
  }

  const { hotels, countries, cities } = data;

  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      <SearchCategory
        title="Hotels"
        items={hotels.map((h) => ({ _id: h._id, name: h.hotel_name }))}
        basePath="/hotels"
      />
      <SearchCategory
        title="Countries"
        items={countries.map((c) => ({ _id: c._id, name: c.country }))}
        basePath="/countries"
      />
      <SearchCategory
        title="Cities"
        items={cities.map((c) => ({ _id: c._id, name: c.name }))}
        basePath="/cities"
      />
    </div>
  );
};

type SearchCategoryProps = {
  title: string;
  items: { _id: string; name: string }[];
  basePath: "/hotels" | "/countries" | "/cities";
};

const SearchCategory = ({ title, items, basePath }: SearchCategoryProps) => (
  <>
    <h2>{title}</h2>
    {items.length ? (
      <ul className="list-unstyled">
        {items.map((item) => (
          <li key={item._id}>
            <Link
              to={`${basePath}/$id`}
              params={{ id: item._id }}
              className="dropdown-item"
            >
              <i className="fa fa-building mr-2"></i>
              {item.name}
            </Link>
            <hr className="divider" />
          </li>
        ))}
      </ul>
    ) : (
      <p>No {title.toLowerCase()} matched</p>
    )}
  </>
);
