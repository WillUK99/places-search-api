import { createLazyFileRoute } from '@tanstack/react-router'
import { SearchBox } from '../components/SearchBox'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <SearchBox />
          </div>
        </div>
      </div>
    </div>
  )
}
