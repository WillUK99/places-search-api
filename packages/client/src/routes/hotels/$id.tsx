import { createFileRoute, Link } from '@tanstack/react-router'
import { API_BASE_URL } from '../../config/apiConfig'
import { useQuery } from '@tanstack/react-query'
import { Hotel } from '../../types'

export const Route = createFileRoute('/hotels/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const { data, isLoading, isFetching, error } = useQuery<Hotel, Error>({
    queryKey: ["getCountry", id],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/search/hotels?id=${id}`)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown API error");
      }

      return response.json();
    },
    enabled: Boolean(id),
  })

  if (error) {
    return (
      <div className="App">
        <div className="container">
          <div className="row height d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <h2>Error</h2>
              <p>{error.message}</p>
              <Link to="/" className='btn btn-danger'>Go home</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading || isFetching) {
    return <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            loading...
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <h1>{data?.hotel_name}</h1>
            <Link to="/" className="btn btn-danger">
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
